import React from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  Radio,
  FileCode2,
  History,
  BellRing,
  FlaskConical,
  RefreshCw
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, globalStatus, onRefreshAll }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <ShieldAlert size={22} />
        </div>
        <div>
          <span>API Sentinel</span>
          <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            RELIABILITY & DRIFT PLATFORM
          </div>
        </div>
      </div>

      <nav className="nav-links">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={16} />
          Overview
        </button>
        <button
          className={`nav-btn ${activeTab === 'endpoints' ? 'active' : ''}`}
          onClick={() => setActiveTab('endpoints')}
        >
          <Radio size={16} />
          Endpoints
        </button>
        <button
          className={`nav-btn ${activeTab === 'contracts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contracts')}
        >
          <FileCode2 size={16} />
          Contract Drift
        </button>
        <button
          className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <History size={16} />
          Logs
        </button>
        <button
          className={`nav-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <BellRing size={16} />
          Alerts
        </button>
        <button
          className={`nav-btn ${activeTab === 'mock' ? 'active' : ''}`}
          onClick={() => setActiveTab('mock')}
        >
          <FlaskConical size={16} />
          Mock Suite
        </button>
      </nav>

      <div className="header-status">
        <button
          className="btn btn-outline btn-sm"
          onClick={onRefreshAll}
          title="Refresh metrics & sync"
        >
          <RefreshCw size={14} />
          Sync
        </button>

        <div className={`pulse-badge badge-${globalStatus === 'OPERATIONAL' ? 'success' : 'warning'}`}>
          <span
            className="pulse-dot"
            style={{
              backgroundColor: globalStatus === 'OPERATIONAL' ? 'var(--success)' : 'var(--warning)'
            }}
          />
          {globalStatus || 'OPERATIONAL'}
        </div>
      </div>
    </header>
  );
}
