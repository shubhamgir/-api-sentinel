import React, { useState } from 'react';
import { FileCode, AlertOctagon, CheckCircle2, Save } from 'lucide-react';

export default function ContractDriftInspector({ endpoints, contracts, onSaveContract }) {
  const [selectedEndpointId, setSelectedEndpointId] = useState(endpoints[0]?.id || '');
  const [isEditingSchema, setIsEditingSchema] = useState(false);

  const selectedEndpoint = endpoints.find(e => e.id === selectedEndpointId) || endpoints[0];
  const currentContract = contracts.find(c => c.endpointId === selectedEndpointId);

  const [schemaText, setSchemaText] = useState(
    currentContract ? JSON.stringify(currentContract.schema, null, 2) : '{\n  "type": "object"\n}'
  );

  const handleSelectEndpoint = (id) => {
    setSelectedEndpointId(id);
    const contract = contracts.find(c => c.endpointId === id);
    setSchemaText(contract ? JSON.stringify(contract.schema, null, 2) : '{\n  "type": "object"\n}');
    setIsEditingSchema(false);
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(schemaText);
      onSaveContract({
        endpointId: selectedEndpointId,
        name: `${selectedEndpoint?.name || 'API'} Schema`,
        schema: parsed
      });
      setIsEditingSchema(false);
      alert('Contract schema updated successfully!');
    } catch (err) {
      alert(`Invalid JSON format: ${err.message}`);
    }
  };

  // Mock latest check for payload preview
  const lastCheck = selectedEndpoint?.recentChecks?.[0] || null;
  const driftDetails = selectedEndpoint?.recentChecks?.[0]?.contractValidation || null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>API Contract & Schema Drift Inspector</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Compare OpenAPI / JSON Schema contracts with observed live API responses to detect structural drift.
          </p>
        </div>

        {/* Endpoint Selector Dropdown */}
        <select
          className="form-select"
          style={{ maxWidth: '320px', fontWeight: 600 }}
          value={selectedEndpointId}
          onChange={(e) => handleSelectEndpoint(e.target.value)}
        >
          {endpoints.map(ep => (
            <option key={ep.id} value={ep.id}>
              {ep.name} {ep.hasDrift ? ' (DRIFTED)' : ''}
            </option>
          ))}
        </select>
      </div>

      {selectedEndpoint && (
        <div>
          {/* Drift Status Banner */}
          <div className="card" style={{ marginBottom: '1.5rem', background: selectedEndpoint.hasDrift ? 'var(--purple-bg)' : 'var(--success-bg)', borderColor: selectedEndpoint.hasDrift ? '#DDD6FE' : 'var(--success-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '50%', background: selectedEndpoint.hasDrift ? 'var(--purple)' : 'var(--success)', color: 'white' }}>
                {selectedEndpoint.hasDrift ? <AlertOctagon size={24} /> : <CheckCircle2 size={24} />}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: selectedEndpoint.hasDrift ? 'var(--purple-text)' : 'var(--success-text)' }}>
                  {selectedEndpoint.hasDrift ? 'Schema Drift Detected' : 'Strict Contract Compliance'}
                </h3>
                <p style={{ fontSize: '0.875rem', color: selectedEndpoint.hasDrift ? 'var(--purple-text)' : 'var(--success-text)', opacity: 0.9 }}>
                  {driftDetails ? driftDetails.driftSummary : 'No drift issues found in recent checks.'}
                </p>
              </div>
            </div>

            {/* List specific diff items if drift exists */}
            {selectedEndpoint.hasDrift && driftDetails?.diffs && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #DDD6FE' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--purple-text)', marginBottom: '0.5rem' }}>
                  Identified Structural Differences:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {driftDetails.diffs.map((diff, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-card)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #E9D5FF', fontSize: '0.85rem' }}>
                      <span className={`diff-tag ${diff.type === 'UNEXPECTED_FIELDS' ? 'diff-tag-added' : diff.type === 'MISSING_FIELDS' ? 'diff-tag-missing' : 'diff-tag-mismatch'}`}>
                        {diff.type}
                      </span>
                      <strong style={{ marginLeft: '0.5rem' }}>{diff.path}</strong>: {diff.message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side-by-Side Schema vs Observed Response Viewer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            {/* Expected Schema Box */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <FileCode size={18} color="var(--primary)" />
                  Registered JSON Schema / OpenAPI Contract
                </div>
                <div>
                  {isEditingSchema ? (
                    <button className="btn btn-primary btn-sm" onClick={handleSave}>
                      <Save size={14} /> Save
                    </button>
                  ) : (
                    <button className="btn btn-outline btn-sm" onClick={() => setIsEditingSchema(true)}>
                      Edit Schema
                    </button>
                  )}
                </div>
              </div>

              {isEditingSchema ? (
                <textarea
                  className="form-textarea font-mono"
                  rows={16}
                  style={{ background: '#0F172A', color: '#38BDF8', fontSize: '0.85rem' }}
                  value={schemaText}
                  onChange={(e) => setSchemaText(e.target.value)}
                />
              ) : (
                <div className="code-box">
                  <pre>{schemaText}</pre>
                </div>
              )}
            </div>

            {/* Observed Response Box */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <FileCode size={18} color="var(--accent)" />
                  Latest Observed Response Payload
                </div>
                <span className="badge badge-subtle">
                  Latency: {lastCheck ? `${lastCheck.latencyMs}ms` : 'N/A'}
                </span>
              </div>

              <div className="code-box">
                <pre>
                  {lastCheck && lastCheck.responseData
                    ? JSON.stringify(lastCheck.responseData, null, 2)
                    : '// No response payload captured yet.\n// Trigger a check from the Endpoints tab.'}
                </pre>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
