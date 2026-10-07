const express = require('express');
const cors = require('cors');
const apiRoutes = require('./src/routes/api');
const { startScheduler } = require('./src/services/scheduler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main API Router
app.use('/api', apiRoutes);

// Server Root & Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'API Sentinel Monitoring Core',
    timestamp: new Date().toISOString()
  });
});

// Serve Frontend in Production / Unified Deployment
const path = require('path');
const fs = require('fs');
const possibleDistPaths = [
  path.join(__dirname, '../frontend/dist'),
  path.join(__dirname, 'dist'),
  path.join(__dirname, 'public')
];
const distPath = possibleDistPaths.find(p => fs.existsSync(p));

if (distPath) {
  console.log(`📦 Serving static frontend from: ${distPath}`);
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 API Sentinel Backend Server running on port ${PORT}`);
  console.log(`📡 Base URL: http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
  
  // Start automated monitoring scheduler loop
  startScheduler();
});
