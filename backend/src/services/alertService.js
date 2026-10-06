const axios = require('axios');
const store = require('../db/store');

/**
 * Evaluate check results against alert rules and dispatch notifications if triggered.
 * @param {Object} checkResult
 * @param {Object} contractValidationResult
 */
async function processAlerts(checkResult, contractValidationResult) {
  const alerts = store.getAlerts().filter(a => a.enabled);
  if (alerts.length === 0) return;

  const {
    endpointId,
    endpointName,
    url,
    status,
    expectedStatus,
    latencyMs,
    success,
    errorMessage
  } = checkResult;

  const hasDrift = contractValidationResult ? contractValidationResult.hasDrift : false;

  for (const alertConfig of alerts) {
    const triggers = alertConfig.triggerOn || [];
    let isTriggered = false;
    let triggerReason = '';

    // Check status mismatch
    if (triggers.includes('STATUS_MISMATCH') && status !== expectedStatus) {
      isTriggered = true;
      triggerReason += `Status Mismatch: Expected ${expectedStatus}, got ${status || 'N/A'}. `;
    }

    // Check high latency
    if (triggers.includes('HIGH_LATENCY') || alertConfig.latencyThresholdMs) {
      const threshold = alertConfig.latencyThresholdMs || 1000;
      if (latencyMs > threshold) {
        isTriggered = true;
        triggerReason += `High Latency: ${latencyMs}ms (Exceeds threshold of ${threshold}ms). `;
      }
    }

    // Check contract drift
    if (triggers.includes('CONTRACT_DRIFT') && hasDrift) {
      isTriggered = true;
      triggerReason += `Contract Drift: ${contractValidationResult.driftSummary}. `;
    }

    // Check timeout / unreachability
    if (triggers.includes('TIMEOUT') && !success && (errorMessage || '').includes('Timeout')) {
      isTriggered = true;
      triggerReason += `Endpoint Timeout: ${errorMessage}. `;
    }

    if (isTriggered) {
      const alertPayload = {
        alertId: alertConfig.id,
        alertName: alertConfig.name,
        endpointId,
        endpointName,
        url,
        status,
        expectedStatus,
        latencyMs,
        triggerReason: triggerReason.trim(),
        driftSummary: contractValidationResult ? contractValidationResult.driftSummary : null,
        timestamp: new Date().toISOString()
      };

      // 1. Dispatch Webhook if configured
      if (alertConfig.webhookUrl) {
        dispatchWebhook(alertConfig.webhookUrl, alertPayload);
      }

      // 2. Dispatch Email (simulated logger) if configured
      if (alertConfig.emailRecipient) {
        dispatchEmail(alertConfig.emailRecipient, alertPayload);
      }

      // Log alert execution in DB
      store.addAlertLog(alertPayload);
    }
  }
}

async function dispatchWebhook(webhookUrl, alertPayload) {
  try {
    // If it's a dummy webhook URL, log simulation
    if (webhookUrl.includes('slack.com/services/demo') || webhookUrl.includes('example.com')) {
      console.log(`[ALERT SIMULATED WEBHOOK] Sent payload to ${webhookUrl}:`, alertPayload.triggerReason);
      return;
    }
    await axios.post(webhookUrl, alertPayload, { timeout: 3000 });
    console.log(`[ALERT WEBHOOK SUCCESS] Dispatched to ${webhookUrl}`);
  } catch (err) {
    console.warn(`[ALERT WEBHOOK ERROR] Failed sending to ${webhookUrl}: ${err.message}`);
  }
}

function dispatchEmail(recipient, alertPayload) {
  console.log(`[ALERT EMAIL DISPATCHED] To: ${recipient} | Subject: API Sentinel Alert: ${alertPayload.endpointName} | Body: ${alertPayload.triggerReason}`);
}

module.exports = { processAlerts, dispatchWebhook, dispatchEmail };
