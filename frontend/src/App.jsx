import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import EndpointsManager from './components/EndpointsManager';
import WebsitesManager from './components/WebsitesManager';
import ContractDriftInspector from './components/ContractDriftInspector';
import MonitoringHistoryLogs from './components/MonitoringHistoryLogs';
import AlertCenter from './components/AlertCenter';
import MockSuiteLoader from './components/MockSuiteLoader';
import QueueDashboard from './components/QueueDashboard';
import EnterpriseLanding from './components/EnterpriseLanding';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [globalStatus, setGlobalStatus] = useState('OPERATIONAL');

  const [websites, setWebsites] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [alertConfigs, setAlertConfigs] = useState([]);
  const [alertLogs, setAlertLogs] = useState([]);
  const [historyLogs, setHistoryLogs] = useState([]);

  const [uptimeData, setUptimeData] = useState(null);
  const [latencyData, setLatencyData] = useState(null);
  const [failureData, setFailureData] = useState(null);

  const fetchAllData = async () => {
    try {
      const [webRes, epRes, uptimeRes, latencyRes, failRes, historyRes, alertRes] = await Promise.all([
        axios.get('/api/websites'),
        axios.get('/api/endpoints'),
        axios.get('/api/analytics/uptime'),
        axios.get('/api/analytics/latency'),
        axios.get('/api/analytics/failures'),
        axios.get('/api/monitoring/history/all?limit=50'),
        axios.get('/api/alerts')
      ]);

      setWebsites(webRes.data || []);
      setEndpoints(epRes.data || []);
      setUptimeData(uptimeRes.data);
      setLatencyData(latencyRes.data);
      setFailureData(failRes.data);
      setHistoryLogs(historyRes.data || []);
      
      if (alertRes.data) {
        setAlertConfigs(alertRes.data.configurations || []);
        setAlertLogs(alertRes.data.logs || []);
      }

      // Check if any endpoint is DOWN
      const downEndpoints = (epRes.data || []).filter(e => e.lastStatus === 'DOWN');
      if (downEndpoints.length > 0) {
        setGlobalStatus('DEGRADED');
      } else {
        setGlobalStatus('OPERATIONAL');
      }

      // Fetch contracts for endpoints
      const contractPromises = (epRes.data || []).map(ep =>
        axios.get(`/api/contracts/${ep.id}`).then(r => r.data).catch(() => null)
      );
      const contractResults = await Promise.all(contractPromises);
      setContracts(contractResults.filter(Boolean));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleAddEndpoint = async (formData) => {
    try {
      await axios.post('/api/endpoints', formData);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await axios.patch(`/api/endpoints/${id}/toggle`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEndpoint = async (id) => {
    if (!window.confirm('Are you sure you want to delete this endpoint?')) return;
    try {
      await axios.delete(`/api/endpoints/${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckNow = async (id) => {
    try {
      await axios.post(`/api/monitoring/check-now/${id}`);
      await fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveContract = async (contractData) => {
    try {
      await axios.post('/api/contracts', contractData);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveAlertConfig = async (alertData) => {
    try {
      await axios.post('/api/alerts/configure', alertData);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestAlert = async (testData) => {
    try {
      const res = await axios.post('/api/alerts/test', testData);
      fetchAllData();
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        globalStatus={globalStatus}
        onRefreshAll={fetchAllData}
      />

      <main className="main-content">
        {activeTab === 'landing' && (
          <EnterpriseLanding
            endpoints={endpoints}
            uptimeData={uptimeData}
            latencyData={latencyData}
            onNavigateDashboard={setActiveTab}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardOverview
            uptimeData={uptimeData}
            latencyData={latencyData}
            failureData={failureData}
            endpoints={endpoints}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'websites' && (
          <WebsitesManager
            websites={websites}
            endpoints={endpoints}
            onRefreshAll={fetchAllData}
            onCheckNow={handleCheckNow}
          />
        )}

        {activeTab === 'endpoints' && (
          <EndpointsManager
            endpoints={endpoints}
            onAddEndpoint={handleAddEndpoint}
            onToggleActive={handleToggleActive}
            onDeleteEndpoint={handleDeleteEndpoint}
            onCheckNow={handleCheckNow}
          />
        )}

        {activeTab === 'contracts' && (
          <ContractDriftInspector
            endpoints={endpoints}
            contracts={contracts}
            onSaveContract={handleSaveContract}
          />
        )}

        {activeTab === 'history' && (
          <MonitoringHistoryLogs
            logs={historyLogs}
            onRefreshLogs={fetchAllData}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertCenter
            alertConfigs={alertConfigs}
            alertLogs={alertLogs}
            onSaveAlertConfig={handleSaveAlertConfig}
            onTestAlert={handleTestAlert}
          />
        )}

        {activeTab === 'mock' && (
          <MockSuiteLoader
            onRefreshAll={fetchAllData}
          />
        )}

        {activeTab === 'queue' && (
          <QueueDashboard />
        )}
      </main>
    </div>
  );
}
