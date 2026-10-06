const {
  getUptimeAnalytics,
  getLatencyAnalytics,
  getFailureAnalytics
} = require('../services/analyticsService');

const getUptime = (req, res) => {
  res.json(getUptimeAnalytics());
};

const getLatency = (req, res) => {
  res.json(getLatencyAnalytics());
};

const getFailures = (req, res) => {
  res.json(getFailureAnalytics());
};

module.exports = {
  getUptime,
  getLatency,
  getFailures
};
