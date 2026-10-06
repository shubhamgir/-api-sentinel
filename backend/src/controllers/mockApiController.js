let driftEnabled = true;

const getMockUsers = (req, res) => {
  res.json({
    status: 'success',
    count: 3,
    users: [
      { id: 'usr-101', name: 'Alice Smith', email: 'alice@sentinel.io', role: 'admin' },
      { id: 'usr-102', name: 'Bob Jones', email: 'bob@sentinel.io', role: 'developer' },
      { id: 'usr-103', name: 'Carol White', email: 'carol@sentinel.io', role: 'analyst' }
    ]
  });
};

const getMockOrders = (req, res) => {
  // Simulate 20% flaky failure for demo
  const isFlaky = Math.random() < 0.2;
  if (isFlaky) {
    return res.status(503).json({ error: 'Service Temporarily Overloaded (Simulated Flakiness)' });
  }

  res.json({
    status: 'active',
    totalOrders: 142,
    latestOrderId: 'ord-9921',
    processedAt: new Date().toISOString()
  });
};

const getMockPaymentInfo = (req, res) => {
  if (driftEnabled) {
    // Returns extra fields and schema drift
    return res.json({
      status: 'ok',
      currency: 'USD',
      gatewayVersion: 'v2.4-alpha',
      supportedMethods: ['card', 'bank', 'crypto'],
      // Schema Drift additions:
      unexpectedTaxRate: 0.18,
      experimentalFeatureFlag: true,
      deprecatedMerchantId: 991823
    });
  } else {
    // Conforms strictly to schema
    return res.json({
      status: 'ok',
      currency: 'USD',
      gatewayVersion: 'v2.1',
      supportedMethods: ['card', 'bank']
    });
  }
};

const getMockSlowInventory = async (req, res) => {
  // Delay 1800ms to trigger latency alert
  await new Promise(resolve => setTimeout(resolve, 1800));
  res.json({
    status: 'synced',
    itemsCount: 4520,
    warehouseRegion: 'us-east-1',
    lastSyncDurationMs: 1800
  });
};

const toggleMockDrift = (req, res) => {
  driftEnabled = !driftEnabled;
  res.json({
    message: `Mock API Schema Drift mode set to ${driftEnabled ? 'ENABLED (Drifted)' : 'DISABLED (Strict conform)'}`,
    driftEnabled
  });
};

module.exports = {
  getMockUsers,
  getMockOrders,
  getMockPaymentInfo,
  getMockSlowInventory,
  toggleMockDrift
};
