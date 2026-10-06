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
          
          <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF' }} />
            API OBSERVABILITY & CONTRACT INTELLIGENCE
          </div>

          <h1 style={{
            fontSize: '3.1rem',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.035em'
          }}>
            <span style={{ color: '#FFFFFF' }}>Know When Your APIs Break —</span><br />
            <span style={{ color: 'var(--text-dim)' }}>Before Your Users Do.</span>
          </h1>

          <p style={{
            fontSize: '1.02rem',
            lineHeight: 1.65,
            color: 'var(--text-muted)',
            maxWidth: '560px'
          }}>
            API Sentinel continuously monitors API availability, latency, status codes, and response contracts to detect failures and schema drift before they become production incidents.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              className="btn btn-white"
              style={{ padding: '0.75rem 1.6rem', fontSize: '0.88rem', fontWeight: 800 }}
              onClick={() => onNavigateDashboard('websites')}
            >
              Get Started <ArrowRight size={15} />
            </button>
            <button
              className="btn btn-outline"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.88rem', fontWeight: 600 }}
              onClick={() => onNavigateDashboard('dashboard')}
            >
              View Live Dashboard
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-light)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={14} color="var(--text-muted)" /> No SDK installation required
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={14} color="var(--text-muted)" /> OpenAPI 3.0 & JSON Schema
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={14} color="var(--text-muted)" /> Docker & BullMQ workers
            </span>
          </div>
        </div>

        {/* Right Column: Realistic Live Observability Console */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          {/* Mock Console Top Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#333333' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#333333' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#333333' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                api-sentinel-cluster-01
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--text-muted)'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF' }} /> ACTIVE ENGINE
              </span>
            </div>
          </div>

          {/* Console Body */}
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>UPTIME (24H)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.2rem' }}>
                  {uptimeData?.overallUptimePct || '99.9'}%
                </div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>AVG LATENCY</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.2rem' }}>
                  {latencyData?.avgLatencyMs || '42'} ms
                </div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SCHEMA HEALTH</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.2rem' }}>
                  1 Drift
                </div>
              </div>
            </div>

            {/* Live Streaming Endpoint Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                LIVE ENDPOINT MONITORING STATUS
              </div>

              {/* Endpoint 1 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    200 OK
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>GET</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF' }}>/api/mock/users</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Contract: Valid ✓</span>
                  <span style={{ color: 'var(--text-dim)' }}>8ms</span>
                </div>
              </div>

              {/* Endpoint 2 (Drifted) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    200 OK
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>POST</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF' }}>/api/mock/payment-info</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}>
                    DRIFT DETECTED
                  </span>
                  <span style={{ color: 'var(--text-dim)' }}>14ms</span>
                </div>
              </div>

              {/* Endpoint 3 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    200 OK
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>POST</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF' }}>https://leetcode.com/graphql</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Operational ✓</span>
                  <span style={{ color: 'var(--text-dim)' }}>371ms</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Alert Dispatch Item */}
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.95rem' }}>⚡</span>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Incident: Contract Violation in Payment Info
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    Triggered Slack Webhook & Email • 3 unexpected properties detected
                  </div>
                </div>
              </div>
              <span style={{
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                fontSize: '0.68rem',
                fontWeight: 600
              }}>
                Cooldown Active
              </span>
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
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF' }}>99.9%</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            API Availability SLA
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF' }}>24/7</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Continuous Monitoring
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF' }}>&lt;200ms</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Average Response Tracking
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF' }}>Real-Time</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Failure & Drift Detection
          </div>
        </div>
      </section>

      {/* ================= 3. PROBLEM SECTION ================= */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: '0.6rem' }}>FAILURE MODES</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            <span style={{ color: '#FFFFFF' }}>APIs Can Fail</span> <span style={{ color: 'var(--text-dim)' }}>Without Looking Broken</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.6 }}>
            Standard ping tools only check if a port responds. Modern microservices fail silently through data drift, type mutations, and cascading latency.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Problem 1 */}
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', marginBottom: '1rem' }}>
              <ShieldAlert size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Silent Downtime
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              API endpoints become unavailable or crash intermittently, and downstream customers discover the issue before your engineering team is notified.
            </p>
          </div>

          {/* Problem 2 */}
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', marginBottom: '1rem' }}>
              <Clock size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Latency Degradation
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              An API can remain technically available while response times silently balloon from 50ms to 3,000ms, timing out mobile apps and frontends.
            </p>
          </div>

          {/* Problem 3 */}
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', marginBottom: '1rem' }}>
              <GitBranch size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Contract Changes
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              An uncoordinated backend deployment changes response data shapes without updating the OpenAPI spec, breaking consumers without 5xx errors.
            </p>
          </div>

          {/* Problem 4 */}
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', marginBottom: '1rem' }}>
              <Layers size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Schema Drift
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Crucial properties suddenly disappear or change types (string instead of integer, null violations) while the HTTP status remains 200 OK.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 4. CONTRACT VALIDATION SHOWCASE (DIFFERENTIATION) ================= */}
      <section style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ maxWidth: '800px', marginBottom: '2rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.65rem' }}>
            CORE VALUE DIFFERENTIATION
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            <span style={{ color: '#FFFFFF' }}>An API Can Return 200 OK</span><br />
            <span style={{ color: 'var(--text-dim)' }}>and Still Be Completely Broken.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '0.75rem' }}>
            Traditional monitoring only confirms that an endpoint is responding. API Sentinel validates whether the response still strictly honors the registered OpenAPI and JSON Schema specification.
          </p>
        </div>

        {/* Side by side comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* Left: Expected */}
          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.06em' }}>
                EXPECTED SCHEMA CONTRACT
              </span>
              <span className="badge badge-subtle font-mono" style={{ fontSize: '0.68rem' }}>OPENAPI SPEC</span>
            </div>
            <pre style={{ color: '#FFFFFF', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', lineHeight: 1.7, margin: 0 }}>
              {`id:      number    ✓
name:    string    ✓
email:   string    ✓
role:    string    ✓`}
            </pre>
          </div>

          {/* Right: Actual Observed (with drift highlights) */}
          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.06em' }}>
                ACTUAL OBSERVED RESPONSE (HTTP 200)
              </span>
              <span className="badge badge-subtle font-mono" style={{ fontSize: '0.68rem' }}>BREAKING CHANGE</span>
            </div>
            <pre style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', lineHeight: 1.7, margin: 0 }}>
              <span style={{ color: '#FFFFFF' }}>id:      "usr-99"  [TYPE_MISMATCH (Expected number)]</span>{'\n'}
              <span style={{ color: 'var(--text-muted)' }}>name:    "Alice"   ✓</span>{'\n'}
              <span style={{ color: '#FFFFFF' }}>email:   undefined [MISSING_REQUIRED_FIELD]</span>{'\n'}
              <span style={{ color: 'var(--text-muted)' }}>extraKey: true     [UNEXPECTED_FIELD (Drift)]</span>
            </pre>
          </div>
        </div>

        <div style={{
          padding: '0.85rem 1.25rem',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.1rem' }}>⚡</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
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
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: '0.6rem' }}>PIPELINE LIFECYCLE</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            <span style={{ color: '#FFFFFF' }}>One Unified Engine</span> <span style={{ color: 'var(--text-dim)' }}>for Total API Reliability</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.6 }}>
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
                background: activeWorkflowStep === idx ? 'var(--bg-subtle)' : 'var(--bg-card)',
                border: activeWorkflowStep === idx ? '1px solid #FFFFFF' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: activeWorkflowStep === idx ? '#FFFFFF' : 'var(--text-dim)',
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
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            color: '#0A0A0A',
            fontSize: '1rem',
            flexShrink: 0
          }}>
            {workflowSteps[activeWorkflowStep].icon}
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Phase {workflowSteps[activeWorkflowStep].icon} — {workflowSteps[activeWorkflowStep].title}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {workflowSteps[activeWorkflowStep].desc}
            </div>
          </div>
        </div>

        {/* Lucid Flow Studio Jump Banner */}
        <div style={{
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Layers size={22} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Interactive Lucid Flow Studio
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Simulate real-time packet tracing, inspect node connection pins, and visualize the 8-phase pipeline on an interactive Lucidchart canvas.
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onNavigateDashboard('lucidflow')}
            style={{ fontWeight: 700, padding: '0.5rem 1rem' }}
          >
            Open Lucid Flow Studio <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ================= 6. CORE FEATURES SHOWCASE (FROM REFERENCE IMAGE) ================= */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Section Header: Eyebrow + Two-Tone Display Headline + Subtitle */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: '2.5rem',
          alignItems: 'end'
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>FEATURES</div>
            <h2 style={{
              fontSize: '2.85rem',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.15
            }}>
              <span style={{ color: '#FFFFFF' }}>Everything you need to</span><br />
              <span style={{ color: 'var(--text-dim)' }}>maintain absolute API reliability.</span>
            </h2>
          </div>
          <div>
            <p style={{
              fontSize: '0.98rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65
            }}>
              From automated BullMQ background queue scheduling to deep OpenAPI contract drift validation, every part of the system is engineered around one goal — catching failures before users do.
            </p>
          </div>
        </div>

        {/* Feature Showcase Card 01 (Exact Layout & Typography from Reference Image) */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Card Top Category Row */}
          <div style={{
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.25rem'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 700 }}>01</span>
            <span className="eyebrow" style={{ color: 'var(--text-dim)' }}>AI & CONTRACT INTELLIGENCE</span>
          </div>

          {/* Left Column: Heading and Value Prop */}
          <div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}>
              AI & OpenAPI Schema<br />Drift Detection
            </h3>
            <p style={{
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '1.5rem'
            }}>
              Validate responses against strict OpenAPI 3.0 / JSON Schema contracts. Five verification modes — property addition, required key dropped, type mutation, latency ballooning, and HTTP mismatch.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-subtle font-mono">AJV v8.12</span>
              <span className="badge badge-subtle font-mono">OpenAPI 3.0</span>
              <span className="badge badge-subtle font-mono">JSON Schema Draft-07</span>
            </div>
          </div>

          {/* Right Column: Inset Widget Box (Replica of Reference Image Widget) */}
          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.15rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Validate Contract Schema</span>
              <span className="eyebrow" style={{ fontSize: '0.68rem' }}>TARGET ROUTE</span>
            </div>

            {/* Inset input box */}
            <div style={{
              padding: '0.65rem 0.9rem',
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)'
            }}>
              https://api.sentinel.io/v2/payment-gateway
            </div>

            {/* Selector pills (matching 5 10 15 20 in image) */}
            <div className="pill-group">
              <span className="pill-item">GET</span>
              <span className="pill-item active">200 OK</span>
              <span className="pill-item">POST</span>
              <span className="pill-item">PUT</span>
            </div>

            {/* Blue progress bar (exact match to image) */}
            <div>
              <div style={{
                height: 4,
                borderRadius: 2,
                background: 'var(--border-color)',
                overflow: 'hidden',
                marginBottom: '0.45rem'
              }}>
                <div style={{
                  height: '100%',
                  width: '68%',
                  background: '#FFFFFF',
                  borderRadius: 2
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                <span>Evaluating response payload...</span>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>0 Drift Detected</span>
              </div>
            </div>

            {/* Bottom tag buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
              <span style={{ padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.05)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Status Code</span>
              <span style={{ padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.05)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Strict Types</span>
              <span style={{ padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.05)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Required Keys</span>
            </div>
          </div>
        </div>

        {/* Feature Showcase Card 02 (Distributed Scheduler) */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Card Top Category Row */}
          <div style={{
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.25rem'
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 700 }}>02</span>
            <span className="eyebrow" style={{ color: 'var(--text-dim)' }}>DISTRIBUTED TASK SCHEDULER & RETRIES</span>
          </div>

          <div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}>
              BullMQ Distributed Queue<br />& Retry Architecture
            </h3>
            <p style={{
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '1.5rem'
            }}>
              Decoupled background worker queues ensure continuous monitoring checks never block control-plane HTTP threads. Intelligent exponential backoff suppresses transient blips to prevent noisy false alarms.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-subtle font-mono">Concurrency Limit (5)</span>
              <span className="badge badge-subtle font-mono">Deduplication Suppression</span>
              <span className="badge badge-subtle font-mono">Exponential Backoff</span>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>BullMQ Queue Pipeline</span>
              <span style={{ padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 700 }}>ONLINE (5 SLOTS)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Worker Slots</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>5 Active</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Deduplication Window</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>5,000 ms</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Background Dispatch Rate</span>
              <strong style={{ color: '#FFFFFF' }}>100% Scheduled</strong>
            </div>
          </div>
        </div>

        {/* Supporting 6-card feature matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
          
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              📡 Availability Probing
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Validates HTTP status codes, network reachability, TLS handshakes, and response health.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              ⏱️ Real-Time Latency Percentiles
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Measures precise round-trip times in milliseconds, capturing p50, p90, and p99 percentiles.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              🔄 Exponential Backoff Retries
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Eliminates alert fatigue by executing 3x retries with exponential backoff on transient network drops.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              🔕 Alert Cooldown Windows
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Configurable deduplication suppresses repeat alert spam to Slack, Webhooks, and Email.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              📈 Time-Series Logs & SLAs
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Maintains full historical inspection logs with request/response payloads and uptime SLAs.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              📑 37+ REST Route Catalog
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Full OpenAPI-documented REST catalog for websites, endpoints, metrics, and workers.
            </p>
          </div>

        </div>
      </section>

      {/* ================= 7. TECHNICAL ARCHITECTURE SECTION ================= */}
      <section style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ maxWidth: '750px', marginBottom: '2rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.6rem' }}>INFRASTRUCTURE</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            <span style={{ color: '#FFFFFF' }}>Enterprise Architecture</span><br />
            <span style={{ color: 'var(--text-dim)' }}>Engineered for Real-Time Scale</span>
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.6 }}>
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
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem'
        }}>
          <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700, boxShadow: 'var(--shadow-sm)' }}>
            Client / Dashboard
          </div>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700, boxShadow: 'var(--shadow-sm)' }}>
            REST API Gateway
          </div>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700, boxShadow: 'var(--shadow-sm)' }}>
            Job Queue (BullMQ)
          </div>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700, boxShadow: 'var(--shadow-sm)' }}>
            API Workers
          </div>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700, boxShadow: 'var(--shadow-sm)' }}>
            Validation Engine
          </div>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700, boxShadow: 'var(--shadow-sm)' }}>
            Time-Series Store
          </div>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700, boxShadow: 'var(--shadow-sm)' }}>
            Alert Adapters
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF' }}>NODE.JS & EXPRESS</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>37+ REST endpoints managing CRUD, contracts & metrics</div>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF' }}>BULLMQ ENGINE</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Concurrency control, duplicate suppression & retries</div>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF' }}>OPENAPI / AJV</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Contract compilation & structural diff identification</div>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF' }}>DOCKER & CI/CD</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Multi-stage container builds & GitHub Actions pipeline</div>
          </div>
        </div>
      </section>

      {/* ================= 8. FINAL CALL TO ACTION ================= */}
      <section style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="eyebrow" style={{ marginBottom: '0.2rem' }}>GET STARTED</div>
        <h2 style={{ fontSize: '2.85rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
          <span style={{ color: '#FFFFFF' }}>Build More Reliable APIs —</span><br />
          <span style={{ color: 'var(--text-dim)' }}>Zero Silent Outages.</span>
        </h2>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
          Monitor availability. Detect contract drift. Catch production issues before your users do.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <button
            className="btn btn-white"
            style={{ padding: '0.85rem 2.2rem', fontSize: '0.92rem', fontWeight: 800 }}
            onClick={() => onNavigateDashboard('websites')}
          >
            Start Monitoring Now
          </button>
          <button
            className="btn btn-outline"
            style={{ padding: '0.85rem 1.6rem', fontSize: '0.92rem', fontWeight: 600 }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 800, fontSize: '1.1rem' }}>
            <span style={{ color: 'var(--primary)' }}>🛡️</span> API Sentinel
          </div>
          <p style={{ marginTop: '0.5rem', maxWidth: '300px', lineHeight: 1.5, color: 'var(--text-muted)' }}>
            Automated API Monitoring, Contract Validation & Observability Platform.
          </p>
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-light)' }}>
            © 2026 API Sentinel. All rights reserved.
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Product</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('dashboard')}>Monitoring</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('contracts')}>Contract Validation</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('history')}>Audit Logs</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('alerts')}>Incident Rules</span>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Developers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('queue')}>Documentation</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateDashboard('queue')}>API Reference</span>
            <a href="https://github.com/shubhamgir/-api-sentinel" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub Repository</a>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Architecture</div>
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
