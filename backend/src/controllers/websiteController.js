const store = require('../db/store');

const getAllWebsites = (req, res) => {
  const websites = store.getWebsites();
  const endpoints = store.getEndpoints();
  const checks = store.getChecks(null, 300);

  // Enrich websites with endpoint count, health status, and avg response time
  const enriched = websites.map(site => {
    const siteEndpoints = endpoints.filter(ep => ep.websiteId === site.id);
    let totalLatency = 0;
    let latencyCount = 0;
    let upCount = 0;
    let downCount = 0;

    const endpointsWithStatus = siteEndpoints.map(ep => {
      const epChecks = checks.filter(c => c.endpointId === ep.id);
      const lastCheck = epChecks[0] || null;
      if (lastCheck && lastCheck.latencyMs) {
        totalLatency += lastCheck.latencyMs;
        latencyCount++;
      }
      const isUp = lastCheck ? lastCheck.success : true;
      if (isUp) upCount++; else downCount++;

      return {
        id: ep.id,
        name: ep.name,
        url: ep.url,
        method: ep.method,
        expectedStatus: ep.expectedStatus,
        lastStatus: lastCheck ? (lastCheck.success ? 'UP' : 'DOWN') : 'PENDING',
        lastLatencyMs: lastCheck ? lastCheck.latencyMs : null,
        lastCheckAt: lastCheck ? lastCheck.timestamp : null,
        active: ep.active
      };
    });

    const avgLatency = latencyCount > 0 ? Math.round(totalLatency / latencyCount) : 0;
    const healthStatus = downCount > 0 ? 'DEGRADED' : (siteEndpoints.length > 0 ? 'HEALTHY' : 'PENDING');

    return {
      ...site,
      endpointsCount: siteEndpoints.length,
      healthStatus,
      avgLatencyMs: avgLatency,
      endpoints: endpointsWithStatus
    };
  });

  res.json(enriched);
};

const getWebsiteById = (req, res) => {
  const { id } = req.params;
  const site = store.getWebsiteById(id);
  if (!site) {
    return res.status(404).json({ error: 'Website / project not found' });
  }

  const endpoints = store.getEndpoints().filter(ep => ep.websiteId === id);
  const checks = store.getChecks(null, 200);

  const endpointsDetail = endpoints.map(ep => {
    const epChecks = checks.filter(c => c.endpointId === ep.id);
    const lastCheck = epChecks[0] || null;
    return {
      ...ep,
      lastCheckAt: lastCheck ? lastCheck.timestamp : null,
      lastStatus: lastCheck ? (lastCheck.success ? 'UP' : 'DOWN') : 'PENDING',
      lastLatencyMs: lastCheck ? lastCheck.latencyMs : null,
      recentChecks: epChecks.slice(0, 10)
    };
  });

  res.json({
    ...site,
    endpoints: endpointsDetail
  });
};

const createWebsite = (req, res) => {
  const { id, name, description, baseUrl, environment } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Website name is required' });
  }

  const newSite = store.addWebsite({
    id: id || `web-${Date.now().toString(36)}`,
    name,
    description: description || '',
    baseUrl: baseUrl || '',
    environment: environment || 'Production'
  });

  res.status(201).json(newSite);
};

const updateWebsite = (req, res) => {
  const { id } = req.params;
  const updated = store.updateWebsite(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Website not found' });
  }
  res.json(updated);
};

const deleteWebsite = (req, res) => {
  const { id } = req.params;
  const success = store.deleteWebsite(id);
  if (!success) {
    return res.status(404).json({ error: 'Website not found' });
  }
  res.json({ message: 'Website deleted successfully', id });
};

// Add endpoint specifically to a website
const addEndpointToWebsite = (req, res) => {
  const { id: websiteId } = req.params;
  const site = store.getWebsiteById(websiteId);
  if (!site) {
    return res.status(404).json({ error: 'Website not found' });
  }

  const { name, url, method, headers, payload, expectedStatus, timeoutMs, intervalSeconds, retryCount } = req.body;
  if (!name || !url) {
    return res.status(400).json({ error: 'Name and URL are required' });
  }

  const fullUrl = url.startsWith('http') ? url : `${site.baseUrl || ''}${url.startsWith('/') ? '' : '/'}${url}`;

  const created = store.addEndpoint({
    websiteId,
    name,
    url: fullUrl,
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

module.exports = {
  getAllWebsites,
  getWebsiteById,
  createWebsite,
  updateWebsite,
  deleteWebsite,
  addEndpointToWebsite
};
