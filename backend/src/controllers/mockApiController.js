let driftEnabled = true;

// Mock storage for rich CRUD testing
let mockProducts = [
  { id: 1, name: 'Cloud Server Pro', category: 'Infrastructure', price: 99.99, inStock: true },
  { id: 2, name: 'Database Replica', category: 'Database', price: 149.00, inStock: true },
  { id: 3, name: 'AI Inference Node', category: 'Compute', price: 299.50, inStock: false }
];

let mockUsers = [
  { id: 'usr-101', name: 'Alice Smith', email: 'alice@sentinel.io', role: 'admin', active: true },
  { id: 'usr-102', name: 'Bob Jones', email: 'bob@sentinel.io', role: 'developer', active: true },
  { id: 'usr-103', name: 'Carol White', email: 'carol@sentinel.io', role: 'analyst', active: false }
];

const getMockUsers = (req, res) => {
  res.json({
    status: 'success',
    count: mockUsers.length,
    users: mockUsers
  });
};

const createMockUser = (req, res) => {
  const { name, email, role } = req.body || {};
  const newUser = {
    id: `usr-${Date.now().toString().slice(-4)}`,
    name: name || 'New Developer',
    email: email || `dev${Date.now()}@sentinel.io`,
    role: role || 'developer',
    active: true
  };
  mockUsers.push(newUser);
  res.status(201).json({ message: 'User created successfully', user: newUser });
};

const updateMockUser = (req, res) => {
  const { id } = req.params;
  const user = mockUsers.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  Object.assign(user, req.body || {});
  res.json({ message: 'User updated successfully', user });
};

const deleteMockUser = (req, res) => {
  const { id } = req.params;
  const idx = mockUsers.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  mockUsers.splice(idx, 1);
  res.json({ message: 'User deleted successfully', id });
};

const getMockOrders = (req, res) => {
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

const createMockOrder = (req, res) => {
  const newOrder = {
    orderId: `ord-${Date.now().toString().slice(-4)}`,
    items: req.body?.items || ['item-A', 'item-B'],
    total: req.body?.total || 199.99,
    status: 'CONFIRMED',
    createdAt: new Date().toISOString()
  };
  res.status(201).json({ message: 'Order placed successfully', order: newOrder });
};

const cancelMockOrder = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Order ${id} cancelled successfully`, status: 'CANCELLED' });
};

const getMockPaymentInfo = (req, res) => {
  if (driftEnabled) {
    return res.json({
      status: 'ok',
      currency: 'USD',
      gatewayVersion: 'v2.4-alpha',
      supportedMethods: ['card', 'bank', 'crypto'],
      unexpectedTaxRate: 0.18,
      experimentalFeatureFlag: true,
      deprecatedMerchantId: 991823
    });
  } else {
    return res.json({
      status: 'ok',
      currency: 'USD',
      gatewayVersion: 'v2.1',
      supportedMethods: ['card', 'bank']
    });
  }
};

const processMockPayment = (req, res) => {
  res.status(200).json({
    transactionId: `txn-${Date.now()}`,
    status: 'PROCESSED',
    amount: req.body?.amount || 99.00,
    timestamp: new Date().toISOString()
  });
};

const refundMockPayment = (req, res) => {
  const { id } = req.params;
  res.json({
    refundId: `ref-${Date.now()}`,
    originalTxn: id,
    status: 'REFUNDED',
    message: 'Refund approved'
  });
};

const getMockProducts = (req, res) => {
  res.json({ status: 'success', count: mockProducts.length, products: mockProducts });
};

const createMockProduct = (req, res) => {
  const newProduct = {
    id: mockProducts.length + 1,
    name: req.body?.name || 'Sample Product',
    category: req.body?.category || 'General',
    price: req.body?.price || 49.99,
    inStock: true
  };
  mockProducts.push(newProduct);
  res.status(201).json(newProduct);
};

const updateMockProduct = (req, res) => {
  const id = Number(req.params.id);
  const p = mockProducts.find(x => x.id === id);
  if (!p) return res.status(404).json({ error: 'Product not found' });
  Object.assign(p, req.body || {});
  res.json({ message: 'Product updated', product: p });
};

const deleteMockProduct = (req, res) => {
  const id = Number(req.params.id);
  mockProducts = mockProducts.filter(x => x.id !== id);
  res.json({ message: 'Product deleted', id });
};

const getMockSlowInventory = async (req, res) => {
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

const getMockTelemetry = (req, res) => {
  res.json({
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    activeWorkers: 4,
    nodeVersion: process.version
  });
};

module.exports = {
  getMockUsers,
  createMockUser,
  updateMockUser,
  deleteMockUser,
  getMockOrders,
  createMockOrder,
  cancelMockOrder,
  getMockPaymentInfo,
  processMockPayment,
  refundMockPayment,
  getMockProducts,
  createMockProduct,
  updateMockProduct,
  deleteMockProduct,
  getMockSlowInventory,
  toggleMockDrift,
  getMockTelemetry
};
