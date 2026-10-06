import React, { useState } from 'react';
import { FlaskConical, Shuffle, Play, Zap, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import axios from 'axios';

export default function MockSuiteLoader({ onRefreshAll }) {
  const [driftState, setDriftState] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  const handleToggleDrift = async () => {
    try {
      const res = await axios.post('/api/mock/toggle-drift');
      setDriftState(res.data.driftEnabled);
      setStatusMsg(res.data.message);
      setTimeout(() => setStatusMsg(''), 4000);
      onRefreshAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunAllChecks = async () => {
    setStatusMsg('Executing manual check across all monitored endpoints...');
    try {
      await axios.post('/api/monitoring/start');
      onRefreshAll();
      setTimeout(() => setStatusMsg('Check complete for all endpoints!'), 1000);
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Built-in Interactive Mock Test Suite</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          API Sentinel comes with built-in mock endpoints so you can test retries, schema drift detection, and latency warnings instantly.
        </p>
      </div>

      {statusMsg && (
        <div className="card" style={{ marginBottom: '1.5rem', background: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--primary)', fontWeight: 600 }}>
          <Zap size={18} inline style={{ marginRight: '0.5rem' }} />
          {statusMsg}
        </div>
      )}

      {/* Control Actions Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <div className="card-title">
            <FlaskConical size={20} color="var(--primary)" />
            Schema Drift & Simulation Controls
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shuffle size={18} color="var(--purple)" />
              Toggle Schema Drift (Payment API)
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Dynamically switch the mock Payment Gateway endpoint between returning a strict schema vs returning unexpected extra fields.
            </p>
            <button
              className={`btn ${driftState ? 'btn-danger' : 'btn-primary'}`}
              onClick={handleToggleDrift}
            >
              {driftState ? 'Disable Schema Drift (Return Strict v1 Schema)' : 'Enable Schema Drift (Inject Added Fields)'}
            </button>
          </div>

          <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Play size={18} color="var(--success)" />
              Trigger Global Monitoring Cycle
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Instantly run health checks across all registered targets without waiting for the background schedule interval.
            </p>
            <button className="btn btn-primary" onClick={handleRunAllChecks}>
              Execute Health Check on All Endpoints
            </button>
          </div>
        </div>
      </div>

      {/* Preset Endpoints Explanation Grid */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Available Out-of-the-Box Mock Endpoints</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        
        <div className="card">
          <span className="badge badge-success" style={{ marginBottom: '0.75rem' }}>Healthy Benchmark</span>
          <h4 style={{ fontWeight: 700 }}>User Management Microservice</h4>
          <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.35rem 0 0.75rem 0' }}>
            GET /api/mock/users
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Always returns 200 OK with strict compliance to User Schema v1.0. Demonstrates perfect uptime & valid contracts.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-warning" style={{ marginBottom: '0.75rem' }}>Flaky Retry Test</span>
          <h4 style={{ fontWeight: 700 }}>Order Processing Service</h4>
          <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.35rem 0 0.75rem 0' }}>
            GET /api/mock/orders
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Randomly fails 20% of requests with 503 errors. Demonstrates API Sentinel's <strong>Exponential Backoff Retry</strong> feature.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>Schema Drift Test</span>
          <h4 style={{ fontWeight: 700 }}>Payment Gateway Info</h4>
          <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.35rem 0 0.75rem 0' }}>
            GET /api/mock/payment-info
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Injects unannounced properties (`unexpectedTaxRate`, `deprecatedMerchantId`) to test the <strong>Schema Drift Engine</strong>.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-warning" style={{ marginBottom: '0.75rem' }}>High Latency Test</span>
          <h4 style={{ fontWeight: 700 }}>Inventory Sync Service</h4>
          <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.35rem 0 0.75rem 0' }}>
            GET /api/mock/slow-inventory
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Delays responses by 1800ms to test response time degradation tracking and <strong>High Latency Alerts</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}
