import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  ArrowRight,
  Database,
  Layers,
  FileCheck2,
  Bell,
  Cpu,
  RefreshCw,
  GitBranch,
  Server,
  Lock,
  ChevronRight,
  ExternalLink,
  Sliders,
  Filter
} from 'lucide-react';

export default function EnterpriseLanding({ endpoints, uptimeData, latencyData, onNavigateDashboard }) {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    { title: 'Register', icon: '01', desc: 'Define API URL, HTTP method, authentication headers & payload body' },
    { title: 'Schedule', icon: '02', desc: 'BullMQ-powered worker triggers asynchronous cron-interval execution' },
    { title: 'Check', icon: '03', desc: 'Dispatches HTTP request measuring response latency and status codes' },
    { title: 'Validate', icon: '04', desc: 'AJV parses observed JSON structure against registered OpenAPI/JSON Schema' },
    { title: 'Record', icon: '05', desc: 'Stores latency percentiles (p50, p90, p99) in time-series logs' },
    { title: 'Detect', icon: '06', desc: 'Flags silent downtime, response regressions, and schema field drift' },
    { title: 'Alert', icon: '07', desc: 'Fires webhook and email notifications with cooldown suppression' },
    { title: 'Analyze', icon: '08', desc: 'Inspect trends, SLAs, failure categorization, and reliability scores' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '3rem' }}>
      
      {/* ================= 1. HERO SECTION ================= */}
      <section style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
        gap: '3rem',
        alignItems: 'center',
        paddingTop: '1rem'
      }}>
        {/* Left Column: Headline & Value Prop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(14, 165, 233, 0.1)',
            border: '1px solid rgba(14, 165, 233, 0.3)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#38BDF8',
            width: 'fit-content'
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0EA5E9', boxShadow: '0 0 10px #0EA5E9' }} />
            API Observability & Contract Intelligence Platform
          </div>

          <h1 style={{
            fontSize: '2.85rem',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#FFFFFF'
          }}>
            Know When Your APIs Break — <span style={{
              background: 'linear-gradient(135deg, #38BDF8, #818CF8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Before Your Users Do.</span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            maxWidth: '560px'
          }}>
            API Sentinel continuously monitors API availability, latency, status codes, and response contracts to detect failures and schema drift before they become production incidents.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem', fontWeight: 700 }}
              onClick={() => onNavigateDashboard('websites')}
            >
              Get Started <ArrowRight size={16} />
            </button>
            <button
              className="btn btn-outline"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', fontWeight: 600 }}
              onClick={() => onNavigateDashboard('dashboard')}
            >
              View Live Dashboard
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-light)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={14} color="#10B981" /> No SDK installation required
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={14} color="#10B981" /> OpenAPI 3.0 & JSON Schema
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={14} color="#10B981" /> Docker & BullMQ workers
            </span>
          </div>
        </div>

        {/* Right Column: Realistic Live Observability Console */}
        <div style={{
          background: 'rgba(11, 17, 32, 0.95)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg), 0 0 30px rgba(14, 165, 233, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Mock Console Top Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: 'rgba(15, 23, 42, 0.9)',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                api-sentinel-cluster-01
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                <span className="pulse-dot" style={{ backgroundColor: '#10B981' }} /> ACTIVE ENGINE
              </span>
            </div>
          </div>

          {/* Console Body */}
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>UPTIME (24H)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34D399', marginTop: '0.2rem' }}>
                  {uptimeData?.overallUptimePct || '99.9'}%
                </div>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>AVG LATENCY</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38BDF8', marginTop: '0.2rem' }}>
                  {latencyData?.avgLatencyMs || '42'} ms
                </div>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>SCHEMA HEALTH</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#A78BFA', marginTop: '0.2rem' }}>
                  1 Drift
                </div>
              </div>
            </div>

            {/* Live Streaming Endpoint Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                LIVE ENDPOINT MONITORING STATUS
              </div>

              {/* Endpoint 1 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>200 OK</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>GET</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FFFFFF' }}>/api/mock/users</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: '#34D399' }}>Contract: Valid ✓</span>
                  <span style={{ color: 'var(--text-muted)' }}>8ms</span>
                </div>
              </div>

              {/* Endpoint 2 (Drifted) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                background: 'rgba(139, 92, 246, 0.08)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>200 OK</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#A78BFA', fontFamily: 'var(--font-mono)' }}>POST</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FFFFFF' }}>/api/mock/payment-info</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: '#F87171' }}>DRIFT DETECTED ⚠️</span>
                  <span style={{ color: 'var(--text-muted)' }}>14ms</span>
                </div>
              </div>

              {/* Endpoint 3 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>200 OK</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>POST</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FFFFFF' }}>https://leetcode.com/graphql</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: '#34D399' }}>Operational ✓</span>
                  <span style={{ color: 'var(--text-muted)' }}>371ms</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Alert Dispatch Item */}
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1rem' }}>🚨</span>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F87171' }}>
                    Incident: Contract Violation in Payment Info
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    Triggered Slack Webhook & Email • 3 unexpected properties detected
                  </div>
                </div>
              </div>
              <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>Cooldown Active</span>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. TRUST / METRICS SECTION ================= */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        padding: '1.5rem 2rem',
        background: 'rgba(15, 23, 42, 0.5)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#38BDF8' }}>99.9%</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            API Availability SLA
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#34D399' }}>24/7</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Continuous Monitoring
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#A78BFA' }}>&lt;200ms</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Average Response Tracking
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FBBF24' }}>Real-Time</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Failure & Drift Detection
          </div>
        </div>
      </section>

      {/* ================= 3. PROBLEM SECTION ================= */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            APIs Can Fail Without Looking Broken
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Standard ping tools only check if a port responds. Production microservices fail silently in complex, non-obvious ways.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Problem 1 */}
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F87171', marginBottom: '1rem' }}>
              <ShieldAlert size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Silent Downtime
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              API endpoints become unavailable or crash intermittently, and downstream customers discover the issue before your engineering team is notified.
            </p>
          </div>

          {/* Problem 2 */}
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FBBF24', marginBottom: '1rem' }}>
              <Clock size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Latency Degradation
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              An API can remain technically available while response times silently balloon from 50ms to 3,000ms, timing out mobile apps and frontends.
            </p>
          </div>

          {/* Problem 3 */}
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA', marginBottom: '1rem' }}>
              <GitBranch size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Contract Changes
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              An uncoordinated backend deployment changes response data shapes without updating the OpenAPI spec, breaking mobile and web clients without 5xx errors.
            </p>
          </div>

          {/* Problem 4 */}
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8', marginBottom: '1rem' }}>
              <Layers size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Schema Drift
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Crucial properties suddenly disappear or change types (string instead of integer, null violations) while the HTTP status remains 200 OK.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 4. CONTRACT VALIDATION SHOWCASE (DIFFERENTIATION) ================= */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(11, 17, 32, 0.95) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        boxShadow: '0 0 35px rgba(139, 92, 246, 0.1)'
      }}>
        <div style={{ maxWidth: '800px', marginBottom: '2rem' }}>
          <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
            CORE VALUE DIFFERENTIATION
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            An API Can Return 200 OK and Still Be Broken.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '0.5rem' }}>
            Traditional monitoring only confirms that an endpoint is responding. API Sentinel validates whether the response still strictly honors the registered OpenAPI and JSON Schema specification.
          </p>
        </div>

        {/* Side by side comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* Left: Expected */}
          <div style={{
            background: '#070B14',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)', letterSpacing: '0.06em' }}>
                EXPECTED SCHEMA CONTRACT
              </span>
              <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>OPENAPI SPEC</span>
            </div>
            <pre style={{ color: '#34D399', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>
              {`id:      number    ✓
name:    string    ✓
email:   string    ✓
role:    string    ✓`}
            </pre>
          </div>

          {/* Right: Actual Observed (with drift highlights) */}
          <div style={{
            background: '#070B14',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F87171', letterSpacing: '0.06em' }}>
                ACTUAL OBSERVED RESPONSE (HTTP 200)
              </span>
              <span className="badge badge-danger" style={{ fontSize: '0.68rem' }}>BREAKING CHANGE</span>
            </div>
            <pre style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>
              <span style={{ color: '#F87171' }}>id:      "usr-99"  ❌ TYPE_MISMATCH (Expected number)</span>{'\n'}
              <span style={{ color: '#34D399' }}>name:    "Alice"   ✓</span>{'\n'}
              <span style={{ color: '#F87171' }}>email:   undefined ❌ MISSING_REQUIRED_FIELD</span>{'\n'}
              <span style={{ color: '#FBBF24' }}>extraKey: true     ⚠️ UNEXPECTED_FIELD (Drift)</span>
            </pre>
          </div>
        </div>

        <div style={{
          padding: '0.85rem 1.25rem',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>⚡</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F87171' }}>
              Contract Violation & Drift Confirmed: Alert Dispatched to DevOps Slack & PagerDuty
            </span>
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => onNavigateDashboard('contracts')}
          >
            Inspect Contract Validator
          </button>
        </div>
      </section>

      {/* ================= 5. SOLUTION & WORKFLOW SECTION ================= */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            One Platform for API Reliability
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            The complete 8-step lifecycle: from automated queue scheduling to deep response validation and instant alerting.
          </p>
        </div>

        {/* 8-step visual workflow pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem'
        }}>
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveWorkflowStep(idx)}
              style={{
                padding: '1rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: activeWorkflowStep === idx ? 'rgba(14, 165, 233, 0.15)' : 'var(--bg-card)',
                border: activeWorkflowStep === idx ? '1px solid #0EA5E9' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: activeWorkflowStep === idx ? '#38BDF8' : 'var(--text-light)',
                fontFamily: 'var(--font-mono)'
              }}>
                STEP {step.icon}
              </div>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: 800,
                color: activeWorkflowStep === idx ? '#FFFFFF' : 'var(--text-main)',
                marginTop: '0.25rem'
              }}>
                {step.title}
              </div>
            </div>
          ))}
        </div>

        {/* Selected step detail banner */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'rgba(11, 17, 32, 0.7)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#0284C7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            color: '#FFFFFF',
            fontSize: '1rem',
            flexShrink: 0
          }}>
            {workflowSteps[activeWorkflowStep].icon}
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
              Phase {workflowSteps[activeWorkflowStep].icon} — {workflowSteps[activeWorkflowStep].title}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {workflowSteps[activeWorkflowStep].desc}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. CORE FEATURES GRID ================= */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Built for Modern Microservices & Distributed APIs
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Enterprise-grade monitoring primitives engineered to eliminate production blind spots.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              📡 API Availability Monitoring
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Continuously validates HTTP status codes, network reachability, TLS handshakes, and response health.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              ⏱️ Real-Time Latency Tracking
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Measures precise round-trip time in milliseconds and identifies slow or degrading services before timeouts occur.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              📑 OpenAPI & JSON Schema Validation
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Compares observed JSON responses against predefined contracts ensuring strict field types, required keys, and formatting.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              🔍 Schema Drift Detection
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Pinpoints unannounced property additions, dropped keys, and type mutations across continuous deployment cycles.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              🔄 Exponential Backoff Retries
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Handles transient network blips and 503s with exponential backoff retries to virtually eliminate false alarms.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              🔕 Noisy Alert Suppression
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Configurable cooldown windows prevent duplicate alert spam while preserving actionable incident logs.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              📈 Time-Series Analytics
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Maintains uptime history, failure distribution categories, and p50, p90, p99 latency percentiles.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              🚦 BullMQ Job Queue Processing
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Decoupled background worker queues ensure heavy check volume never blocks control-plane REST operations.
            </p>
          </div>

        </div>
      </section>

      {/* ================= 7. TECHNICAL ARCHITECTURE SECTION ================= */}
      <section style={{
        background: 'rgba(11, 17, 32, 0.85)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem'
      }}>
        <div style={{ maxWidth: '750px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Enterprise System Architecture
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Asynchronous event-driven pipeline designed for high throughput, duplicate suppression, and reliability.
          </p>
        </div>

        {/* Architecture flow diagram */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          padding: '2rem',
          background: '#070B14',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem'
        }}>
          <div style={{ padding: '0.65rem 1rem', background: '#0F172A', border: '1px solid #0EA5E9', borderRadius: 'var(--radius-sm)', color: '#38BDF8', fontWeight: 700 }}>
            Client / Dashboard
          </div>
          <span style={{ color: 'var(--text-light)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: '#0F172A', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            REST API Gateway
          </div>
          <span style={{ color: 'var(--text-light)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: '#0F172A', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            Job Queue (BullMQ)
          </div>
          <span style={{ color: 'var(--text-light)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: '#0F172A', border: '1px solid #10B981', borderRadius: 'var(--radius-sm)', color: '#34D399', fontWeight: 700 }}>
            API Workers
          </div>
          <span style={{ color: 'var(--text-light)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: '#0F172A', border: '1px solid #8B5CF6', borderRadius: 'var(--radius-sm)', color: '#A78BFA', fontWeight: 700 }}>
            Validation Engine
          </div>
          <span style={{ color: 'var(--text-light)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: '#0F172A', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            Time-Series Store
          </div>
          <span style={{ color: 'var(--text-light)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: '#0F172A', border: '1px solid #EF4444', borderRadius: 'var(--radius-sm)', color: '#F87171', fontWeight: 700 }}>
            Alert Adapters
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8' }}>NODE.JS & EXPRESS</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>37+ REST endpoints managing CRUD, contracts & metrics</div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8' }}>BULLMQ ENGINE</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Concurrency control, duplicate suppression & retries</div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8' }}>OPENAPI / AJV</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Contract compilation & structural diff identification</div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8' }}>DOCKER & CI/CD</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Multi-stage container builds & GitHub Actions pipeline</div>
          </div>
        </div>
      </section>

      {/* ================= 8. FINAL CALL TO ACTION ================= */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        border: '1px solid rgba(14, 165, 233, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem'
      }}>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          Build More Reliable APIs
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
          Monitor availability. Detect contract drift. Catch production issues before your users do.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <button
            className="btn btn-primary"
            style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', fontWeight: 700 }}
            onClick={() => onNavigateDashboard('websites')}
          >
            Start Monitoring Now
          </button>
          <button
            className="btn btn-outline"
            style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
            onClick={() => onNavigateDashboard('queue')}
          >
            View OpenAPI Specs (37+ Routes)
          </button>
        </div>
      </section>

      {/* ================= 9. FOOTER ================= */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: '2.5rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '2rem',
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem' }}>
            <span style={{ color: '#0EA5E9' }}>🛡️</span> API Sentinel
          </div>
          <p style={{ marginTop: '0.5rem', maxWidth: '300px', lineHeight: 1.5, color: 'var(--text-light)' }}>
            Automated API Monitoring, Contract Validation & Observability Platform.
          </p>
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-light)' }}>
            © 2026 API Sentinel. All rights reserved.
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>Product</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('dashboard')}>Monitoring</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('contracts')}>Contract Validation</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('history')}>Audit Logs</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('alerts')}>Incident Rules</span>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>Developers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('queue')}>Documentation</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('queue')}>API Reference</span>
            <a href="https://github.com/shubhamgir/-api-sentinel" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub Repository</a>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>Architecture</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('websites')}>Systems & Projects</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('queue')}>BullMQ Workers</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('mock')}>Sandbox Targets</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
