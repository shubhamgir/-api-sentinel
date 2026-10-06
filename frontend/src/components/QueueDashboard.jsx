import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  RefreshCw,
  Zap
} from 'lucide-react';

export default function QueueDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);

  const fetchMetrics = async () => {
    try {
      const res = await axios.get('/api/queue/metrics');
      setMetrics(res.data);
    } catch (err) {
      console.error('Failed to fetch queue metrics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 4000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(key);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const apiEndpoints = [
    { method: 'POST', path: '/api/auth/register', tag: 'Auth', desc: 'Register a new user' },
    { method: 'POST', path: '/api/auth/login', tag: 'Auth', desc: 'Login & get JWT token' },
    { method: 'GET', path: '/api/endpoints', tag: 'Endpoints', desc: 'List all monitored endpoints' },
    { method: 'POST', path: '/api/endpoints', tag: 'Endpoints', desc: 'Register a new API endpoint' },
    { method: 'PUT', path: '/api/endpoints/:id', tag: 'Endpoints', desc: 'Update endpoint config' },
    { method: 'DELETE', path: '/api/endpoints/:id', tag: 'Endpoints', desc: 'Delete endpoint and its history' },
    { method: 'PATCH', path: '/api/endpoints/:id/toggle', tag: 'Endpoints', desc: 'Toggle monitoring active/paused' },
    { method: 'POST', path: '/api/monitoring/check-now/:id', tag: 'Monitoring', desc: 'Trigger immediate health check' },
    { method: 'GET', path: '/api/monitoring/status/:id', tag: 'Monitoring', desc: 'Get latest check status' },
    { method: 'GET', path: '/api/monitoring/history/:id', tag: 'Monitoring', desc: 'Fetch time-series check history (default 50 entries)' },
    { method: 'POST', path: '/api/contracts', tag: 'Contracts', desc: 'Save JSON Schema contract for endpoint' },
    { method: 'GET', path: '/api/contracts/:id', tag: 'Contracts', desc: 'Get contract by endpoint ID' },
    { method: 'POST', path: '/api/contracts/validate-test', tag: 'Contracts', desc: 'Validate a test payload against a schema' },
    { method: 'POST', path: '/api/alerts/configure', tag: 'Alerts', desc: 'Configure webhook/email alert rule' },
    { method: 'GET', path: '/api/alerts', tag: 'Alerts', desc: 'List alert configs & recent logs' },
    { method: 'POST', path: '/api/alerts/test', tag: 'Alerts', desc: 'Send a test alert notification' },
    { method: 'GET', path: '/api/analytics/uptime', tag: 'Analytics', desc: 'Get system & per-endpoint uptime %' },
    { method: 'GET', path: '/api/analytics/latency', tag: 'Analytics', desc: 'Latency average, p50, p90, p99 & trend' },
    { method: 'GET', path: '/api/analytics/failures', tag: 'Analytics', desc: 'Failure categorization breakdown' },
    { method: 'GET', path: '/api/queue/metrics', tag: 'Queue', desc: 'BullMQ-style job queue metrics & worker stats' },
  ];

  const tagColors = {
    Auth: { bg: 'var(--bg-subtle)', color: 'var(--text-muted)' },
    Endpoints: { bg: 'var(--primary-light)', color: 'var(--primary)' },
    Monitoring: { bg: 'var(--success-bg)', color: 'var(--success-text)' },
    Contracts: { bg: 'var(--purple-bg)', color: 'var(--purple-text)' },
    Alerts: { bg: 'var(--danger-bg)', color: 'var(--danger-text)' },
    Analytics: { bg: 'var(--warning-bg)', color: 'var(--warning-text)' },
    Queue: { bg: '#EFF6FF', color: '#1D4ED8' }
  };

  const methodColors = {
    GET: { bg: '#ECFDF5', color: '#065F46' },
    POST: { bg: '#EEF2FF', color: '#3730A3' },
    PUT: { bg: '#FEF3C7', color: '#92400E' },
    DELETE: { bg: '#FEE2E2', color: '#991B1B' },
    PATCH: { bg: '#F3E8FF', color: '#6B21A8' }
  };

  const groupedEndpoints = apiEndpoints.reduce((acc, ep) => {
    if (!acc[ep.tag]) acc[ep.tag] = [];
    acc[ep.tag].push(ep);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Job Queue & API Documentation</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          BullMQ-style monitoring job queue metrics, worker concurrency stats, and full REST API reference.
        </p>
      </div>

      {/* Job Queue Metrics Panel */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <div className="card-title">
            <Layers size={18} color="var(--primary)" />
            BullMQ Job Queue — Live Worker Metrics
          </div>
          <button className="btn btn-outline btn-sm" onClick={fetchMetrics}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading queue metrics...</div>
        ) : metrics ? (
          <>
            <div className="stats-grid" style={{ marginBottom: '1rem' }}>
              <div className="stat-card">
                <div className="stat-info">
                  <h4>Active Workers</h4>
                  <div className="stat-value" style={{ color: 'var(--primary)' }}>{metrics.activeWorkers}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>of {metrics.concurrency} slots</div>
                </div>
                <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  <Zap size={24} />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <h4>Waiting Jobs</h4>
                  <div className="stat-value">{metrics.waitingCount}</div>
                </div>
                <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
                  <Clock size={24} />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <h4>Completed</h4>
                  <div className="stat-value" style={{ color: 'var(--success-text)' }}>{metrics.stats.totalCompleted}</div>
                </div>
                <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
                  <CheckCircle2 size={24} />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <h4>Failed</h4>
                  <div className="stat-value" style={{ color: 'var(--danger-text)' }}>{metrics.stats.totalFailed}</div>
                </div>
                <div className="stat-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
                  <XCircle size={24} />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <h4>Deduplicated</h4>
                  <div className="stat-value" style={{ color: 'var(--purple-text)' }}>{metrics.stats.totalDeduplicated}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>duplicate jobs suppressed</div>
                </div>
                <div className="stat-icon" style={{ background: 'var(--purple-bg)', color: 'var(--purple)' }}>
                  <Layers size={24} />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <h4>Total Queued</h4>
                  <div className="stat-value">{metrics.stats.totalQueued}</div>
                </div>
                <div className="stat-icon" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                  <Layers size={24} />
                </div>
              </div>
            </div>

            {/* Worker Concurrency Bar */}
            <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <span>Worker Concurrency Utilization</span>
                <span style={{ color: 'var(--primary)' }}>{metrics.activeWorkers}/{metrics.concurrency} slots used</span>
              </div>
              <div style={{ background: 'var(--border-color)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(metrics.activeWorkers / metrics.concurrency) * 100}%`,
                  background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                  borderRadius: '5px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>

            {/* Recent Jobs */}
            {metrics.recentJobs && metrics.recentJobs.length > 0 && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>RECENT JOB EXECUTIONS</div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Job ID</th>
                        <th>Endpoint</th>
                        <th>Status</th>
                        <th>Attempts</th>
                        <th>Queued At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.recentJobs.slice(0, 8).map(job => (
                        <tr key={job.id}>
                          <td className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{job.id}</td>
                          <td><strong>{job.endpointName}</strong></td>
                          <td>
                            {job.status === 'COMPLETED' ? (
                              <span className="badge badge-success">COMPLETED</span>
                            ) : job.status === 'FAILED' ? (
                              <span className="badge badge-danger">FAILED</span>
                            ) : job.status === 'RETRYING' ? (
                              <span className="badge badge-warning">RETRYING</span>
                            ) : (
                              <span className="badge badge-subtle">{job.status}</span>
                            )}
                          </td>
                          <td>{job.attempts || 0}</td>
                          <td className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(job.queuedAt).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger-text)' }}>Failed to load queue metrics.</div>
        )}
      </div>

      {/* API Reference Docs */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Copy size={18} color="var(--primary)" />
            REST API Reference Documentation
          </div>
          <span className="badge badge-success">v1.0.0</span>
        </div>

        {Object.entries(groupedEndpoints).map(([tag, endpoints]) => {
          const tc = tagColors[tag] || tagColors.Auth;
          return (
            <div key={tag} style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.3rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: tc.bg,
                color: tc.color,
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem'
              }}>
                {tag}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {endpoints.map((ep, i) => {
                  const mc = methodColors[ep.method] || methodColors.GET;
                  const key = `${ep.method}:${ep.path}`;
                  return (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 1rem',
                      background: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        background: mc.bg,
                        color: mc.color,
                        minWidth: '52px',
                        textAlign: 'center'
                      }}>
                        {ep.method}
                      </span>
                      <code style={{ fontSize: '0.85rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)', flex: 1 }}>
                        {ep.path}
                      </code>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', flex: 2 }}>{ep.desc}</span>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => copyToClipboard(`http://localhost:5000${ep.path}`, key)}
                        title="Copy URL"
                      >
                        <Copy size={12} />
                        {copiedEndpoint === key ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
