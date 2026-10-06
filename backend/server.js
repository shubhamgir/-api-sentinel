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

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 API Sentinel Backend Server running on port ${PORT}`);
  console.log(`📡 Base URL: http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
  
  // Start automated monitoring scheduler loop
  startScheduler();
});
