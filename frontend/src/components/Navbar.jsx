import React, { useState } from 'react';
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
  Search,
  Terminal,
  Settings,
  HelpCircle,
  Bell,
  Layers,
  ChevronDown,
  Play,
  Download,
  Plus,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, globalStatus, onRefreshAll, theme, onToggleTheme }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      
      {/* ================= 1. AZURE PORTAL GLOBAL SHELL HEADER ================= */}
      <div style={{
        background: '#0078D4', // Signature Azure Blue Header
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        height: '42px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        fontSize: '0.82rem'
      }}>
        {/* Left: Azure Portal Identity & Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            onClick={() => setActiveTab('landing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '0.98rem'
            }}
          >
            {/* API Sentinel Logo Mark */}
            <div style={{
              width: 26,
              height: 26,
              borderRadius: '6px',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0078D4',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)'
            }}>
              <ShieldAlert size={17} />
            </div>
            <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.98rem', letterSpacing: '-0.01em' }}>API Sentinel</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.75rem',
            marginLeft: '0.5rem'
          }}>
            <span>Reliability Cloud</span>
            <span>&gt;</span>
            <span>Observability Cluster (Production)</span>
          </div>
        </div>

        {/* Center: Azure Search Input */}
        <div style={{
          position: 'relative',
          width: '380px',
          maxWidth: '40%'
        }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.7)' }} />
          <input
            type="text"
            placeholder="Search resources, services, and docs (G+/)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.3rem 0.75rem 0.3rem 2rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Right: Theme Toggle, Cloud Shell, Notifications, Settings, User Tenant */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          
          {/* Light / Dark White Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Clean White Theme' : 'Switch to Dark Theme'}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              borderRadius: '4px',
              padding: '0.25rem 0.55rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.72rem',
              fontWeight: 700
            }}
          >
            {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            <span>{theme === 'dark' ? 'White Theme' : 'Dark Mode'}</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            title="Cloud Shell (37+ Routes Console)"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Terminal size={15} />
          </button>

          <button
            onClick={onRefreshAll}
            title="Sync Telemetry"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RefreshCw size={14} />
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            title="Alert Notifications"
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <Bell size={15} />
            <span style={{
              position: 'absolute',
              top: -2,
              right: -3,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#FFFFFF'
            }} />
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            paddingLeft: '0.5rem',
            borderLeft: '1px solid rgba(255, 255, 255, 0.25)',
            fontSize: '0.78rem',
            color: '#FFFFFF'
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#FFFFFF',
              color: '#0078D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.72rem'
            }}>
              SG
            </div>
            <span>Sentinel Workspace</span>
          </div>

        </div>
      </div>

      {/* ================= 2. AZURE SERVICE BLADES & COMMAND BAR ================= */}
      <div style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.3rem 1.25rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Azure Service Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', overflowX: 'auto' }}>
          
          <button
            className={`nav-btn ${activeTab === 'landing' ? 'active' : ''}`}
            onClick={() => setActiveTab('landing')}
          >
            <Sparkles size={14} />
            Overview
          </button>

          <button
            className={`nav-btn ${activeTab === 'lucidflow' ? 'active' : ''}`}
            onClick={() => setActiveTab('lucidflow')}
            style={{
              color: activeTab === 'lucidflow' ? 'var(--primary)' : 'var(--text-main)',
              fontWeight: 700
            }}
          >
            <Layers size={14} />
            Lucid Flow Studio
          </button>

          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={14} />
            Live Metrics
          </button>

          <button
            className={`nav-btn ${activeTab === 'websites' ? 'active' : ''}`}
            onClick={() => setActiveTab('websites')}
          >
            <Globe size={14} />
            Resources (Websites)
          </button>

          <button
            className={`nav-btn ${activeTab === 'endpoints' ? 'active' : ''}`}
            onClick={() => setActiveTab('endpoints')}
          >
            <Radio size={14} />
            API Inventory
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
            Activity Log
          </button>

          <button
            className={`nav-btn ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            <BellRing size={14} />
            Alerts & Rules
          </button>

          <button
            className={`nav-btn ${activeTab === 'queue' ? 'active' : ''}`}
            onClick={() => setActiveTab('queue')}
          >
            <Server size={14} />
            BullMQ Queue & 37+ Docs
          </button>
        </div>

        {/* Right Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div className={`pulse-badge badge-${globalStatus === 'OPERATIONAL' ? 'success' : 'warning'}`}>
            <span
              className="pulse-dot"
              style={{
                backgroundColor: globalStatus === 'OPERATIONAL' ? 'var(--success)' : 'var(--warning)'
              }}
            />
            {globalStatus === 'OPERATIONAL' ? 'Succeeded (100% SLA)' : 'Degraded Incident'}
          </div>
        </div>

      </div>

    </div>
  );
}
