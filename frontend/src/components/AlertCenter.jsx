import React, { useState } from 'react';
import { Bell, Send, CheckCircle2, AlertTriangle, Mail, Webhook } from 'lucide-react';

export default function AlertCenter({ alertConfigs, alertLogs, onSaveAlertConfig, onTestAlert }) {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [testStatus, setTestStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: 'Slack & Email Alert Rule',
    webhookUrl: 'https://hooks.slack.com/services/demo/api-sentinel/alerts',
    emailRecipient: 'devops@sentinel-monitoring.io',
    latencyThresholdMs: 1000,
    cooldownMinutes: 5,
    triggerOnStatusMismatch: true,
    triggerOnDrift: true,
    triggerOnTimeout: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const triggerOn = [];
    if (formData.triggerOnStatusMismatch) triggerOn.push('STATUS_MISMATCH');
    if (formData.triggerOnDrift) triggerOn.push('CONTRACT_DRIFT');
    if (formData.triggerOnTimeout) triggerOn.push('TIMEOUT');

    onSaveAlertConfig({
      name: formData.name,
      webhookUrl: formData.webhookUrl,
      emailRecipient: formData.emailRecipient,
      latencyThresholdMs: Number(formData.latencyThresholdMs),
      cooldownMinutes: Number(formData.cooldownMinutes || 5),
      triggerOn,
      enabled: true
    });

    setShowConfigModal(false);
    alert('Alert rule configured successfully!');
  };

  const handleTestDispatch = async () => {
    setTestStatus('Dispatching test notification...');
    const result = await onTestAlert({
      webhookUrl: formData.webhookUrl,
      emailRecipient: formData.emailRecipient,
      alertType: 'Manual Test Alert from API Sentinel Dashboard'
    });
    setTestStatus('Notification dispatched to Webhook & Email adapters successfully!');
    setTimeout(() => setTestStatus(null), 4000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Alert Notification Adapters</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Configure Webhook and Email alerting triggers for status failures, high latency, and contract drift.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={handleTestDispatch}>
            <Send size={14} /> Send Test Alert
          </button>
          <button className="btn btn-primary" onClick={() => setShowConfigModal(true)}>
            <Bell size={14} /> Add Alert Rule
          </button>
        </div>
      </div>

      {testStatus && (
        <div className="card" style={{ marginBottom: '1.5rem', background: 'var(--success-bg)', borderColor: 'var(--success-border)', color: 'var(--success-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {testStatus}
        </div>
      )}

      {/* Active Rules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {alertConfigs.map(alert => (
          <div key={alert.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{alert.name}</h3>
                <span className="badge badge-success" style={{ marginTop: '0.35rem' }}>Active Listener</span>
              </div>
              <div style={{ padding: '0.5rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-md)' }}>
                <Webhook size={20} />
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Webhook size={14} color="var(--text-muted)" />
                <span style={{ color: 'var(--text-muted)' }}>Webhook:</span>
                <span className="font-mono" style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>{alert.webhookUrl || 'Not configured'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} color="var(--text-muted)" />
                <span style={{ color: 'var(--text-muted)' }}>Email:</span>
                <span className="font-mono" style={{ fontSize: '0.75rem' }}>{alert.emailRecipient || 'Not configured'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {alert.triggerOn?.map(t => (
                <span key={t} className="badge badge-subtle">{t}</span>
              ))}
              <span className="badge badge-warning">&gt;{alert.latencyThresholdMs || 1000}ms</span>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Execution History Stream */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Bell size={18} color="var(--primary)" />
            Recent Dispatched Alert Events
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Endpoint Name</th>
                <th>Alert Rule</th>
                <th>Trigger Reason</th>
                <th>Channel Status</th>
              </tr>
            </thead>
            <tbody>
              {alertLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    No alerts triggered yet. Notifications will stream here automatically on threshold violations.
                  </td>
                </tr>
              ) : (
                alertLogs.map(log => (
                  <tr key={log.id}>
                    <td className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td><strong>{log.endpointName}</strong></td>
                    <td>{log.alertName}</td>
                    <td style={{ color: 'var(--danger-text)', fontWeight: 600 }}>{log.triggerReason}</td>
                    <td><span className="badge badge-success">Dispatched</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Modal */}
      {showConfigModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Configure Alert Channel Rule
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Rule Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Webhook URL Adapter (Slack / PagerDuty / Custom)</label>
                <input
                  type="url"
                  className="form-input font-mono"
                  value={formData.webhookUrl}
                  onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Notification Recipient</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.emailRecipient}
                  onChange={(e) => setFormData({ ...formData, emailRecipient: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Latency Threshold (ms)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.latencyThresholdMs}
                    onChange={(e) => setFormData({ ...formData, latencyThresholdMs: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Cooldown Window (mins) — Suppress Noisy Alerts</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.cooldownMinutes}
                    onChange={(e) => setFormData({ ...formData, cooldownMinutes: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.triggerOnStatusMismatch}
                    onChange={(e) => setFormData({ ...formData, triggerOnStatusMismatch: e.target.checked })}
                  />
                  Trigger on HTTP Status Mismatch / 5xx Error
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.triggerOnDrift}
                    onChange={(e) => setFormData({ ...formData, triggerOnDrift: e.target.checked })}
                  />
                  Trigger on Contract & JSON Schema Drift
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.triggerOnTimeout}
                    onChange={(e) => setFormData({ ...formData, triggerOnTimeout: e.target.checked })}
                  />
                  Trigger on Request Timeout / Unreachability
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowConfigModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Alert Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
