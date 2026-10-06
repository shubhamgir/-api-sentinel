const store = require('../db/store');
const { dispatchWebhook, dispatchEmail } = require('../services/alertService');

const configureAlert = (req, res) => {
  const { name, triggerOn, latencyThresholdMs, webhookUrl, emailRecipient, enabled } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Alert configuration name is required' });
  }

  const newAlert = store.saveAlertConfig({
    name,
    triggerOn: triggerOn || ['STATUS_MISMATCH', 'CONTRACT_DRIFT'],
    latencyThresholdMs: Number(latencyThresholdMs || 1000),
    webhookUrl: webhookUrl || '',
    emailRecipient: emailRecipient || '',
    enabled: enabled !== undefined ? enabled : true
  });

  res.status(201).json(newAlert);
};

const getAlerts = (req, res) => {
  const alerts = store.getAlerts();
  const logs = store.getAlertLogs(50);
  res.json({
    configurations: alerts,
    logs
  });
};

const testAlert = async (req, res) => {
  const { webhookUrl, emailRecipient, alertType } = req.body;
  
  const testPayload = {
    alertId: 'test-trigger',
    alertName: 'Manual Alert Test Dispatch',
    endpointId: 'ep-test',
    endpointName: 'Test Sentinel Endpoint',
    url: 'https://api.sentinel.io/v1/health',
    status: 500,
    expectedStatus: 200,
    latencyMs: 1420,
    triggerReason: alertType || 'Manual test triggered from API Sentinel dashboard',
    timestamp: new Date().toISOString()
  };

  if (webhookUrl) {
    await dispatchWebhook(webhookUrl, testPayload);
  }

  if (emailRecipient) {
    dispatchEmail(emailRecipient, testPayload);
  }

  store.addAlertLog(testPayload);

  res.json({
    message: 'Test alert notification dispatched successfully',
    payloadSent: testPayload
  });
};

module.exports = {
  configureAlert,
  getAlerts,
  testAlert
};
