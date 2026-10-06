const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const endpointController = require('../controllers/endpointController');
const monitoringController = require('../controllers/monitoringController');
const contractController = require('../controllers/contractController');
const alertController = require('../controllers/alertController');
const analyticsController = require('../controllers/analyticsController');
const mockApiController = require('../controllers/mockApiController');

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

// Built-in Mock Test Target Endpoints
router.get('/mock/users', mockApiController.getMockUsers);
router.get('/mock/orders', mockApiController.getMockOrders);
router.get('/mock/payment-info', mockApiController.getMockPaymentInfo);
router.get('/mock/slow-inventory', mockApiController.getMockSlowInventory);
router.post('/mock/toggle-drift', mockApiController.toggleMockDrift);

module.exports = router;
