const store = require('../db/store');
const { executeCheck } = require('./checker');
const { validateContract } = require('./contractValidator');
const { processAlerts } = require('./alertService');
const jobQueue = require('./jobQueue');

const lastRunTimes = new Map();
let schedulerInterval = null;

// Register jobQueue handler
jobQueue.registerHandler(async (payload) => {
  return await runCheckForEndpoint(payload);
});

async function runCheckForEndpoint(endpoint) {
  try {
    // 1. Run HTTP Check with Retry logic
    const checkResult = await executeCheck(endpoint);

    // 2. Fetch contract & validate schema
    const contract = store.getContractByEndpointId(endpoint.id);
    let contractValidation = null;
    if (contract && checkResult.responseData) {
      contractValidation = validateContract(checkResult.responseData, contract.schema);
    } else if (contract && !checkResult.responseData) {
      contractValidation = {
        valid: false,
        hasDrift: true,
        driftSummary: 'Cannot validate contract: Response payload is empty or HTTP check failed',
        diffs: []
      };
    }

    checkResult.contractValidation = contractValidation;

    // 3. Store check result in time-series database
    const savedCheck = store.addCheck(checkResult);

    // 4. Evaluate alert rules & dispatch notifications
    await processAlerts(checkResult, contractValidation);

    lastRunTimes.set(endpoint.id, Date.now());
    return savedCheck;
  } catch (err) {
    console.error(`[SCHEDULER ERROR] Failed checking endpoint ${endpoint.name}:`, err.message);
    return null;
  }
}

function startScheduler() {
  if (schedulerInterval) return;

  console.log('[MONITORING ENGINE] Starting BullMQ Job Queue scheduler loop...');

  // Run initial check for all active endpoints on launch
  setTimeout(async () => {
    const endpoints = store.getEndpoints().filter(e => e.active);
    for (const ep of endpoints) {
      jobQueue.addJob('HEALTH_CHECK', ep, { retryCount: ep.retryCount });
    }
  }, 1000);

  // Interval loop checking every 5 seconds which endpoints are due
  schedulerInterval = setInterval(async () => {
    const endpoints = store.getEndpoints().filter(e => e.active);
    const now = Date.now();

    for (const ep of endpoints) {
      const intervalMs = (ep.intervalSeconds || 15) * 1000;
      const lastRun = lastRunTimes.get(ep.id) || 0;

      if (now - lastRun >= intervalMs) {
        lastRunTimes.set(ep.id, now); // Prevent duplicate simultaneous triggers
        jobQueue.addJob('HEALTH_CHECK', ep, { retryCount: ep.retryCount });
      }
    }
  }, 5000);
}

function stopScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    console.log('[MONITORING ENGINE] Stopped background scheduler loop');
  }
}

/**
 * Manually trigger immediate check for a single endpoint
 */
async function triggerManualCheck(endpointId) {
  const endpoint = store.getEndpointById(endpointId);
  if (!endpoint) {
    throw new Error('Endpoint not found');
  }
  return await runCheckForEndpoint(endpoint);
}

module.exports = {
  startScheduler,
  stopScheduler,
  triggerManualCheck,
  runCheckForEndpoint
};
