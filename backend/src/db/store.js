const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readData = (collection) => {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${collection}:`, err.message);
    return [];
  }
};

const writeData = (collection, data) => {
  const filePath = getFilePath(collection);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${collection}:`, err.message);
  }
};

// Seed initial default mock endpoints & contracts if empty
const seedDefaults = () => {
  let endpoints = readData('endpoints');
  if (endpoints.length === 0) {
    const defaultEndpoints = [
      {
        id: 'ep-healthy-user-api',
        name: 'User Management Microservice',
        url: 'http://localhost:5000/api/mock/users',
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        payload: null,
        expectedStatus: 200,
        timeoutMs: 3000,
        intervalSeconds: 15,
        retryCount: 2,
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'ep-flaky-degraded-api',
        name: 'Order Processing Service (Flaky)',
        url: 'http://localhost:5000/api/mock/orders',
        method: 'GET',
        headers: {},
        payload: null,
        expectedStatus: 200,
        timeoutMs: 2000,
        intervalSeconds: 20,
        retryCount: 2,
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'ep-schema-drift-api',
        name: 'Payment Gateway Info (Schema Drift)',
        url: 'http://localhost:5000/api/mock/payment-info',
        method: 'GET',
        headers: {},
        payload: null,
        expectedStatus: 200,
        timeoutMs: 3000,
        intervalSeconds: 15,
        retryCount: 1,
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'ep-slow-latency-api',
        name: 'Inventory Sync Service (Slow)',
        url: 'http://localhost:5000/api/mock/slow-inventory',
        method: 'GET',
        headers: {},
        payload: null,
        expectedStatus: 200,
        timeoutMs: 1500,
        intervalSeconds: 30,
        retryCount: 1,
        active: true,
        createdAt: new Date().toISOString()
      }
    ];
    writeData('endpoints', defaultEndpoints);

    const defaultContracts = [
      {
        id: 'contract-users',
        endpointId: 'ep-healthy-user-api',
        name: 'User Schema v1.0',
        schema: {
          type: 'object',
          required: ['status', 'users', 'count'],
          properties: {
            status: { type: 'string' },
            count: { type: 'number' },
            users: {
              type: 'array',
              items: {
                type: 'object',
                required: ['id', 'name', 'email', 'role'],
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  role: { type: 'string' }
                }
              }
            }
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: 'contract-payment',
        endpointId: 'ep-schema-drift-api',
        name: 'Payment Endpoint Contract (Strict)',
        schema: {
          type: 'object',
          required: ['status', 'currency', 'gatewayVersion', 'supportedMethods'],
          properties: {
            status: { type: 'string' },
            currency: { type: 'string' },
            gatewayVersion: { type: 'string' },
            supportedMethods: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        },
        createdAt: new Date().toISOString()
      }
    ];
    writeData('contracts', defaultContracts);

    const defaultAlerts = [
      {
        id: 'alert-1',
        name: 'Global Slack Webhook Alert',
        triggerOn: ['STATUS_MISMATCH', 'CONTRACT_DRIFT', 'TIMEOUT'],
        latencyThresholdMs: 1000,
        webhookUrl: 'https://hooks.slack.com/services/demo/api-sentinel/alerts',
        emailRecipient: 'devops@sentinel-monitoring.io',
        enabled: true,
        createdAt: new Date().toISOString()
      }
    ];
    writeData('alerts', defaultAlerts);
  }
};

seedDefaults();

module.exports = {
  getCollection: readData,
  saveCollection: writeData,

  // Endpoints
  getEndpoints: () => readData('endpoints'),
  getEndpointById: (id) => readData('endpoints').find(e => e.id === id),
  addEndpoint: (endpoint) => {
    const list = readData('endpoints');
    const newEp = { id: uuidv4(), active: true, createdAt: new Date().toISOString(), ...endpoint };
    list.push(newEp);
    writeData('endpoints', list);
    return newEp;
  },
  updateEndpoint: (id, updates) => {
    const list = readData('endpoints');
    const index = list.findIndex(e => e.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
    writeData('endpoints', list);
    return list[index];
  },
  deleteEndpoint: (id) => {
    const list = readData('endpoints');
    const filtered = list.filter(e => e.id !== id);
    writeData('endpoints', filtered);
    // clean up checks and contracts
    const contracts = readData('contracts').filter(c => c.endpointId !== id);
    writeData('contracts', contracts);
    return true;
  },

  // Contracts
  getContracts: () => readData('contracts'),
  getContractByEndpointId: (endpointId) => readData('contracts').find(c => c.endpointId === endpointId),
  saveContract: (contractData) => {
    const list = readData('contracts');
    const existingIndex = list.findIndex(c => c.endpointId === contractData.endpointId);
    if (existingIndex !== -1) {
      list[existingIndex] = { ...list[existingIndex], ...contractData, updatedAt: new Date().toISOString() };
      writeData('contracts', list);
      return list[existingIndex];
    } else {
      const newContract = { id: uuidv4(), createdAt: new Date().toISOString(), ...contractData };
      list.push(newContract);
      writeData('contracts', list);
      return newContract;
    }
  },

  // Checks (Time Series)
  addCheck: (checkResult) => {
    const list = readData('checks');
    const newCheck = { id: uuidv4(), timestamp: new Date().toISOString(), ...checkResult };
    list.push(newCheck);
    // Keep max 500 latest check entries in storage for performance
    if (list.length > 500) {
      list.shift();
    }
    writeData('checks', list);
    return newCheck;
  },
  getChecks: (endpointId, limit = 50) => {
    let list = readData('checks');
    if (endpointId) {
      list = list.filter(c => c.endpointId === endpointId);
    }
    return list.slice(-limit).reverse();
  },

  // Alerts & Alert Log History
  getAlerts: () => readData('alerts'),
  saveAlertConfig: (alert) => {
    const list = readData('alerts');
    const newAlert = { id: uuidv4(), enabled: true, createdAt: new Date().toISOString(), ...alert };
    list.push(newAlert);
    writeData('alerts', list);
    return newAlert;
  },
  updateAlertConfig: (id, updates) => {
    const list = readData('alerts');
    const idx = list.findIndex(a => a.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    writeData('alerts', list);
    return list[idx];
  },
  addAlertLog: (log) => {
    const list = readData('alert_logs');
    const newLog = { id: uuidv4(), timestamp: new Date().toISOString(), ...log };
    list.push(newLog);
    if (list.length > 200) list.shift();
    writeData('alert_logs', list);
    return newLog;
  },
  getAlertLogs: (limit = 50) => {
    return readData('alert_logs').slice(-limit).reverse();
  }
};
