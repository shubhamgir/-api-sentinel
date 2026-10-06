import React, { useState } from 'react';
import {
  Globe,
  Plus,
  Radio,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Trash2,
  Edit,
  ExternalLink,
  Layers,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import axios from 'axios';

export default function WebsitesManager({ websites, endpoints, onRefreshAll, onCheckNow }) {
  const [selectedSiteId, setSelectedSiteId] = useState(websites[0]?.id || null);
  const [showAddWebsiteModal, setShowAddWebsiteModal] = useState(false);
  const [showAddEndpointModal, setShowAddEndpointModal] = useState(false);
  const [checkingIds, setCheckingIds] = useState({});

  const [websiteForm, setWebsiteForm] = useState({
    id: '',
    name: '',
    description: '',
    baseUrl: 'https://',
    environment: 'Production'
  });

  const [endpointForm, setEndpointForm] = useState({
    name: '',
    url: '',
    method: 'GET',
    expectedStatus: 200,
    timeoutMs: 3000,
    intervalSeconds: 15,
    retryCount: 2
  });

  const selectedSite = websites.find(w => w.id === selectedSiteId) || websites[0] || null;

  // Filter endpoints for selected website
  const siteEndpoints = endpoints.filter(ep => ep.websiteId === selectedSite?.id);

  const handleCreateWebsite = async (e) => {
    e.preventDefault();
    try {
      const generatedId = websiteForm.id || `web-${Math.floor(1000 + Math.random() * 9000)}`;
      await axios.post('/api/websites', {
        ...websiteForm,
        id: generatedId
      });
      setShowAddWebsiteModal(false);
      setWebsiteForm({
        id: '',
        name: '',
        description: '',
        baseUrl: 'https://',
        environment: 'Production'
      });
      onRefreshAll();
    } catch (err) {
      alert('Failed to create website: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleAddEndpointToSite = async (e) => {
    e.preventDefault();
    if (!selectedSite) return;
    try {
      await axios.post(`/api/websites/${selectedSite.id}/endpoints`, endpointForm);
      setShowAddEndpointModal(false);
      setEndpointForm({
        name: '',
        url: '',
        method: 'GET',
        expectedStatus: 200,
        timeoutMs: 3000,
        intervalSeconds: 15,
        retryCount: 2
      });
      onRefreshAll();
    } catch (err) {
      alert('Failed to add endpoint: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteWebsite = async (siteId) => {
    if (!window.confirm('Are you sure you want to delete this website project?')) return;
    try {
      await axios.delete(`/api/websites/${siteId}`);
      if (selectedSiteId === siteId) {
        setSelectedSiteId(websites.find(w => w.id !== siteId)?.id || null);
      }
      onRefreshAll();
    } catch (err) {
      alert('Failed to delete website: ' + err.message);
    }
  };

  const handleManualCheck = async (epId) => {
    setCheckingIds(prev => ({ ...prev, [epId]: true }));
    await onCheckNow(epId);
    setCheckingIds(prev => ({ ...prev, [epId]: false }));
  };

  const getMethodBadgeClass = (method) => {
    switch (method?.toUpperCase()) {
      case 'GET': return 'badge-success';
      case 'POST': return 'badge-primary';
      case 'PUT': return 'badge-warning';
      case 'DELETE': return 'badge-danger';
      default: return 'badge-subtle';
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Website & Project Architecture</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Group, monitor, and measure REST endpoints (GET, POST, PUT, DELETE) organized by website ID, name, description, and latency.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddWebsiteModal(true)}>
          <Plus size={16} /> Add Website / Project
        </button>
      </div>

      {/* Main Split Grid: Left Sidebar Websites, Right Endpoints & Latencies */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left: Websites Directory Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Registered Websites ({websites.length})
          </div>

          {websites.map(site => {
            const isSelected = selectedSite?.id === site.id;
            const siteEps = endpoints.filter(e => e.websiteId === site.id);
            const downCount = siteEps.filter(e => e.lastStatus === 'DOWN').length;

            return (
              <div
                key={site.id}
                onClick={() => setSelectedSiteId(site.id)}
                className="card"
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                  boxShadow: isSelected ? '0 0 0 2px var(--primary)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease',
                  padding: '1.15rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={18} color={isSelected ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span style={{ fontWeight: 800, fontSize: '0.98rem' }}>{site.name}</span>
                  </div>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '0.7rem' }}>
                    {site.id}
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.35rem 0 0.75rem 0', lineHeight: 1.4 }}>
                  {site.description || 'No description provided'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    <strong>{siteEps.length}</strong> endpoints registered
                  </span>
                  {downCount > 0 ? (
                    <span className="badge badge-danger">{downCount} DOWN</span>
                  ) : siteEps.length > 0 ? (
                    <span className="badge badge-success">ALL OPERATIONAL</span>
                  ) : (
                    <span className="badge badge-subtle">EMPTY</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Website Panel with Endpoints, Latency, and Methods */}
        {selectedSite ? (
          <div>
            {/* Website Metadata Header Card */}
            <div className="card" style={{ marginBottom: '1.5rem', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{selectedSite.name}</h3>
                    <span className="badge badge-subtle font-mono" style={{ fontSize: '0.75rem' }}>
                      ID: {selectedSite.id}
                    </span>
                    <span className="badge badge-success">{selectedSite.environment || 'Production'}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.4rem', maxWidth: '650px' }}>
                    {selectedSite.description}
                  </p>
                  {selectedSite.baseUrl && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--primary)' }}>
                      <ExternalLink size={14} />
                      <a href={selectedSite.baseUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {selectedSite.baseUrl}
                      </a>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => handleDeleteWebsite(selectedSite.id)}>
                    <Trash2 size={14} /> Delete Site
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowAddEndpointModal(true)}>
                    <Plus size={14} /> Add Route Endpoint
                  </button>
                </div>
              </div>

              {/* Aggregated Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '0.85rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL ROUTES</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{siteEndpoints.length}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>HEALTH STATUS</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--success-text)' }}>
                    {siteEndpoints.filter(e => e.lastStatus === 'DOWN').length === 0 ? 'HEALTHY (100%)' : 'DEGRADED'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG RESPONSE TIME</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {siteEndpoints.reduce((acc, ep) => acc + (ep.lastLatencyMs || 0), 0) / (siteEndpoints.length || 1) | 0} ms
                  </div>
                </div>
              </div>
            </div>

            {/* Endpoints Table with URL, Method, Latency ms */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <Radio size={18} color="var(--primary)" />
                  Monitored Route Endpoints ({siteEndpoints.length})
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => onRefreshAll()}>
                  <RotateCw size={14} /> Refresh
                </button>
              </div>

              {siteEndpoints.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <Radio size={32} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
                  <div>No endpoints registered under <strong>{selectedSite.name}</strong> yet.</div>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }} onClick={() => setShowAddEndpointModal(true)}>
                    <Plus size={14} /> Add First Route
                  </button>
                </div>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Method</th>
                        <th>URL / Endpoint Path</th>
                        <th>Response Time</th>
                        <th>Expected HTTP</th>
                        <th>Frequency</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siteEndpoints.map(ep => {
                        const isChecking = checkingIds[ep.id];
                        return (
                          <tr key={ep.id}>
                            <td>
                              {ep.lastStatus === 'UP' ? (
                                <span className="badge badge-success">UP</span>
                              ) : ep.lastStatus === 'DOWN' ? (
                                <span className="badge badge-danger">DOWN</span>
                              ) : (
                                <span className="badge badge-subtle">PENDING</span>
                              )}
                            </td>
                            <td>
                              <span className={`badge ${getMethodBadgeClass(ep.method)} font-mono`}>
                                {ep.method}
                              </span>
                            </td>
                            <td>
                              <div style={{ fontWeight: 700 }}>{ep.name}</div>
                              <code style={{ fontSize: '0.78rem', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
                                {ep.url}
                              </code>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Clock size={14} color="var(--text-muted)" />
                                <strong className="font-mono" style={{ color: ep.lastLatencyMs > 1000 ? 'var(--warning-text)' : 'inherit' }}>
                                  {ep.lastLatencyMs !== null && ep.lastLatencyMs !== undefined ? `${ep.lastLatencyMs} ms` : '—'}
                                </strong>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-subtle font-mono">{ep.expectedStatus}</span>
                            </td>
                            <td>Every {ep.intervalSeconds}s</td>
                            <td>
                              <button
                                className="btn btn-outline btn-sm"
                                onClick={() => handleManualCheck(ep.id)}
                                disabled={isChecking}
                                title="Run Health Check Now"
                              >
                                <RotateCw size={12} className={isChecking ? 'spin' : ''} />
                                {isChecking ? 'Checking...' : 'Check'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Please select or create a website to view endpoints.
          </div>
        )}

      </div>

      {/* Modal: Add Website */}
      {showAddWebsiteModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Register Website / Project
            </h3>
            <form onSubmit={handleCreateWebsite}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Website ID</label>
                  <input
                    type="text"
                    className="form-input font-mono"
                    placeholder="web-6789"
                    value={websiteForm.id}
                    onChange={e => setWebsiteForm({ ...websiteForm, id: e.target.value })}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Leave blank to auto-generate</span>
                </div>
                <div className="form-group">
                  <label className="form-label">Website / Project Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Acme Production Portal"
                    required
                    value={websiteForm.name}
                    onChange={e => setWebsiteForm({ ...websiteForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Describe the purpose, architecture, and SLA of this website or API cluster..."
                  value={websiteForm.description}
                  onChange={e => setWebsiteForm({ ...websiteForm, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Base URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://api.acme.com"
                    value={websiteForm.baseUrl}
                    onChange={e => setWebsiteForm({ ...websiteForm, baseUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Environment</label>
                  <select
                    className="form-select"
                    value={websiteForm.environment}
                    onChange={e => setWebsiteForm({ ...websiteForm, environment: e.target.value })}
                  >
                    <option value="Production">Production</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                    <option value="External">External</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddWebsiteModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Endpoint to Selected Website */}
      {showAddEndpointModal && selectedSite && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Add Route to {selectedSite.name}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Target Website ID: <code className="font-mono">{selectedSite.id}</code>
            </p>

            <form onSubmit={handleAddEndpointToSite}>
              <div className="form-group">
                <label className="form-label">Route / Feature Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. User Profile Query"
                  required
                  value={endpointForm.name}
                  onChange={e => setEndpointForm({ ...endpointForm, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Method</label>
                  <select
                    className="form-select"
                    value={endpointForm.method}
                    onChange={e => setEndpointForm({ ...endpointForm, method: e.target.value })}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Endpoint URL or Path</label>
                  <input
                    type="text"
                    className="form-input font-mono"
                    placeholder="https://api.example.com/v1/users or /api/v1/users"
                    required
                    value={endpointForm.url}
                    onChange={e => setEndpointForm({ ...endpointForm, url: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Expected HTTP</label>
                  <input
                    type="number"
                    className="form-input"
                    value={endpointForm.expectedStatus}
                    onChange={e => setEndpointForm({ ...endpointForm, expectedStatus: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Timeout (ms)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={endpointForm.timeoutMs}
                    onChange={e => setEndpointForm({ ...endpointForm, timeoutMs: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Interval (s)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={endpointForm.intervalSeconds}
                    onChange={e => setEndpointForm({ ...endpointForm, intervalSeconds: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddEndpointModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Endpoint Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
