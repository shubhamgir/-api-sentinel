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
    // 1. Auth (3 routes)
    { method: 'POST', path: '/api/auth/register', tag: 'Auth', desc: 'Register a new developer account' },
    { method: 'POST', path: '/api/auth/login', tag: 'Auth', desc: 'Authenticate and receive JWT token' },
    { method: 'GET', path: '/api/auth/me', tag: 'Auth', desc: 'Get current user profile and session data' },

    // 2. Websites / Projects (6 routes)
    { method: 'GET', path: '/api/websites', tag: 'Websites', desc: 'List all registered website projects with stats' },
    { method: 'GET', path: '/api/websites/:id', tag: 'Websites', desc: 'Fetch single website details & route health' },
    { method: 'POST', path: '/api/websites', tag: 'Websites', desc: 'Create new website project (e.g. web-6789)' },
    { method: 'PUT', path: '/api/websites/:id', tag: 'Websites', desc: 'Update website metadata, environment, SLA' },
    { method: 'DELETE', path: '/api/websites/:id', tag: 'Websites', desc: 'Delete website project and unlink routes' },
    { method: 'POST', path: '/api/websites/:id/endpoints', tag: 'Websites', desc: 'Register endpoint directly under website' },

    // 3. Endpoints (6 routes)
    { method: 'GET', path: '/api/endpoints', tag: 'Endpoints', desc: 'List all monitored endpoints across systems' },
    { method: 'GET', path: '/api/endpoints/:id', tag: 'Endpoints', desc: 'Get single endpoint with recent check logs' },
    { method: 'POST', path: '/api/endpoints', tag: 'Endpoints', desc: 'Register new API endpoint target' },
    { method: 'PUT', path: '/api/endpoints/:id', tag: 'Endpoints', desc: 'Update endpoint parameters, headers, timeout' },
    { method: 'DELETE', path: '/api/endpoints/:id', tag: 'Endpoints', desc: 'Delete endpoint and its time-series history' },
    { method: 'PATCH', path: '/api/endpoints/:id/toggle', tag: 'Endpoints', desc: 'Toggle monitoring active or paused state' },

    // 4. Monitoring (5 routes)
    { method: 'POST', path: '/api/monitoring/start', tag: 'Monitoring', desc: 'Trigger global background monitoring cycle' },
    { method: 'GET', path: '/api/monitoring/status/:id', tag: 'Monitoring', desc: 'Get current health and schema drift status' },
    { method: 'GET', path: '/api/monitoring/history/:id', tag: 'Monitoring', desc: 'Fetch time-series latency & status logs' },
    { method: 'GET', path: '/api/monitoring/history', tag: 'Monitoring', desc: 'Query all global check logs with limit' },
    { method: 'POST', path: '/api/monitoring/check-now/:id', tag: 'Monitoring', desc: 'Execute instant manual check with retry' },

    // 5. Contracts & Schema (4 routes)
    { method: 'GET', path: '/api/contracts', tag: 'Contracts', desc: 'List all registered JSON Schema contracts' },
    { method: 'POST', path: '/api/contracts', tag: 'Contracts', desc: 'Save OpenAPI / JSON Schema definition' },
    { method: 'GET', path: '/api/contracts/:id', tag: 'Contracts', desc: 'Retrieve contract by endpoint ID' },
    { method: 'POST', path: '/api/contracts/validate-test', tag: 'Contracts', desc: 'Test schema validator against raw payload' },

    // 6. Alerts (4 routes)
    { method: 'POST', path: '/api/alerts/configure', tag: 'Alerts', desc: 'Configure webhook/email alert rule & cooldown' },
    { method: 'GET', path: '/api/alerts', tag: 'Alerts', desc: 'List all alert rules and active listeners' },
    { method: 'GET', path: '/api/alerts/logs', tag: 'Alerts', desc: 'Fetch historical alert dispatch logs' },
    { method: 'POST', path: '/api/alerts/test', tag: 'Alerts', desc: 'Send test notification to webhook/email' },

    // 7. Analytics (4 routes)
    { method: 'GET', path: '/api/analytics/uptime', tag: 'Analytics', desc: '24h and 7d uptime percentage calculations' },
    { method: 'GET', path: '/api/analytics/latency', tag: 'Analytics', desc: 'Average latency, p50, p90, p99 percentiles' },
    { method: 'GET', path: '/api/analytics/failures', tag: 'Analytics', desc: 'Categorized failure distribution metrics' },
    { method: 'GET', path: '/api/analytics/summary', tag: 'Analytics', desc: 'Executive reliability dashboard summary' },

    // 8. BullMQ Job Queue (2 routes)
    { method: 'GET', path: '/api/queue/metrics', tag: 'Queue', desc: 'Real-time BullMQ queue depth & worker stats' },
    { method: 'POST', path: '/api/queue/clear-completed', tag: 'Queue', desc: 'Flush completed job cache from memory' },

    // 9. Built-in Target APIs (12 routes)
    { method: 'GET', path: '/api/mock/users', tag: 'Mock Targets', desc: 'Query users list (User Microservice)' },
    { method: 'POST', path: '/api/mock/users', tag: 'Mock Targets', desc: 'Create new user record (POST test)' },
    { method: 'PUT', path: '/api/mock/users/:id', tag: 'Mock Targets', desc: 'Update user attributes (PUT test)' },
    { method: 'DELETE', path: '/api/mock/users/:id', tag: 'Mock Targets', desc: 'Remove user record (DELETE test)' },
    { method: 'GET', path: '/api/mock/orders', tag: 'Mock Targets', desc: 'Order service (flaky 20% retry simulation)' },
    { method: 'POST', path: '/api/mock/orders', tag: 'Mock Targets', desc: 'Create new order transaction' },
    { method: 'DELETE', path: '/api/mock/orders/:id', tag: 'Mock Targets', desc: 'Cancel order and reverse state' },
    { method: 'GET', path: '/api/mock/payment-info', tag: 'Mock Targets', desc: 'Payment Gateway (Schema drift demo)' },
    { method: 'POST', path: '/api/mock/payments', tag: 'Mock Targets', desc: 'Process payment authorization' },
    { method: 'POST', path: '/api/mock/payments/:id/refund', tag: 'Mock Targets', desc: 'Issue payment refund' },
    { method: 'GET', path: '/api/mock/products', tag: 'Mock Targets', desc: 'Products catalog inventory' },
    { method: 'POST', path: '/api/mock/products', tag: 'Mock Targets', desc: 'Add new product item' },
    { method: 'PUT', path: '/api/mock/products/:id', tag: 'Mock Targets', desc: 'Update product pricing and stock' },
    { method: 'DELETE', path: '/api/mock/products/:id', tag: 'Mock Targets', desc: 'Delete product catalog item' },
    { method: 'GET', path: '/api/mock/slow-inventory', tag: 'Mock Targets', desc: 'High latency target (1800ms delay)' },
    { method: 'GET', path: '/api/mock/telemetry', tag: 'Mock Targets', desc: 'Node server memory & uptime telemetry' },
    { method: 'POST', path: '/api/mock/toggle-drift', tag: 'Mock Targets', desc: 'Toggle schema drift response on/off' },

    // 10. API Docs (1 route)
    { method: 'GET', path: '/api/docs', tag: 'Docs', desc: 'Live OpenAPI 3.0 specification summary' }
  ];

  const tagColors = {
    Auth: { bg: 'var(--bg-subtle)', color: 'var(--text-muted)' },
    Websites: { bg: '#E0F2FE', color: '#0369A1' },
    Endpoints: { bg: 'var(--primary-light)', color: 'var(--primary)' },
    Monitoring: { bg: 'var(--success-bg)', color: 'var(--success-text)' },
    Contracts: { bg: 'var(--purple-bg)', color: 'var(--purple-text)' },
    Alerts: { bg: 'var(--danger-bg)', color: 'var(--danger-text)' },
    Analytics: { bg: 'var(--warning-bg)', color: 'var(--warning-text)' },
    Queue: { bg: '#EFF6FF', color: '#1D4ED8' },
    'Mock Targets': { bg: '#FEF3C7', color: '#B45309' },
    Docs: { bg: '#F1F5F9', color: '#475569' }
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
