import React from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  Radio,
  FileCode2,
  History,
  BellRing,
  FlaskConical,
  RefreshCw,
  Server,
  Globe,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, globalStatus, onRefreshAll }) {
  return (
    <header className="navbar">
      {/* Brand & Tagline */}
      <div className="brand" onClick={() => setActiveTab('landing')} style={{ cursor: 'pointer' }}>
        <div className="brand-icon">
          <ShieldAlert size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span>API Sentinel</span>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(14, 165, 233, 0.15)',
              color: '#38BDF8',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              letterSpacing: '0.04em'
            }}>
              ENTERPRISE SaaS
            </span>
          </div>
          <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
            Detect. Validate. Alert. Improve API Reliability.
          </div>
        </div>
      </div>

      {/* Enterprise Nav Links */}
      <nav className="nav-links">
        <button
          className={`nav-btn ${activeTab === 'landing' ? 'active' : ''}`}
          onClick={() => setActiveTab('landing')}
        >
          <Sparkles size={14} />
          Product
        </button>
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={14} />
          Monitoring
        </button>
        <button
          className={`nav-btn ${activeTab === 'websites' ? 'active' : ''}`}
          onClick={() => setActiveTab('websites')}
        >
          <Globe size={14} />
          Websites & Routes
        </button>
        <button
          className={`nav-btn ${activeTab === 'contracts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contracts')}
        >
          <FileCode2 size={14} />
          Contract Validation
        </button>
        <button
          className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <History size={14} />
          Audit Logs
        </button>
        <button
          className={`nav-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <BellRing size={14} />
          Alerts
        </button>
        <button
          className={`nav-btn ${activeTab === 'queue' ? 'active' : ''}`}
          onClick={() => setActiveTab('queue')}
        >
          <Server size={14} />
          Docs (37+ Routes)
        </button>
      </nav>

      {/* Right Side CTAs & Status */}
      <div className="header-status">
        <button
          className="btn btn-outline btn-sm"
          onClick={onRefreshAll}
          title="Sync Telemetry"
        >
          <RefreshCw size={13} />
          Sync
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => setActiveTab('websites')}
          style={{ padding: '0.4rem 0.85rem' }}
        >
          Get Started
        </button>

        <div className={`pulse-badge badge-${globalStatus === 'OPERATIONAL' ? 'success' : 'warning'}`}>
          <span
            className="pulse-dot"
            style={{
              backgroundColor: globalStatus === 'OPERATIONAL' ? '#10B981' : '#F59E0B'
            }}
          />
          {globalStatus === 'OPERATIONAL' ? 'OPERATIONAL' : 'DEGRADED'}
        </div>
      </div>
    </header>
  );
}
