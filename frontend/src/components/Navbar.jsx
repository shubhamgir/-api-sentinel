import React from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  Radio,
  FileCode2,
  History,
  BellRing,
  FlaskConical,
  RefreshCw,
  Server,
  Globe,
  Building2
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, globalStatus, onRefreshAll }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <ShieldCheck size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>API Sentinel</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px', background: '#EFF6FF', color: '#0F52BA', border: '1px solid #BFDBFE' }}>
              ENTERPRISE
            </span>
          </div>
          <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748B', letterSpacing: '0.04em' }}>
            IT INFRASTRUCTURE & SLA MONITOR
          </div>
        </div>
      </div>

      <nav className="nav-links">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={15} />
          Executive Overview
        </button>
        <button
          className={`nav-btn ${activeTab === 'websites' ? 'active' : ''}`}
          onClick={() => setActiveTab('websites')}
        >
          <Globe size={15} />
          Systems & Projects
        </button>
        <button
          className={`nav-btn ${activeTab === 'endpoints' ? 'active' : ''}`}
          onClick={() => setActiveTab('endpoints')}
        >
          <Radio size={15} />
          API Inventory
        </button>
        <button
          className={`nav-btn ${activeTab === 'contracts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contracts')}
        >
          <FileCode2 size={15} />
          Schema & Contracts
        </button>
        <button
          className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <History size={15} />
          Audit Logs
        </button>
        <button
          className={`nav-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <BellRing size={15} />
          SLA Incident Rules
        </button>
        <button
          className={`nav-btn ${activeTab === 'mock' ? 'active' : ''}`}
          onClick={() => setActiveTab('mock')}
        >
          <FlaskConical size={15} />
          Sandbox Targets
        </button>
        <button
          className={`nav-btn ${activeTab === 'queue' ? 'active' : ''}`}
          onClick={() => setActiveTab('queue')}
        >
          <Server size={15} />
          Queue & Docs (37+)
        </button>
      </nav>

      <div className="header-status">
        <button
          className="btn btn-outline btn-sm"
          onClick={onRefreshAll}
          title="Refresh metrics & sync"
        >
          <RefreshCw size={13} />
          Sync Telemetry
        </button>

        <div className={`pulse-badge badge-${globalStatus === 'OPERATIONAL' ? 'success' : 'warning'}`}>
          <span
            className="pulse-dot"
            style={{
              backgroundColor: globalStatus === 'OPERATIONAL' ? '#059669' : '#D97706'
            }}
          />
          {globalStatus === 'OPERATIONAL' ? '99.9% UPTIME SLA' : 'SLA INCIDENT'}
        </div>
      </div>
    </header>
  );
}
