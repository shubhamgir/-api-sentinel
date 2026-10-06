import React from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileSearch,
  Zap,
  Radio
} from 'lucide-react';

export default function DashboardOverview({ uptimeData, latencyData, failureData, endpoints, onSelectTab }) {
  const overallUptime = uptimeData?.overallUptimePct ?? 100;
  const avgLatency = latencyData?.avgLatencyMs ?? 0;
  const totalEndpoints = endpoints?.length ?? 0;
  const activeEndpoints = endpoints?.filter(e => e.active)?.length ?? 0;
  
  // Count endpoints with schema drift detected on last check
  const driftCount = endpoints?.filter(e => e.hasDrift)?.length ?? 0;
  const downCount = endpoints?.filter(e => e.lastStatus === 'DOWN')?.length ?? 0;

  const trendPoints = latencyData?.trend || [];
  const maxTrendLatency = Math.max(...trendPoints.map(p => p.latencyMs || 0), 100);

  return (
    <div>
      {/* Metrics Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h4>System Uptime</h4>
            <div className="stat-value">
              {overallUptime}%
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', color: 'var(--success)' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h4>Average Latency</h4>
            <div className="stat-value">
              {avgLatency} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>ms</span>
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
            <Clock size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h4>Active Endpoints</h4>
            <div className="stat-value">
              {activeEndpoints} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ {totalEndpoints}</span>
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
            <Radio size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h4>Schema Drift Alerts</h4>
            <div className="stat-value" style={{ color: driftCount > 0 ? 'var(--purple-text)' : 'var(--text-main)' }}>
              {driftCount}
            </div>
          </div>
          <div className="stat-icon" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', color: driftCount > 0 ? 'var(--purple)' : 'var(--text-muted)' }}>
            <FileSearch size={22} />
          </div>
        </div>
      </div>

      {/* Main Charts & Overview Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Latency Time Series Visualizer */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Activity size={18} color="var(--primary)" />
              Real-time Latency Monitor (ms)
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              p50: <strong>{latencyData?.p50 || 0}ms</strong> | p90: <strong>{latencyData?.p90 || 0}ms</strong> | p99: <strong>{latencyData?.p99 || 0}ms</strong>
            </div>
          </div>

          {trendPoints.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Zap size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
              <div>Waiting for monitoring checks to execute...</div>
            </div>
          ) : (
            <div>
              <div className="chart-bar-container">
                {trendPoints.slice(-25).map((pt, i) => {
                  const heightPct = Math.min(100, Math.max(8, (pt.latencyMs / maxTrendLatency) * 100));
                  let barColor = 'var(--primary)';
                  if (!pt.success) barColor = 'var(--danger)';
                  else if (pt.latencyMs > 1000) barColor = 'var(--warning)';

                  return (
                    <div key={i} className="chart-bar-column" title={`${pt.endpointName}: ${pt.latencyMs}ms at ${pt.timeLabel}`}>
                      <div
                        className="chart-bar"
                        style={{ height: `${heightPct}%`, backgroundColor: barColor }}
                      />
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>{trendPoints[0]?.timeLabel || 'Earlier'}</span>
                <span>Live Time-Series Data Points</span>
                <span>{trendPoints[trendPoints.length - 1]?.timeLabel || 'Latest'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Health Breakdown & Drift Summary Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <AlertTriangle size={18} color="var(--warning)" />
              Reliability Status
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--success-bg)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontWeight: 600, color: 'var(--success-text)', fontSize: '0.9rem' }}>Healthy Endpoints</span>
              <span className="badge badge-success">{totalEndpoints - downCount - driftCount}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--purple-bg)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontWeight: 600, color: 'var(--purple-text)', fontSize: '0.9rem' }}>Contract Drift Detected</span>
              <span className="badge badge-purple">{driftCount}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--danger-bg)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontWeight: 600, color: 'var(--danger-text)', fontSize: '0.9rem' }}>Down / Unreachable</span>
              <span className="badge badge-danger">{downCount}</span>
            </div>

            <button
              className="btn btn-primary"
              style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
              onClick={() => onSelectTab('contracts')}
            >
              Inspect Contract Drifts
            </button>
          </div>
        </div>

      </div>

      {/* Endpoints Snapshot Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Radio size={18} color="var(--primary)" />
            Monitored Endpoint Health Overview
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => onSelectTab('endpoints')}>
            Manage Endpoints &rarr;
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Endpoint Name</th>
                <th>Method & URL</th>
                <th>Check Frequency</th>
                <th>Latest Latency</th>
                <th>Schema State</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map(ep => (
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
                  <td><strong>{ep.name}</strong></td>
                  <td>
                    <span className="badge badge-subtle font-mono" style={{ marginRight: '0.5rem' }}>{ep.method}</span>
                    <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ep.url}</span>
                  </td>
                  <td>Every {ep.intervalSeconds}s</td>
                  <td>
                    <span className="font-mono">
                      {ep.lastLatencyMs ? `${ep.lastLatencyMs} ms` : 'N/A'}
                    </span>
                  </td>
                  <td>
                    {ep.hasDrift ? (
                      <span className="badge badge-purple">Schema Drifted</span>
                    ) : (
                      <span className="badge badge-success">Contract Valid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
