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
      
      {/* ================= 1. CORPORATE OBSIDIAN HEADER ================= */}
      <div style={{
        background: 'var(--bg-main)',
        color: 'var(--text-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        height: '46px',
        borderBottom: '1px solid var(--border-color)',
        fontSize: '0.82rem'
      }}>
        {/* Left: Platform Identity & Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            onClick={() => setActiveTab('landing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '1rem'
            }}
          >
            {/* API Sentinel Logo Mark */}
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '7px',
              background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.35)'
            }}>
              <ShieldAlert size={16} />
            </div>
            <span style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>
              API Sentinel
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--text-dim)',
            fontSize: '0.75rem',
            marginLeft: '0.25rem'
          }}>
            <span>Reliability Cloud</span>
            <span style={{ opacity: 0.6 }}>/</span>
            <span style={{ color: 'var(--text-muted)' }}>Cluster (Production)</span>
          </div>
        </div>

        {/* Center: Search Input */}
        <div style={{
          position: 'relative',
          width: '380px',
          maxWidth: '40%'
        }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search endpoints, contracts, docs (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.35rem 0.75rem 0.35rem 2rem',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              fontSize: '0.78rem',
              outline: 'none',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>

        {/* Right: Theme Toggle, Notifications, Tenant */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.28rem 0.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.72rem',
              fontWeight: 700
            }}
          >
            {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            <span>{theme === 'dark' ? 'Light Theme' : 'Dark Mode'}</span>
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
