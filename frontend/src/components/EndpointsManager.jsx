import React, { useState } from 'react';
import {
  Plus,
  Play,
  Pause,
  Trash2,
  Edit3,
  Globe,
  Clock,
  ShieldCheck,
  AlertTriangle,
  RotateCw
} from 'lucide-react';

export default function EndpointsManager({ endpoints, onAddEndpoint, onToggleActive, onDeleteEndpoint, onCheckNow }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [checkingIds, setCheckingIds] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    method: 'GET',
    expectedStatus: 200,
    timeoutMs: 3000,
    intervalSeconds: 15,
    retryCount: 2
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEndpoint(formData);
    setShowAddModal(false);
    setFormData({
      name: '',
      url: '',
      method: 'GET',
      expectedStatus: 200,
      timeoutMs: 3000,
      intervalSeconds: 15,
      retryCount: 2
    });
  };

  const handleManualCheck = async (id) => {
    setCheckingIds(prev => ({ ...prev, [id]: true }));
    await onCheckNow(id);
    setCheckingIds(prev => ({ ...prev, [id]: false }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Monitored Endpoints</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Register REST API targets for scheduled availability, latency, and schema monitoring.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Add Endpoint
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '1.25rem' }}>
        {endpoints.map(ep => {
          const isChecking = checkingIds[ep.id];
          return (
            <div key={ep.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{ep.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <span className="badge badge-subtle font-mono">{ep.method}</span>
                      <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
                        {ep.url}
                      </span>
                    </div>
                  </div>
                  <div>
                    {ep.lastStatus === 'UP' ? (
                      <span className="badge badge-success">UP</span>
                    ) : ep.lastStatus === 'DOWN' ? (
                      <span className="badge badge-danger">DOWN</span>
                    ) : (
                      <span className="badge badge-subtle">PENDING</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', margin: '1rem 0', padding: '0.75rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Expected HTTP:</span> <strong>{ep.expectedStatus}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Check Frequency:</span> <strong>{ep.intervalSeconds}s</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Latency Timeout:</span> <strong>{ep.timeoutMs}ms</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Retries:</span> <strong>{ep.retryCount || 1}x Backoff</strong>
                  </div>
                </div>

                {ep.hasDrift && (
                  <div className="badge badge-purple" style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}>
                    <AlertTriangle size={14} /> Contract Schema Drift Detected
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <button
                  className={`btn btn-sm ${ep.active ? 'btn-outline' : 'btn-primary'}`}
                  onClick={() => onToggleActive(ep.id)}
                >
                  {ep.active ? <Pause size={14} /> : <Play size={14} />}
                  {ep.active ? 'Pause' : 'Activate'}
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleManualCheck(ep.id)}
                    disabled={isChecking}
                  >
                    <RotateCw size={14} className={isChecking ? 'spin' : ''} />
                    {isChecking ? 'Checking...' : 'Check Now'}
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDeleteEndpoint(ep.id)}
                    title="Delete endpoint"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Endpoint Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Register New API Endpoint
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Service / Endpoint Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. User Profile Microservice"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target REST URL</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="http://localhost:5000/api/mock/users"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">HTTP Method</label>
                  <select
                    className="form-select"
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Expected Status Code</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.expectedStatus}
                    onChange={(e) => setFormData({ ...formData, expectedStatus: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Check Interval (sec)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.intervalSeconds}
                    onChange={(e) => setFormData({ ...formData, intervalSeconds: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Timeout (ms)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.timeoutMs}
                    onChange={(e) => setFormData({ ...formData, timeoutMs: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Retry Attempts</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.retryCount}
                    onChange={(e) => setFormData({ ...formData, retryCount: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Register Endpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
