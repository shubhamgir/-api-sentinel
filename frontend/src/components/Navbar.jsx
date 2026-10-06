import React, { useState } from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  Radio,
  FileCode2,
  History,
  BellRing,
  RefreshCw,
  Server,
  Globe,
  Sparkles,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, globalStatus, onRefreshAll, theme, onToggleTheme }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefreshAll) {
      try {
        await onRefreshAll();
      } catch (e) {
        console.error(e);
      }
    }
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const navItems = [
    { id: 'landing', label: 'Overview', icon: Sparkles },
    { id: 'lucidflow', label: 'Lucid Flow', icon: Layers },
    { id: 'dashboard', label: 'Metrics', icon: LayoutDashboard },
    { id: 'websites', label: 'Websites', icon: Globe },
    { id: 'endpoints', label: 'Endpoints', icon: Radio },
    { id: 'contracts', label: 'Contracts', icon: FileCode2 },
    { id: 'history', label: 'Audit Logs', icon: History },
    { id: 'alerts', label: 'Alerts', icon: BellRing },
    { id: 'queue', label: 'BullMQ & 37+ Docs', icon: Server }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.25rem',
      fontSize: '0.82rem'
    }}>
      {/* Left: Brand & Environment */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
        <div
          onClick={() => setActiveTab('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: 24,
            height: 24,
            borderRadius: '4px',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000000',
            fontWeight: 900
          }}>
            <ShieldAlert size={14} />
          </div>
          <span style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '0.92rem', letterSpacing: '-0.02em' }}>
            API Sentinel
          </span>
        </div>

        <span className="badge badge-subtle font-mono" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
          PROD
        </span>
      </div>

      {/* Center: Clean Functional Navigation Tabs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.2rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        margin: '0 1rem'
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem 0.65rem',
                color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={13} style={{ opacity: isActive ? 1 : 0.7 }} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right: Telemetry Sync + SLA Status + Theme Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
        {/* SLA Status Pill */}
        <div className={`pulse-badge badge-${globalStatus === 'OPERATIONAL' ? 'success' : 'warning'}`} style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
          <span
            className="pulse-dot"
            style={{
              backgroundColor: globalStatus === 'OPERATIONAL' ? 'var(--success)' : 'var(--warning)'
            }}
          />
          <span>{globalStatus === 'OPERATIONAL' ? '100% SLA' : 'Degraded'}</span>
        </div>

        {/* Sync Telemetry */}
        <button
          onClick={handleRefresh}
          title="Sync Telemetry"
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 0.6s linear infinite' : 'none' }} />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
        </button>
      </div>
    </header>
  );
}
