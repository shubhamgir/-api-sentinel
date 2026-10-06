const store = require('../db/store');
const { triggerManualCheck } = require('../services/scheduler');

const startMonitoring = (req, res) => {
  const { endpointId } = req.body;
  if (endpointId) {
    const ep = store.getEndpointById(endpointId);
    if (!ep) return res.status(404).json({ error: 'Endpoint not found' });
    store.updateEndpoint(endpointId, { active: true });
    return res.json({ message: `Monitoring activated for endpoint ${ep.name}` });
  }

  // Activate all
  const endpoints = store.getEndpoints();
  endpoints.forEach(ep => store.updateEndpoint(ep.id, { active: true }));
  res.json({ message: 'Monitoring started for all registered endpoints' });
};

const getMonitoringStatus = (req, res) => {
  const { id } = req.params;
  const checks = store.getChecks(id, 1);
  if (checks.length === 0) {
    return res.json({ status: 'NO_DATA', lastCheck: null });
  }
  const lastCheck = checks[0];
  res.json({
    status: lastCheck.success ? 'HEALTHY' : 'UNHEALTHY',
    hasDrift: lastCheck.contractValidation?.hasDrift || false,
    lastCheck
  });
};

const getMonitoringHistory = (req, res) => {
  const { id } = req.params;
  const limit = Number(req.query.limit || 50);
  const history = store.getChecks(id === 'all' ? null : id, limit);
  res.json(history);
};

const checkNow = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await triggerManualCheck(id);
    res.json({
      message: 'Health check executed successfully',
      check: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  startMonitoring,
  getMonitoringStatus,
  getMonitoringHistory,
  checkNow
};
