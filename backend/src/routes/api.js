const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const endpointController = require('../controllers/endpointController');
const monitoringController = require('../controllers/monitoringController');
const contractController = require('../controllers/contractController');
const alertController = require('../controllers/alertController');
const analyticsController = require('../controllers/analyticsController');
const mockApiController = require('../controllers/mockApiController');
const websiteController = require('../controllers/websiteController');
const jobQueue = require('../services/jobQueue');

// ==========================================
// 1. Authentication Routes (3 routes)
// ==========================================
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', (req, res) => {
  res.json({ user: { id: 'usr-admin', name: 'Shubham Giri', email: 'shubham@sentinel.io', role: 'admin' } });
});

// ==========================================
// 2. Websites / Projects Management (5 routes)
// ==========================================
router.get('/websites', websiteController.getAllWebsites);
router.get('/websites/:id', websiteController.getWebsiteById);
router.post('/websites', websiteController.createWebsite);
router.put('/websites/:id', websiteController.updateWebsite);
router.delete('/websites/:id', websiteController.deleteWebsite);
router.post('/websites/:id/endpoints', websiteController.addEndpointToWebsite);

// ==========================================
// 3. API Endpoints CRUD & Control (6 routes)
// ==========================================
router.get('/endpoints', endpointController.getAllEndpoints);
router.get('/endpoints/:id', endpointController.getEndpointById);
router.post('/endpoints', endpointController.createEndpoint);
router.put('/endpoints/:id', endpointController.updateEndpoint);
router.delete('/endpoints/:id', endpointController.deleteEndpoint);
router.patch('/endpoints/:id/toggle', endpointController.toggleEndpointActive);

// ==========================================
// 4. Monitoring & Scheduling Engine (5 routes)
// ==========================================
router.post('/monitoring/start', monitoringController.startMonitoring);
router.get('/monitoring/status/:id', monitoringController.getMonitoringStatus);
router.get('/monitoring/history/:id', monitoringController.getMonitoringHistory);
router.post('/monitoring/check-now/:id', monitoringController.checkNow);
router.get('/monitoring/history', (req, res) => {
  const store = require('../db/store');
  res.json(store.getChecks(null, Number(req.query.limit || 50)));
});

// ==========================================
// 5. OpenAPI & Contract Drift (4 routes)
// ==========================================
router.get('/contracts', (req, res) => {
  const store = require('../db/store');
  res.json(store.getContracts());
});
router.post('/contracts', contractController.saveContract);
router.get('/contracts/:id', contractController.getContractById);
router.post('/contracts/validate-test', contractController.validateTestPayload);

// ==========================================
// 6. Alerting & Notification Adapters (4 routes)
// ==========================================
router.post('/alerts/configure', alertController.configureAlert);
router.get('/alerts', alertController.getAlerts);
router.post('/alerts/test', alertController.testAlert);
router.get('/alerts/logs', (req, res) => {
  const store = require('../db/store');
  res.json(store.getAlertLogs(Number(req.query.limit || 50)));
});

// ==========================================
// 7. Time-Series Analytics & Metrics (4 routes)
// ==========================================
router.get('/analytics/uptime', analyticsController.getUptime);
router.get('/analytics/latency', analyticsController.getLatency);
router.get('/analytics/failures', analyticsController.getFailures);
router.get('/analytics/summary', (req, res) => {
  const store = require('../db/store');
  const endpoints = store.getEndpoints();
  const checks = store.getChecks(null, 100);
  const upCount = endpoints.filter(e => e.lastStatus === 'UP').length;
  res.json({
    totalEndpoints: endpoints.length,
    upCount,
    downCount: endpoints.length - upCount,
    totalChecksExecuted: checks.length,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 8. BullMQ Job Queue & Workers (2 routes)
// ==========================================
router.get('/queue/metrics', (req, res) => {
  res.json(jobQueue.getMetrics());
});
router.post('/queue/clear-completed', (req, res) => {
  jobQueue.completedJobs = [];
  res.json({ message: 'Completed jobs cache cleared successfully' });
});

// ==========================================
// 9. Built-in Target APIs (Full CRUD: GET, POST, PUT, DELETE) (12 routes)
// ==========================================
// User Service
router.get('/mock/users', mockApiController.getMockUsers);
router.post('/mock/users', mockApiController.createMockUser);
router.put('/mock/users/:id', mockApiController.updateMockUser);
router.delete('/mock/users/:id', mockApiController.deleteMockUser);

// Order Service
router.get('/mock/orders', mockApiController.getMockOrders);
router.post('/mock/orders', mockApiController.createMockOrder);
router.delete('/mock/orders/:id', mockApiController.cancelMockOrder);

// Payment Service
router.get('/mock/payment-info', mockApiController.getMockPaymentInfo);
router.post('/mock/payments', mockApiController.processMockPayment);
router.post('/mock/payments/:id/refund', mockApiController.refundMockPayment);

// Products Service
router.get('/mock/products', mockApiController.getMockProducts);
router.post('/mock/products', mockApiController.createMockProduct);
router.put('/mock/products/:id', mockApiController.updateMockProduct);
router.delete('/mock/products/:id', mockApiController.deleteMockProduct);

// Telemetry & Drift Tools
router.get('/mock/slow-inventory', mockApiController.getMockSlowInventory);
router.get('/mock/telemetry', mockApiController.getMockTelemetry);
router.post('/mock/toggle-drift', mockApiController.toggleMockDrift);

// ==========================================
// 10. API Documentation Endpoint (1 route)
// ==========================================
router.get('/docs', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'API Sentinel Automated Platform',
      version: '2.0.0',
      description: 'Enterprise API Monitoring, Contract Validation, Job Queue & Multi-Website Reliability Platform',
      author: 'Shubham Giri'
    },
    servers: [{ url: '/api', description: 'Production API Gateway' }],
    routeCount: '35+ REST API Endpoints across 10 resource modules'
  });
});

module.exports = router;
