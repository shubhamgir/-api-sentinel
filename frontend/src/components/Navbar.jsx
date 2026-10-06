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
  Cloud,
  Play,
  Download,
  Plus
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, globalStatus, onRefreshAll }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      
      {/* ================= 1. AZURE PORTAL GLOBAL SHELL HEADER ================= */}
      <div style={{
        background: '#00183F', // Classic Microsoft Azure Portal Navy
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        height: '42px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '0.82rem'
      }}>
        {/* Left: Azure Portal Identity & Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            onClick={() => setActiveTab('landing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '0.95rem'
            }}
          >
            {/* Azure / Sentinel Cloud Mark */}
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '4px',
              background: '#0078D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Cloud size={15} />
            </div>
            <span>Microsoft Azure</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontWeight: 300 }}>|</span>
            <span style={{ color: '#38BDF8', fontWeight: 700 }}>API Sentinel</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: '0.75rem',
            marginLeft: '0.5rem'
          }}>
            <span>Portal</span>
            <span>&gt;</span>
            <span>Production SLA Cluster (East US)</span>
          </div>
        </div>

        {/* Center: Azure Search Input */}
        <div style={{
          position: 'relative',
          width: '380px',
          maxWidth: '40%'
        }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.5)' }} />
          <input
            type="text"
            placeholder="Search resources, services, and docs (G+/)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.3rem 0.75rem 0.3rem 2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '4px',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Right: Cloud Shell, Notifications, Settings, User Tenant */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          
          <button
            onClick={() => setActiveTab('queue')}
            title="Cloud Shell (37+ Routes Console)"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.8)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem'
            }}
          >
            <Terminal size={15} />
            <span style={{ display: 'none' }}>Shell</span>
          </button>

          <button
            onClick={onRefreshAll}
            title="Sync Azure Telemetry"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.8)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
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
              color: 'rgba(255, 255, 255, 0.8)',
              cursor: 'pointer'
            }}
          >
            <Bell size={15} />
            <span style={{
              position: 'absolute',
              top: -3,
              right: -4,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#0078D4'
            }} />
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            paddingLeft: '0.5rem',
            borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#0078D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.72rem'
            }}>
              SG
            </div>
            <span>Contoso Enterprise</span>
          </div>

        </div>
      </div>

      {/* ================= 2. AZURE COMMAND BAR & BLADE NAVIGATION ================= */}
      <div style={{
        background: '#070B14',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.35rem 1.25rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Azure Service Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflowX: 'auto' }}>
          
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
              color: activeTab === 'lucidflow' ? '#FFFFFF' : '#38BDF8',
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
                backgroundColor: globalStatus === 'OPERATIONAL' ? '#10B981' : '#F59E0B'
              }}
            />
            {globalStatus === 'OPERATIONAL' ? 'Succeeded (100% SLA)' : 'Degraded Incident'}
          </div>
        </div>

      </div>

    </div>
  );
}
