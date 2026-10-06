const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const endpointController = require('../controllers/endpointController');
const monitoringController = require('../controllers/monitoringController');
const contractController = require('../controllers/contractController');
const alertController = require('../controllers/alertController');
const analyticsController = require('../controllers/analyticsController');
const mockApiController = require('../controllers/mockApiController');
const jobQueue = require('../services/jobQueue');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// API Registration Routes
router.get('/endpoints', endpointController.getAllEndpoints);
router.get('/endpoints/:id', endpointController.getEndpointById);
router.post('/endpoints', endpointController.createEndpoint);
router.put('/endpoints/:id', endpointController.updateEndpoint);
router.delete('/endpoints/:id', endpointController.deleteEndpoint);
router.patch('/endpoints/:id/toggle', endpointController.toggleEndpointActive);

// Monitoring Routes
router.post('/monitoring/start', monitoringController.startMonitoring);
router.get('/monitoring/status/:id', monitoringController.getMonitoringStatus);
router.get('/monitoring/history/:id', monitoringController.getMonitoringHistory);
router.post('/monitoring/check-now/:id', monitoringController.checkNow);

// OpenAPI / Contract Routes
router.post('/contracts', contractController.saveContract);
router.get('/contracts/:id', contractController.getContractById);
router.post('/contracts/validate-test', contractController.validateTestPayload);

// Alert Routes
router.post('/alerts/configure', alertController.configureAlert);
router.get('/alerts', alertController.getAlerts);
router.post('/alerts/test', alertController.testAlert);

// Analytics Routes
router.get('/analytics/uptime', analyticsController.getUptime);
router.get('/analytics/latency', analyticsController.getLatency);
router.get('/analytics/failures', analyticsController.getFailures);

// Job Queue Metrics Route
router.get('/queue/metrics', (req, res) => {
  res.json(jobQueue.getMetrics());
});

// Built-in Mock Test Target Endpoints
router.get('/mock/users', mockApiController.getMockUsers);
router.get('/mock/orders', mockApiController.getMockOrders);
router.get('/mock/payment-info', mockApiController.getMockPaymentInfo);
router.get('/mock/slow-inventory', mockApiController.getMockSlowInventory);
router.post('/mock/toggle-drift', mockApiController.toggleMockDrift);

// API Docs (inline OpenAPI spec)
router.get('/docs', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'API Sentinel',
      version: '1.0.0',
      description: 'Automated API Monitoring, Contract Validation & Reliability Platform'
    },
    servers: [{ url: '/api' }],
    paths: {
      '/auth/register': { post: { summary: 'Register user', tags: ['Auth'] } },
      '/auth/login': { post: { summary: 'Login user', tags: ['Auth'] } },
      '/endpoints': { get: { summary: 'List all endpoints', tags: ['Endpoints'] }, post: { summary: 'Add endpoint', tags: ['Endpoints'] } },
      '/endpoints/{id}': { put: { summary: 'Update endpoint', tags: ['Endpoints'] }, delete: { summary: 'Delete endpoint', tags: ['Endpoints'] } },
      '/endpoints/{id}/toggle': { patch: { summary: 'Toggle monitoring active/paused', tags: ['Endpoints'] } },
      '/monitoring/check-now/{id}': { post: { summary: 'Trigger immediate health check', tags: ['Monitoring'] } },
      '/monitoring/history/{id}': { get: { summary: 'Get time-series check history', tags: ['Monitoring'] } },
      '/monitoring/status/{id}': { get: { summary: 'Get last check status', tags: ['Monitoring'] } },
      '/contracts': { post: { summary: 'Save JSON Schema contract', tags: ['Contracts'] } },
      '/contracts/{id}': { get: { summary: 'Get contract by endpoint ID', tags: ['Contracts'] } },
      '/contracts/validate-test': { post: { summary: 'Test schema validation', tags: ['Contracts'] } },
      '/alerts/configure': { post: { summary: 'Configure alert rule', tags: ['Alerts'] } },
      '/alerts': { get: { summary: 'List alerts & logs', tags: ['Alerts'] } },
      '/alerts/test': { post: { summary: 'Send test notification', tags: ['Alerts'] } },
      '/analytics/uptime': { get: { summary: 'Get uptime analytics', tags: ['Analytics'] } },
      '/analytics/latency': { get: { summary: 'Get latency & percentiles', tags: ['Analytics'] } },
      '/analytics/failures': { get: { summary: 'Get failure categories', tags: ['Analytics'] } },
      '/queue/metrics': { get: { summary: 'Get BullMQ job queue metrics', tags: ['Queue'] } }
    }
  });
});

module.exports = router;
