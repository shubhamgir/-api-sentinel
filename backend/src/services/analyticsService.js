const store = require('../db/store');

/**
 * Get system-wide and endpoint-specific uptime analytics.
 */
function getUptimeAnalytics() {
  const endpoints = store.getEndpoints();
  const checks = store.getChecks(null, 500);

  if (checks.length === 0) {
    return {
      overallUptimePct: 100,
      totalChecks: 0,
      successfulChecks: 0,
      failedChecks: 0,
      endpointsSummary: endpoints.map(e => ({
        id: e.id,
        name: e.name,
        uptimePct: 100,
        totalChecks: 0,
        lastStatus: 'PENDING'
      }))
    };
  }

  const totalChecks = checks.length;
  const successfulChecks = checks.filter(c => c.success && !c.contractValidation?.hasDrift).length;
  const failedChecks = totalChecks - successfulChecks;
  const overallUptimePct = Number(((successfulChecks / totalChecks) * 100).toFixed(2));

  const endpointsSummary = endpoints.map(ep => {
    const epChecks = checks.filter(c => c.endpointId === ep.id);
    const epTotal = epChecks.length;
    const epSuccess = epChecks.filter(c => c.success && !c.contractValidation?.hasDrift).length;
    const epUptimePct = epTotal > 0 ? Number(((epSuccess / epTotal) * 100).toFixed(2)) : 100;
    const lastCheck = epChecks[0] || null;

    return {
      id: ep.id,
      name: ep.name,
      url: ep.url,
      uptimePct: epUptimePct,
      totalChecks: epTotal,
      lastCheckAt: lastCheck ? lastCheck.timestamp : null,
      lastLatencyMs: lastCheck ? lastCheck.latencyMs : null,
      lastStatus: lastCheck ? (lastCheck.success ? 'UP' : 'DOWN') : 'PENDING',
      hasDrift: lastCheck ? (lastCheck.contractValidation?.hasDrift || false) : false
    };
  });

  return {
    overallUptimePct,
    totalChecks,
    successfulChecks,
    failedChecks,
    endpointsSummary
  };
}

/**
 * Get latency analytics (average, percentiles, and time-series trend points).
 */
function getLatencyAnalytics() {
  const checks = store.getChecks(null, 100).reverse(); // oldest to newest

  if (checks.length === 0) {
    return {
      avgLatencyMs: 0,
      p50: 0,
      p90: 0,
      p99: 0,
      trend: []
    };
  }

  const latencies = checks.map(c => c.latencyMs || 0).sort((a, b) => a - b);
  const sum = latencies.reduce((acc, curr) => acc + curr, 0);
  const avgLatencyMs = Math.round(sum / latencies.length);

  const getPercentile = (pct) => {
    const index = Math.floor((pct / 100) * latencies.length);
    return latencies[Math.min(index, latencies.length - 1)] || 0;
  };

  const trend = checks.map(c => ({
    timestamp: c.timestamp,
    timeLabel: new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    endpointId: c.endpointId,
    endpointName: c.endpointName,
    latencyMs: c.latencyMs,
    status: c.status,
    success: c.success
  }));

  return {
    avgLatencyMs,
    p50: getPercentile(50),
    p90: getPercentile(90),
    p99: getPercentile(99),
    trend
  };
}

/**
 * Get failure categorization metrics.
 */
function getFailureAnalytics() {
  const checks = store.getChecks(null, 200);
  const failures = checks.filter(c => !c.success || (c.contractValidation && c.contractValidation.hasDrift));

  const categories = {
    STATUS_MISMATCH: 0,
    HIGH_LATENCY_TIMEOUT: 0,
    SCHEMA_DRIFT: 0,
    NETWORK_CONNECTION_REFUSED: 0,
    OTHER_ERROR: 0
  };

  failures.forEach(f => {
    const err = f.errorMessage || '';
    const hasDrift = f.contractValidation?.hasDrift;

    if (hasDrift) {
      categories.SCHEMA_DRIFT++;
    } else if (err.includes('Status')) {
      categories.STATUS_MISMATCH++;
    } else if (err.includes('Timeout')) {
      categories.HIGH_LATENCY_TIMEOUT++;
    } else if (err.includes('Connection Refused')) {
      categories.NETWORK_CONNECTION_REFUSED++;
    } else {
      categories.OTHER_ERROR++;
    }
  });

  return {
    totalFailures: failures.length,
    categories,
    recentFailures: failures.slice(0, 10).map(f => ({
      id: f.id,
      endpointId: f.endpointId,
      endpointName: f.endpointName,
      errorMessage: f.errorMessage || (f.contractValidation ? f.contractValidation.driftSummary : 'Unknown Failure'),
      timestamp: f.timestamp,
      status: f.status
    }))
  };
}

module.exports = {
  getUptimeAnalytics,
  getLatencyAnalytics,
  getFailureAnalytics
};
