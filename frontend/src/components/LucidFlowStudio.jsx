import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Sliders,
  Layers,
  Database,
  Cpu,
  ShieldCheck,
  Bell,
  RefreshCw,
  Terminal,
  ExternalLink,
  Info,
  Check
} from 'lucide-react';

export default function LucidFlowStudio({ endpoints, onSelectTab }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeSimulationStep, setActiveSimulationStep] = useState(-1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(900); // ms per step
  const [copiedJson, setCopiedJson] = useState(false);

  // 8 Core Nodes in the Lucid Flow Diagram
  const nodes = [
    {
      id: 'node-trigger',
      step: 1,
      category: 'TRIGGER',
      title: 'HTTP Inbound Trigger',
      subtitle: 'REST / GraphQL Request',
      icon: 'globe',
      color: '#0078D4', // Azure Blue
      status: 'Ready',
      x: 30,
      y: 90,
      config: {
        method: 'POST / GET / PUT',
        protocols: ['HTTP/1.1', 'HTTP/2'],
        auth: 'Bearer JWT / API Key',
        headers: 'Accept: application/json'
      },
      description: 'Captures target API invocation request, validates headers, and prepares monitoring task envelope.'
    },
    {
      id: 'node-queue',
      step: 2,
      category: 'QUEUE',
      title: 'BullMQ Job Queue',
      subtitle: 'Deduplication & Concurrency',
      icon: 'layers',
      color: '#0284C7', // Sky Cyan
      status: 'Active (5 slots)',
      x: 280,
      y: 90,
      config: {
        concurrency: 5,
        deduplicationWindow: '5,000 ms',
        retryAttempts: '3x Exponential Backoff',
        priority: 'High-availability'
      },
      description: 'Enqueues monitoring job asynchronously, blocks duplicate redundant executions, and manages worker capacity.'
    },
    {
      id: 'node-probe',
      step: 3,
      category: 'EXECUTION',
      title: 'Worker HTTP Probe',
      subtitle: 'Round-Trip Latency Engine',
      icon: 'cpu',
      color: '#0D9488', // Teal
      status: 'Listening',
      x: 530,
      y: 90,
      config: {
        timeout: '3,000 ms',
        keepAlive: true,
        userAgent: 'APISentinel-Worker/2.0 (Azure-Cloud)',
        tlsValidation: 'Strict'
      },
      description: 'Sends real HTTP probe to target API, measuring precise TTFB (Time to First Byte) and full round-trip latency in ms.'
    },
    {
      id: 'node-status',
      step: 4,
      category: 'EVALUATION',
      title: 'Status Code Evaluator',
      subtitle: 'Expected HTTP Comparison',
      icon: 'check-circle',
      color: '#107C41', // Azure Green
      status: 'Evaluated',
      x: 780,
      y: 90,
      config: {
        expectedCode: 200,
        allowedCodes: [200, 201, 204],
        retryOnTransient: [502, 503, 504],
        circuitBreaker: 'Disabled'
      },
      description: 'Verifies response HTTP status matches target configuration; immediately triggers retry with backoff on transient errors.'
    },
    {
      id: 'node-validator',
      step: 5,
      category: 'VALIDATION',
      title: 'AJV Contract Engine',
      subtitle: 'OpenAPI 3.0 / JSON Schema',
      icon: 'shield',
      color: '#6366F1', // Indigo
      status: 'Contract Check',
      x: 780,
      y: 310,
      config: {
        schemaStandard: 'JSON Schema Draft-07 / OpenAPI 3.0',
        strictRequiredCheck: true,
        additionalProperties: 'Report Drift',
        typeCoercion: false
      },
      description: 'Validates full JSON response structure against registered contract. Checks required fields, data types, and formatting.'
    },
    {
      id: 'node-drift',
      step: 6,
      category: 'ANALYTICS',
      title: 'Schema Drift Detector',
      subtitle: 'Structural Diff Classifier',
      icon: 'git-branch',
      color: '#8B5CF6', // Purple
      status: 'Drift Monitor',
      x: 530,
      y: 310,
      config: {
        classifyModes: ['MISSING_FIELD', 'UNEXPECTED_FIELD', 'TYPE_MISMATCH'],
        diffAlgorithm: 'Recursive Deep AST Comparison',
        severityLevel: 'High'
      },
      description: 'Identifies unannounced schema changes—even when HTTP status is 200 OK—preventing silent frontend breaking changes.'
    },
    {
      id: 'node-store',
      step: 7,
      category: 'DATABASE',
      title: 'Time-Series Store',
      subtitle: 'Latency & Uptime Series',
      icon: 'database',
      color: '#0284C7', // Blue
      status: 'Indexed',
      x: 280,
      y: 310,
      config: {
        retentionPolicy: '30 Days Rolling Log',
        percentiles: 'p50, p90, p99 Calculated',
        indexing: 'timestamp + endpointId + websiteId'
      },
      description: 'Persists timestamped check records, calculates rolling uptime percentages, and streams live telemetry to the portal.'
    },
    {
      id: 'node-alert',
      step: 8,
      category: 'ALERTING',
      title: 'Alert Cooldown Dispatcher',
      subtitle: 'Webhook & Email Channels',
      icon: 'bell',
      color: '#D83B01', // Azure Warning / Alert
      status: 'Suppression Active',
      x: 30,
      y: 310,
      config: {
        cooldownWindow: '5 Minutes',
        channels: ['Slack Webhook', 'Microsoft Teams', 'PagerDuty', 'Email'],
        suppressNoisyDuplicates: true
      },
      description: 'Fires webhook and email notifications while suppressing repeated spam alerts within the configurable cooldown window.'
    }
  ];

  // Connections between nodes
  const connections = [
    { from: 'node-trigger', to: 'node-queue', label: 'Enqueue' },
    { from: 'node-queue', to: 'node-probe', label: 'Worker Slot' },
    { from: 'node-probe', to: 'node-status', label: 'HTTP 200' },
    { from: 'node-status', to: 'node-validator', label: 'Payload AST' },
    { from: 'node-validator', to: 'node-drift', label: 'Contract Diff' },
    { from: 'node-drift', to: 'node-store', label: 'Metrics Persist' },
    { from: 'node-store', to: 'node-alert', label: 'Trigger Policy' }
  ];

  // Set default selected node
  useEffect(() => {
    if (!selectedNode) {
      setSelectedNode(nodes[0]);
    }
  }, []);

  // Simulation execution loop
  const runSimulation = () => {
    setIsSimulating(true);
    setActiveSimulationStep(0);
    setSelectedNode(nodes[0]);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < nodes.length) {
        setActiveSimulationStep(currentStep);
        setSelectedNode(nodes[currentStep]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setActiveSimulationStep(-1);
        }, 1200);
      }
    }, simulationSpeed);
  };

  const exportDiagramJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ nodes, connections }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'api-sentinel-lucid-flow.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Azure Service Header / Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.6rem 1rem',
        background: '#0B1120',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Microsoft Azure</span>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <span style={{ color: 'var(--text-muted)' }}>API Sentinel</span>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <span style={{ fontWeight: 700, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Layers size={14} /> Lucid Flow Studio
          </span>
          <span className="badge badge-subtle font-mono" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
            v2.4 Flow Engine
          </span>
        </div>

        {/* Command Bar Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className={`btn btn-sm ${isSimulating ? 'btn-danger' : 'btn-primary'}`}
            onClick={runSimulation}
            disabled={isSimulating}
            style={{ fontWeight: 700 }}
          >
            <Play size={13} /> {isSimulating ? `Tracing Step 0${activeSimulationStep + 1}...` : 'Run Packet Simulation'}
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => { setActiveSimulationStep(-1); setIsSimulating(false); }}
            title="Reset Simulation State"
          >
            <RotateCcw size={13} /> Reset
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={exportDiagramJson}
            title="Export Lucid Flow JSON schema"
          >
            <Download size={13} /> {copiedJson ? 'Exported!' : 'Export JSON'}
          </button>
        </div>
      </div>

      {/* Main Studio View: Flow Canvas (Left/Center) + Lucid Inspector Drawer (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '1rem',
        alignItems: 'start'
      }}>
        
        {/* Canvas Area */}
        <div style={{
          position: 'relative',
          background: showGrid
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, #070B14 1px)'
            : '#070B14',
          backgroundSize: '24px 24px',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          height: '620px',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8)'
        }}>
          
          {/* Lucidchart Canvas Controls Top Floating Toolbar */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: 14,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.6rem',
            background: 'rgba(11, 17, 32, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setZoomLevel(prev => Math.min(prev + 10, 140))}
              title="Zoom In"
              style={{ padding: '0.25rem 0.45rem' }}
            >
              <ZoomIn size={13} />
            </button>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', minWidth: '40px', textAlign: 'center' }}>
              {zoomLevel}%
            </span>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setZoomLevel(prev => Math.max(prev - 10, 70))}
              title="Zoom Out"
              style={{ padding: '0.25rem 0.45rem' }}
            >
              <ZoomOut size={13} />
            </button>
            <div style={{ width: 1, height: 16, background: 'var(--border-color)', margin: '0 0.2rem' }} />
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setZoomLevel(100)}
              title="Reset 100%"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem' }}
            >
              100%
            </button>
            <button
              className={`btn btn-sm ${showGrid ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setShowGrid(!showGrid)}
              title="Toggle Grid Canvas"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem' }}
            >
              <Grid size={12} /> Grid
            </button>
          </div>

          {/* Simulation Active Banner */}
          {isSimulating && (
            <div style={{
              position: 'absolute',
              top: 14,
              right: 14,
              zIndex: 10,
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(0, 120, 212, 0.2)',
              border: '1px solid #0078D4',
              color: '#38BDF8',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 0 15px rgba(0, 120, 212, 0.4)'
            }}>
              <span className="pulse-dot" style={{ backgroundColor: '#0078D4' }} />
              Simulating Packet: Step {activeSimulationStep + 1} of 8 ({nodes[activeSimulationStep]?.title})
            </div>
          )}

          {/* Zoomable Container with SVG Connections & Nodes */}
          <div style={{
            width: '1000px',
            height: '580px',
            position: 'absolute',
            top: 20,
            left: 20,
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: '0 0',
            transition: 'transform 0.15s ease'
          }}>
            
            {/* SVG Connector Lines */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38BDF8" />
                </marker>
                <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10B981" />
                </marker>
              </defs>

              {/* 1. Trigger -> Queue (Horizontal) */}
              <line x1="240" y1="150" x2="280" y2="150" stroke={activeSimulationStep >= 1 ? '#10B981' : '#334155'} strokeWidth={activeSimulationStep === 1 ? '3' : '2'} strokeDasharray={activeSimulationStep === 1 ? '4 4' : 'none'} markerEnd={activeSimulationStep >= 1 ? 'url(#arrow-active)' : 'url(#arrow)'} />
              
              {/* 2. Queue -> Probe (Horizontal) */}
              <line x1="490" y1="150" x2="530" y2="150" stroke={activeSimulationStep >= 2 ? '#10B981' : '#334155'} strokeWidth={activeSimulationStep === 2 ? '3' : '2'} strokeDasharray={activeSimulationStep === 2 ? '4 4' : 'none'} markerEnd={activeSimulationStep >= 2 ? 'url(#arrow-active)' : 'url(#arrow)'} />
              
              {/* 3. Probe -> Status (Horizontal) */}
              <line x1="740" y1="150" x2="780" y2="150" stroke={activeSimulationStep >= 3 ? '#10B981' : '#334155'} strokeWidth={activeSimulationStep === 3 ? '3' : '2'} strokeDasharray={activeSimulationStep === 3 ? '4 4' : 'none'} markerEnd={activeSimulationStep >= 3 ? 'url(#arrow-active)' : 'url(#arrow)'} />

              {/* 4. Status -> Validator (Vertical Turn Down) */}
              <path d="M 885 210 L 885 310" fill="none" stroke={activeSimulationStep >= 4 ? '#10B981' : '#334155'} strokeWidth={activeSimulationStep === 4 ? '3' : '2'} strokeDasharray={activeSimulationStep === 4 ? '4 4' : 'none'} markerEnd={activeSimulationStep >= 4 ? 'url(#arrow-active)' : 'url(#arrow)'} />

              {/* 5. Validator -> Drift (Horizontal Left) */}
              <line x1="780" y1="370" x2="740" y2="370" stroke={activeSimulationStep >= 5 ? '#10B981' : '#334155'} strokeWidth={activeSimulationStep === 5 ? '3' : '2'} strokeDasharray={activeSimulationStep === 5 ? '4 4' : 'none'} markerEnd={activeSimulationStep >= 5 ? 'url(#arrow-active)' : 'url(#arrow)'} />

              {/* 6. Drift -> Store (Horizontal Left) */}
              <line x1="530" y1="370" x2="490" y2="370" stroke={activeSimulationStep >= 6 ? '#10B981' : '#334155'} strokeWidth={activeSimulationStep === 6 ? '3' : '2'} strokeDasharray={activeSimulationStep === 6 ? '4 4' : 'none'} markerEnd={activeSimulationStep >= 6 ? 'url(#arrow-active)' : 'url(#arrow)'} />

              {/* 7. Store -> Alert (Horizontal Left) */}
              <line x1="280" y1="370" x2="240" y2="370" stroke={activeSimulationStep >= 7 ? '#10B981' : '#334155'} strokeWidth={activeSimulationStep === 7 ? '3' : '2'} strokeDasharray={activeSimulationStep === 7 ? '4 4' : 'none'} markerEnd={activeSimulationStep >= 7 ? 'url(#arrow-active)' : 'url(#arrow)'} />
            </svg>

            {/* Nodes Rendered over Canvas */}
            {nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              const isCurrentSim = activeSimulationStep === index;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: '210px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? '#0F1E38' : '#0B1324',
                    border: isCurrentSim
                      ? '2px solid #10B981'
                      : isSelected
                      ? '2px solid #0078D4'
                      : '1px solid #1E293B',
                    boxShadow: isCurrentSim
                      ? '0 0 25px rgba(16, 185, 129, 0.5)'
                      : isSelected
                      ? '0 0 20px rgba(0, 120, 212, 0.4)'
                      : '0 4px 12px rgba(0, 0, 0, 0.6)',
                    cursor: 'pointer',
                    zIndex: isSelected ? 5 : 2,
                    transition: 'all 0.15s ease',
                    overflow: 'hidden'
                  }}
                >
                  {/* Lucid Top Category Header Bar */}
                  <div style={{
                    padding: '0.4rem 0.75rem',
                    background: isSelected ? node.color : 'rgba(255, 255, 255, 0.04)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      color: isSelected ? '#FFFFFF' : node.color,
                      letterSpacing: '0.06em',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      PHASE 0{node.step}
                    </span>
                    <span style={{
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.35rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(0, 0, 0, 0.3)',
                      color: '#FFFFFF'
                    }}>
                      {node.category}
                    </span>
                  </div>

                  {/* Node Body */}
                  <div style={{ padding: '0.85rem' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25 }}>
                      {node.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {node.subtitle}
                    </div>

                    <div style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.65rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.68rem'
                    }}>
                      <span style={{ color: 'var(--text-light)' }}>Status:</span>
                      <span style={{
                        fontWeight: 700,
                        color: isCurrentSim ? '#34D399' : '#38BDF8'
                      }}>
                        {isCurrentSim ? 'Processing ⚡' : node.status}
                      </span>
                    </div>
                  </div>

                  {/* Terminal Pin Anchors (Lucidchart Style) */}
                  <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#38BDF8',
                    border: '1px solid #070B14'
                  }} />
                  <span style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#38BDF8',
                    border: '1px solid #070B14'
                  }} />
                </div>
              );
            })}

          </div>
        </div>

        {/* Right Side: Lucidchart Node Inspector Drawer (Azure Blade Style) */}
        <div style={{
          background: '#0B1120',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem'
        }}>
          
          {selectedNode ? (
            <>
              {/* Drawer Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: selectedNode.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    NODE INSPECTOR • STEP 0{selectedNode.step}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.15rem' }}>
                    {selectedNode.title}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Category: <strong style={{ color: '#FFFFFF' }}>{selectedNode.category}</strong>
                  </div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                  ACTIVE
                </span>
              </div>

              {/* Description */}
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                  Operational Responsibility
                </label>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {selectedNode.description}
                </p>
              </div>

              {/* Node Configuration Key-Values (Azure Blade Properties Table) */}
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                  Configuration Parameters
                </label>
                <div style={{
                  background: '#070B14',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.78rem'
                }}>
                  {Object.entries(selectedNode.config).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>{k}</span>
                      <strong style={{ color: '#38BDF8', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        {Array.isArray(v) ? v.join(', ') : String(v)}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Status Pill */}
              <div style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0, 120, 212, 0.1)',
                border: '1px solid rgba(0, 120, 212, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <Info size={16} color="#38BDF8" />
                <div style={{ fontSize: '0.75rem', color: '#E2E8F0', lineHeight: 1.4 }}>
                  Connected to active monitoring worker pipeline on port <strong>5000</strong>.
                </div>
              </div>

              {/* Action Jump to Real Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    if (selectedNode.step <= 2) onSelectTab('websites');
                    else if (selectedNode.step === 3 || selectedNode.step === 4) onSelectTab('dashboard');
                    else if (selectedNode.step === 5 || selectedNode.step === 6) onSelectTab('contracts');
                    else if (selectedNode.step === 7) onSelectTab('history');
                    else onSelectTab('alerts');
                  }}
                >
                  Jump to {selectedNode.title} Blade <ArrowRight size={13} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              Click any node on the canvas to inspect its configuration parameters.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
