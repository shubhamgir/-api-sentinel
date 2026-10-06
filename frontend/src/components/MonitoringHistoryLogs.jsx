import React, { useState } from 'react';
import { History, Search, Eye, RefreshCw } from 'lucide-react';

export default function MonitoringHistoryLogs({ logs, onRefreshLogs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = logs.filter(log => {
    const term = searchTerm.toLowerCase();
    return (
      (log.endpointName || '').toLowerCase().includes(term) ||
      (log.url || '').toLowerCase().includes(term) ||
      (log.errorMessage || '').toLowerCase().includes(term) ||
      String(log.status).includes(term)
    );
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Monitoring History & Time-Series Logs</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Full history of automated background health checks, retries, latency measurements, and errors.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.2rem' }}
              placeholder="Search by endpoint, status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="btn btn-outline" onClick={onRefreshLogs}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Endpoint Name</th>
              <th>Status</th>
              <th>Latency (ms)</th>
              <th>Retries</th>
              <th>Contract Validation</th>
              <th>Error Details</th>
              <th>Payload</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No monitoring logs recorded yet. Automated background checks will populate this table automatically.
                </td>
              </tr>
            ) : (
              filteredLogs.map(log => {
                const hasDrift = log.contractValidation?.hasDrift;
                return (
                  <tr key={log.id}>
                    <td className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td><strong>{log.endpointName}</strong></td>
                    <td>
                      {log.success ? (
                        <span className="badge badge-success">{log.status || 200} OK</span>
                      ) : (
                        <span className="badge badge-danger">{log.status || 'FAIL'}</span>
                      )}
                    </td>
                    <td>
                      <span className="font-mono" style={{ color: log.latencyMs > 1000 ? 'var(--warning-text)' : 'inherit' }}>
                        {log.latencyMs} ms
                      </span>
                    </td>
                    <td>
                      {log.wasRetried ? (
                        <span className="badge badge-warning">{log.retryAttempts} Retry</span>
                      ) : (
                        <span className="badge badge-subtle">0</span>
                      )}
                    </td>
                    <td>
                      {hasDrift ? (
                        <span className="badge badge-purple">Drift Detected</span>
                      ) : (
                        <span className="badge badge-success">Valid Schema</span>
                      )}
                    </td>
                    <td style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {log.errorMessage || (hasDrift ? log.contractValidation.driftSummary : 'None')}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedLog(log)}
                        title="View Raw Response Payload"
                      >
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Payload Modal */}
      {selectedLog && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Execution Log Details — {selectedLog.endpointName}
            </h3>
            <p className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Checked at: {new Date(selectedLog.timestamp).toLocaleString()} | Latency: {selectedLog.latencyMs}ms | Retries: {selectedLog.retryAttempts}
            </p>

            <div className="code-box" style={{ maxHeight: '350px' }}>
              <pre>
                {selectedLog.responseData
                  ? JSON.stringify(selectedLog.responseData, null, 2)
                  : selectedLog.errorMessage || 'No response body'}
              </pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button className="btn btn-outline" onClick={() => setSelectedLog(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
