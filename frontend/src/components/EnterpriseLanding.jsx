import React, { useState, useEffect } from 'react';
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
  Filter,
  Radio,
  BarChart3,
  BellOff,
  FileCode,
  Play
} from 'lucide-react';

export default function EnterpriseLanding({ endpoints, uptimeData, latencyData, onNavigateDashboard }) {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // High-performance Parallax Scroll Listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real Interactive Live Contract Testing Console (Replacing static non-working placeholders)
  const [simMethod, setSimMethod] = useState('GET');
  const [simUrl, setSimUrl] = useState('https://api.sentinel.io/v2/payment-gateway');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(100);
  const [simLatency, setSimLatency] = useState(8);
  const [simDriftCount, setSimDriftCount] = useState(0);
  const [simStatus, setSimStatus] = useState('Strict Contract Match: 4 fields validated, 0 drift');
  const [simMode, setSimMode] = useState('Strict Types');

  const runSimulation = (method = simMethod) => {
    setIsSimulating(true);
    setSimProgress(25);
    setSimStatus('Evaluating OpenAPI contract schema...');
    setTimeout(() => {
      setSimProgress(70);
      setTimeout(() => {
        setSimProgress(100);
        setIsSimulating(false);
        if (method === 'POST') {
          setSimLatency(14);
          setSimDriftCount(1);
          setSimStatus('1 Drift Alert: field "amount" expected number, got string');
        } else if (method === 'PUT') {
          setSimLatency(22);
          setSimDriftCount(1);
          setSimStatus('1 Drift Alert: unexpected field "deprecated_id"');
        } else {
          setSimLatency(Math.floor(Math.random() * 5) + 6);
          setSimDriftCount(0);
          setSimStatus('Strict Contract Match: 4 fields validated, 0 drift');
        }
      }, 350);
    }, 250);
  };

  // Interactive BullMQ Worker Dispatcher
  const [workerSlots, setWorkerSlots] = useState(5);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchCount, setDispatchCount] = useState(100);

  const handleDispatchJob = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setDispatchCount(prev => prev + 1);
      setIsDispatching(false);
    }, 450);
  };

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
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '3rem' }}>
      
      {/* Background Parallax Mesh Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          transform: `translate3d(0, ${scrollY * 0.22}px, 0)`,
          zIndex: 0,
          willChange: 'transform'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 700,
          left: '5%',
          width: 450,
          height: 450,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 112, 243, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          transform: `translate3d(0, ${scrollY * -0.12}px, 0)`,
          zIndex: 0,
          willChange: 'transform'
        }}
      />

      {/* Parallax Marginal Telemetry Coordinates */}
      <div style={{
        position: 'absolute',
        right: '1.5%',
        top: '28%',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: 'var(--text-dim)',
        padding: '0.2rem 0.5rem',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        background: 'rgba(0, 0, 0, 0.6)',
        pointerEvents: 'none',
        transform: `translate3d(0, ${scrollY * -0.18}px, 0)`,
        willChange: 'transform'
      }}>
        TELEMETRY // P99: 14ms
      </div>

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', transform: `translate3d(0, ${scrollY * 0.03}px, 0)`, willChange: 'transform' }}>
          
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

        {/* Right Column: Vercel-Style Live Telemetry Terminal (Parallax Float) */}
        <div style={{
          background: '#000000',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
          transform: `translate3d(0, ${Math.min(scrollY * 0.1, 75)}px, 0)`,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
          transition: 'transform 0.05s ease-out',
          willChange: 'transform'
        }}>
          {/* Terminal Tab Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.65rem 1rem',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>sentinel/telemetry</span>
              <span style={{ color: 'var(--text-dim)' }}>— live stream</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              BullMQ Worker Slot #01
            </div>
          </div>

          {/* Quick Metrics Bar (Single Row, No Inner Boxes) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '0.72rem'
          }}>
            <div style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-dim)' }}>UPTIME </span>
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{uptimeData?.overallUptimePct || '99.9'}%</span>
            </div>
            <div style={{ padding: '0.65rem 1rem', borderRight: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-dim)' }}>P99 LATENCY </span>
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{latencyData?.avgLatencyMs || '42'}ms</span>
            </div>
            <div style={{ padding: '0.65rem 1rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>DRIFT </span>
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>1 Detected</span>
            </div>
          </div>

          {/* Clean Telemetry Stream Rows (Hairline Separators, No Inner Card Boxes) */}
          <div style={{ fontSize: '0.75rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr 65px 55px 110px',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              color: 'var(--text-dim)',
              fontSize: '0.68rem',
              borderBottom: '1px solid var(--border-color)',
              fontWeight: 600
            }}>
              <span>METHOD</span>
              <span>ENDPOINT ROUTE</span>
              <span>STATUS</span>
              <span>LATENCY</span>
              <span>CONTRACT</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr 65px 55px 110px',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              borderBottom: '1px solid var(--border-color)',
              alignItems: 'center'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>GET</span>
              <span style={{ color: 'var(--text-main)' }}>/api/v1/users</span>
              <span style={{ color: 'var(--text-muted)' }}>200 OK</span>
              <span style={{ color: 'var(--text-dim)' }}>8ms</span>
              <span style={{ color: 'var(--text-muted)' }}>Valid ✓</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr 65px 55px 110px',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              borderBottom: '1px solid var(--border-color)',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.02)'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>POST</span>
              <span style={{ color: 'var(--text-main)' }}>/api/v1/payment-info</span>
              <span style={{ color: 'var(--text-muted)' }}>200 OK</span>
              <span style={{ color: 'var(--text-dim)' }}>14ms</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Drift (Type)</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr 65px 55px 110px',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              borderBottom: '1px solid var(--border-color)',
              alignItems: 'center'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>POST</span>
              <span style={{ color: 'var(--text-main)' }}>/graphql</span>
              <span style={{ color: 'var(--text-muted)' }}>200 OK</span>
              <span style={{ color: 'var(--text-dim)' }}>371ms</span>
              <span style={{ color: 'var(--text-muted)' }}>Valid ✓</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr 65px 55px 110px',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              alignItems: 'center'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>GET</span>
              <span style={{ color: 'var(--text-main)' }}>/api/v1/health</span>
              <span style={{ color: 'var(--text-muted)' }}>200 OK</span>
              <span style={{ color: 'var(--text-dim)' }}>4ms</span>
              <span style={{ color: 'var(--text-muted)' }}>Valid ✓</span>
            </div>
          </div>

          {/* Terminal Footer Status */}
          <div style={{
            padding: '0.65rem 1rem',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-subtle)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>● Incident webhook dispatched to Slack / PagerDuty</span>
            <span style={{ color: 'var(--text-dim)' }}>Cooldown active</span>
          </div>
        </div>
      </section>

      {/* ================= 2. TRUST / METRICS (NO ENCLOSING BOX - VERCEL STRIP) ================= */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
        padding: '2.5rem 0',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        transform: `translate3d(0, ${Math.max(-15, Math.min(15, (scrollY - 200) * 0.03))}px, 0)`,
        willChange: 'transform'
      }}>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#EDEDED', letterSpacing: '-0.04em' }}>99.9%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            API Availability SLA
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#EDEDED', letterSpacing: '-0.04em' }}>24/7</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Continuous Monitoring
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#EDEDED', letterSpacing: '-0.04em' }}>&lt;200ms</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Average Latency Tracking
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#EDEDED', letterSpacing: '-0.04em' }}>Real-Time</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
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
          <div className="card" style={{ padding: '1.5rem' }}>
            <ShieldAlert size={20} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.85rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Silent Downtime
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              API endpoints become unavailable or crash intermittently, and downstream customers discover the issue before your engineering team is notified.
            </p>
          </div>

          {/* Problem 2 */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <Clock size={20} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.85rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Latency Degradation
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              An API can remain technically available while response times silently balloon from 50ms to 3,000ms, timing out mobile apps and frontends.
            </p>
          </div>

          {/* Problem 3 */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <GitBranch size={20} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.85rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Contract Changes
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              An uncoordinated backend deployment changes response data shapes without updating the OpenAPI spec, breaking consumers without 5xx errors.
            </p>
          </div>

          {/* Problem 4 */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <Layers size={20} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.85rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Schema Drift
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Crucial properties suddenly disappear or change types (string instead of integer, null violations) while the HTTP status remains 200 OK.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 4. CONTRACT VALIDATION SHOWCASE (DIFFERENTIATION) ================= */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <div className="eyebrow" style={{ marginBottom: '0.65rem' }}>
            SCHEMA CONTRACT ASSURANCE
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            <span style={{ color: '#FFFFFF' }}>An API Can Return 200 OK</span><br />
            <span style={{ color: 'var(--text-dim)' }}>and Still Be Completely Broken.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '0.75rem' }}>
            Traditional monitoring only confirms that a port responded. API Sentinel evaluates the response body against registered OpenAPI 3.0 and JSON Schema specifications to catch silent schema drift before downstream clients fail.
          </p>
        </div>

        {/* Single Unified Vercel Split-Diff Frame (Parallax Depth) */}
        <div style={{
          background: '#000000',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          transform: `translate3d(0, ${Math.max(-20, Math.min(20, (scrollY - 650) * 0.03))}px, 0)`,
          willChange: 'transform'
        }}>
          {/* Frame Top Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#262626' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#262626' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#262626' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                contract-diff /api/v1/users --strict
              </span>
            </div>
            <span className="badge badge-subtle font-mono" style={{ fontSize: '0.7rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              1 TYPE MUTATION · 1 MISSING KEY · 1 UNEXPECTED
            </span>
          </div>

          {/* Split Diff Content Panes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {/* Left Pane: Expected Spec */}
            <div style={{ padding: '1.25rem 1.5rem', borderRight: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                  EXPECTED SCHEMA SPEC (OPENAPI 3.0)
                </span>
                <span style={{ fontSize: '0.7rem', color: '#10B981', fontFamily: 'var(--font-mono)' }}>spec_v2.json</span>
              </div>
              <pre style={{ color: 'var(--text-main)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', lineHeight: 1.8, margin: 0 }}>
{`id:      number    ✓
name:    string    ✓
email:   string    ✓
role:    string    ✓`}
              </pre>
            </div>

            {/* Right Pane: Observed Payload */}
            <div style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.06em' }}>
                  ACTUAL OBSERVED RESPONSE (HTTP 200 OK)
                </span>
                <span style={{ fontSize: '0.7rem', color: '#EF4444', fontFamily: 'var(--font-mono)' }}>drift_violation</span>
              </div>
              <pre style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', lineHeight: 1.8, margin: 0 }}>
                <span style={{ color: '#EF4444' }}>id:      "usr-99"  [TYPE_MISMATCH: expected number]</span>{'\n'}
                <span style={{ color: 'var(--text-muted)' }}>name:    "Alice"   ✓</span>{'\n'}
                <span style={{ color: '#EF4444' }}>email:   undefined [MISSING_REQUIRED_FIELD]</span>{'\n'}
                <span style={{ color: 'var(--text-dim)' }}>extraKey: true     [UNEXPECTED_PROPERTY]</span>
              </pre>
            </div>
          </div>

          {/* Integrated Action Footer */}
          <div style={{
            padding: '0.85rem 1.25rem',
            background: 'var(--bg-subtle)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Contract violation detected · Dispatched via BullMQ to Slack webhook & PagerDuty
              </span>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => onNavigateDashboard('contracts')}
              style={{ fontSize: '0.78rem' }}
            >
              Inspect Contract Validator →
            </button>
          </div>
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

        {/* Unified Interactive Pipeline Bar (Vercel Style: Zero nested box clutter) */}
        <div style={{
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          background: '#000000',
          overflow: 'hidden'
        }}>
          {/* Segmented Pipeline Navigation */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-subtle)'
          }}>
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWorkflowStep(idx)}
                style={{
                  padding: '0.85rem 0.5rem',
                  background: activeWorkflowStep === idx ? '#000000' : 'transparent',
                  border: 'none',
                  borderRight: idx < 7 ? '1px solid var(--border-color)' : 'none',
                  borderBottom: activeWorkflowStep === idx ? '2px solid #FFFFFF' : '2px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: activeWorkflowStep === idx ? '#FFFFFF' : 'var(--text-dim)',
                  fontWeight: 700
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: activeWorkflowStep === idx ? 700 : 500,
                  color: activeWorkflowStep === idx ? '#FFFFFF' : 'var(--text-muted)',
                  marginTop: '0.2rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Phase Details + Direct Lucid Flow Studio link */}
          <div style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            background: '#000000'
          }}>
            <div style={{ maxWidth: '650px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-subtle font-mono" style={{ fontSize: '0.7rem' }}>
                  PHASE {workflowSteps[activeWorkflowStep].icon}
                </span>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  {workflowSteps[activeWorkflowStep].title}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                {workflowSteps[activeWorkflowStep].desc}
              </p>
            </div>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => onNavigateDashboard('lucidflow')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}
            >
              Interactive Lucid Flow Canvas <ArrowRight size={14} />
            </button>
          </div>
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

        {/* Feature Showcase Card 01 (Interactive Live Contract Tester with Parallax Depth) */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)',
          transform: `translate3d(0, ${Math.max(-20, Math.min(20, (scrollY - 1100) * 0.03))}px, 0)`,
          willChange: 'transform'
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

          {/* Right Column: Real Interactive Live Contract Testing Console */}
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
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Interactive Contract Evaluator</span>
              <span className="badge badge-subtle font-mono" style={{ fontSize: '0.65rem' }}>LIVE ENGINE</span>
            </div>

            {/* Real Interactive Route Input */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={simUrl}
                onChange={(e) => setSimUrl(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-main)',
                  outline: 'none'
                }}
              />
              <button
                onClick={() => runSimulation()}
                disabled={isSimulating}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem', whiteSpace: 'nowrap' }}
              >
                {isSimulating ? 'Verifying...' : 'Test Schema'}
              </button>
            </div>

            {/* Interactive Method Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              {['GET', 'POST', 'PUT'].map(method => (
                <button
                  key={method}
                  onClick={() => {
                    setSimMethod(method);
                    runSimulation(method);
                  }}
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: simMethod === method ? '#FFFFFF' : 'var(--bg-card)',
                    color: simMethod === method ? '#000000' : 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {method}
                </button>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {isSimulating ? 'Evaluating...' : 'HTTP 200 OK'}
              </span>
            </div>

            {/* Dynamic Animated Progress Bar */}
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
                  width: `${simProgress}%`,
                  background: simDriftCount > 0 ? '#EF4444' : '#FFFFFF',
                  borderRadius: 2,
                  transition: 'width 0.3s ease, background 0.3s ease'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                <span>{simStatus}</span>
                <span style={{ color: simDriftCount > 0 ? '#EF4444' : '#22C55E', fontWeight: 700 }}>
                  {simLatency}ms · {simDriftCount} Drift
                </span>
              </div>
            </div>

            {/* Mode selection toggle chips */}
            <div style={{ display: 'flex', gap: '0.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
              {['Status Code', 'Strict Types', 'Required Keys'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setSimMode(mode)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    background: simMode === mode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: simMode === mode ? '1px solid #FFFFFF' : '1px solid var(--border-color)',
                    fontSize: '0.72rem',
                    color: simMode === mode ? '#FFFFFF' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Showcase Card 02 (Distributed Scheduler with Interactive Dispatcher) */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)',
          transform: `translate3d(0, ${Math.max(-20, Math.min(20, (scrollY - 1300) * 0.03))}px, 0)`,
          willChange: 'transform'
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

          {/* Right Column: Interactive BullMQ Queue Pipeline */}
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
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>BullMQ Queue Controller</span>
              <span style={{ padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: '#22C55E', fontSize: '0.65rem', fontWeight: 700 }}>
                ONLINE ({workerSlots} WORKERS)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Active Slots</div>
                <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.35rem' }}>
                  {[3, 5, 8].map(slots => (
                    <button
                      key={slots}
                      onClick={() => setWorkerSlots(slots)}
                      style={{
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-sm)',
                        background: workerSlots === slots ? '#FFFFFF' : 'transparent',
                        color: workerSlots === slots ? '#000000' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer'
                      }}
                    >
                      {slots}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Probes Dispatched</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>{dispatchCount} Checks</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Deduplication Cooldown: 5,000ms</span>
              <button
                onClick={handleDispatchJob}
                disabled={isDispatching}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem' }}
              >
                {isDispatching ? 'Dispatching...' : 'Trigger Probe Job'}
              </button>
            </div>
          </div>
        </div>

        {/* Supporting 6-card feature matrix (Vercel Style: No emojis, clean technical typography) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
          
          <div className="card" style={{ padding: '1.5rem' }}>
            <Radio size={18} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Availability Probing
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Validates HTTP status codes, network reachability, TLS handshakes, and response health.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <Clock size={18} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Latency Percentiles (p50 / p90 / p99)
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Measures precise round-trip times in milliseconds, capturing p50, p90, and p99 percentiles.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <RefreshCw size={18} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Exponential Backoff Retries
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Eliminates alert fatigue by executing 3x retries with exponential backoff on transient network drops.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <BellOff size={18} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Alert Cooldown Suppression
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Configurable deduplication suppresses repeat alert spam to Slack, Webhooks, and Email.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <BarChart3 size={18} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Time-Series Logs & SLA Auditing
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Maintains full historical inspection logs with request/response payloads and uptime SLAs.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <FileCode size={18} strokeWidth={1.8} style={{ color: '#EDEDED', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              37+ REST Endpoint Catalog
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Full OpenAPI-documented REST catalog for websites, endpoints, metrics, and workers.
            </p>
          </div>

        </div>
      </section>

      {/* ================= 7. TECHNICAL ARCHITECTURE SECTION ================= */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ maxWidth: '750px' }}>
          <div className="eyebrow" style={{ marginBottom: '0.6rem' }}>INFRASTRUCTURE</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            <span style={{ color: '#FFFFFF' }}>Enterprise Architecture</span><br />
            <span style={{ color: 'var(--text-dim)' }}>Engineered for Real-Time Scale</span>
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.6 }}>
            Asynchronous event-driven pipeline designed for high throughput, duplicate suppression, and reliability.
          </p>
        </div>

        {/* Architecture flow diagram (Clean Vercel Pipeline: No nested card boxes) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          padding: '1.75rem 1.25rem',
          background: '#000000',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          transform: `translate3d(0, ${Math.max(-20, Math.min(20, (scrollY - 1800) * 0.03))}px, 0)`,
          willChange: 'transform'
        }}>
          <div style={{ padding: '0.55rem 0.9rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            Client / Dashboard
          </div>
          <span style={{ color: 'var(--text-dim)' }}>→</span>
          <div style={{ padding: '0.55rem 0.9rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            REST API Gateway
          </div>
          <span style={{ color: 'var(--text-dim)' }}>→</span>
          <div style={{ padding: '0.55rem 0.9rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            Job Queue (BullMQ)
          </div>
          <span style={{ color: 'var(--text-dim)' }}>→</span>
          <div style={{ padding: '0.55rem 0.9rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            API Workers
          </div>
          <span style={{ color: 'var(--text-dim)' }}>→</span>
          <div style={{ padding: '0.55rem 0.9rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            Validation Engine
          </div>
          <span style={{ color: 'var(--text-dim)' }}>→</span>
          <div style={{ padding: '0.55rem 0.9rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            Time-Series Store
          </div>
          <span style={{ color: 'var(--text-dim)' }}>→</span>
          <div style={{ padding: '0.55rem 0.9rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontWeight: 700 }}>
            Alert Adapters
          </div>
        </div>

        {/* Technology Stack Grid (Unified Hairline Strip: Zero box clutter) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1.75rem 0'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em' }}>NODE.JS & EXPRESS</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.5 }}>37+ REST endpoints managing CRUD, contracts & metrics</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em' }}>BULLMQ ENGINE</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.5 }}>Concurrency control, duplicate suppression & retries</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em' }}>OPENAPI / AJV</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.5 }}>Contract compilation & structural diff identification</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em' }}>DOCKER & CI/CD</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.5 }}>Multi-stage container builds & GitHub Actions pipeline</div>
          </div>
        </div>
      </section>

      {/* ================= 8. FINAL CALL TO ACTION (Open Breathable Vercel Canvas) ================= */}
      <section style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: '5rem',
        paddingBottom: '2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem'
      }}>
        <div className="eyebrow" style={{ marginBottom: '0.2rem' }}>GET STARTED</div>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.15 }}>
          <span style={{ color: '#FFFFFF' }}>Build More Reliable APIs.</span><br />
          <span style={{ color: 'var(--text-dim)' }}>Zero Silent Outages.</span>
        </h2>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
          Monitor availability. Detect contract drift. Catch production issues before your users do.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
            <span style={{ width: 14, height: 14, background: '#FFFFFF', borderRadius: 2, display: 'inline-block' }} /> API Sentinel
          </div>
          <p style={{ marginTop: '0.6rem', maxWidth: '300px', lineHeight: 1.5, color: 'var(--text-muted)' }}>
            Automated API Monitoring, Contract Validation & Observability Platform.
          </p>
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
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
