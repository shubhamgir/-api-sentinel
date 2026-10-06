const store = require('../db/store');

const getAllEndpoints = (req, res) => {
  const endpoints = store.getEndpoints();
  const checks = store.getChecks(null, 200);

  // Attach last check status summary to each endpoint
  const enriched = endpoints.map(ep => {
    const epChecks = checks.filter(c => c.endpointId === ep.id);
    const lastCheck = epChecks[0] || null;
    return {
      ...ep,
      lastCheckAt: lastCheck ? lastCheck.timestamp : null,
      lastStatus: lastCheck ? (lastCheck.success ? 'UP' : 'DOWN') : 'PENDING',
      lastLatencyMs: lastCheck ? lastCheck.latencyMs : null,
      hasDrift: lastCheck ? (lastCheck.contractValidation?.hasDrift || false) : false
    };
  });

  res.json(enriched);
};

const getEndpointById = (req, res) => {
  const { id } = req.params;
  const endpoint = store.getEndpointById(id);
  if (!endpoint) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  const contract = store.getContractByEndpointId(id);
  const checks = store.getChecks(id, 20);

  res.json({
    ...endpoint,
    contract: contract || null,
    recentChecks: checks
  });
};

const createEndpoint = (req, res) => {
  const { name, url, method, headers, payload, expectedStatus, timeoutMs, intervalSeconds, retryCount } = req.body;
  
  if (!name || !url) {
    return res.status(400).json({ error: 'Name and Target URL are required' });
  }

  const created = store.addEndpoint({
    name,
    url,
    method: method || 'GET',
    headers: headers || {},
    payload: payload || null,
    expectedStatus: Number(expectedStatus || 200),
    timeoutMs: Number(timeoutMs || 3000),
    intervalSeconds: Number(intervalSeconds || 15),
    retryCount: Number(retryCount || 1)
  });

  res.status(201).json(created);
};

const updateEndpoint = (req, res) => {
  const { id } = req.params;
  const updated = store.updateEndpoint(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.json(updated);
};

const deleteEndpoint = (req, res) => {
  const { id } = req.params;
  const success = store.deleteEndpoint(id);
  if (!success) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.json({ message: 'Endpoint deleted successfully', id });
};

const toggleEndpointActive = (req, res) => {
  const { id } = req.params;
  const endpoint = store.getEndpointById(id);
  if (!endpoint) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  const updated = store.updateEndpoint(id, { active: !endpoint.active });
  res.json(updated);
};

module.exports = {
  getAllEndpoints,
  getEndpointById,
  createEndpoint,
  updateEndpoint,
  deleteEndpoint,
  toggleEndpointActive
};
