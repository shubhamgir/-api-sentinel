const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, verbose: true, strict: false });
addFormats(ajv);

/**
 * Validate response payload against JSON Schema and detect structural drift.
 * @param {Object} responseData
 * @param {Object} schema
 * @returns {Object} validationResult
 */
function validateContract(responseData, schema) {
  if (!schema) {
    return {
      valid: true,
      hasDrift: false,
      driftSummary: 'No contract registered for endpoint',
      diffs: []
    };
  }

  if (responseData === null || responseData === undefined) {
    return {
      valid: false,
      hasDrift: true,
      driftSummary: 'Response payload is empty or null',
      diffs: [
        {
          type: 'NULL_VIOLATION',
          path: 'root',
          message: 'Expected non-null response payload but received null/empty',
          severity: 'HIGH'
        }
      ]
    };
  }

  let validateFn;
  try {
    validateFn = ajv.compile(schema);
  } catch (err) {
    return {
      valid: false,
      hasDrift: true,
      driftSummary: `Invalid JSON Schema definition: ${err.message}`,
      diffs: [
        {
          type: 'INVALID_SCHEMA',
          path: 'root',
          message: err.message,
          severity: 'CRITICAL'
        }
      ]
    };
  }

  const isValid = validateFn(responseData);
  const diffs = [];

  if (!isValid && validateFn.errors) {
    for (const err of validateFn.errors) {
      let driftType = 'TYPE_MISMATCH';
      let severity = 'MEDIUM';
      const path = err.instancePath || 'root';

      if (err.keyword === 'required') {
        driftType = 'MISSING_FIELDS';
        severity = 'HIGH';
      } else if (err.keyword === 'type') {
        driftType = 'TYPE_MISMATCH';
        severity = 'HIGH';
      } else if (err.keyword === 'enum') {
        driftType = 'ENUM_MISMATCH';
        severity = 'MEDIUM';
      }

      diffs.push({
        type: driftType,
        path: path + (err.params && err.params.missingProperty ? `/${err.params.missingProperty}` : ''),
        message: err.message,
        schemaRule: `${err.keyword}: ${JSON.stringify(err.params)}`,
        actualValue: err.data !== undefined ? JSON.stringify(err.data) : 'N/A',
        severity
      });
    }
  }

  // Deep structural analysis for unexpected fields if schema specifies properties
  const customDriftDiffs = detectUnexpectedFields(responseData, schema, '');
  diffs.push(...customDriftDiffs);

  const hasDrift = diffs.length > 0;
  const driftTypes = [...new Set(diffs.map(d => d.type))].join(', ');
  const driftSummary = hasDrift
    ? `Detected ${diffs.length} schema drift issue(s): [${driftTypes}]`
    : 'Response strictly conforms to API contract schema';

  return {
    valid: isValid && diffs.filter(d => d.severity === 'HIGH' || d.severity === 'CRITICAL').length === 0,
    hasDrift,
    driftSummary,
    diffs
  };
}

/**
 * Traverse payload and schema to identify un-declared extra properties (Schema Drift)
 */
function detectUnexpectedFields(data, schema, currentPath) {
  const extraDiffs = [];
  if (!schema || typeof schema !== 'object' || !data || typeof data !== 'object') {
    return extraDiffs;
  }

  if (schema.type === 'object' && schema.properties) {
    const expectedKeys = Object.keys(schema.properties);
    const actualKeys = Object.keys(data);

    for (const key of actualKeys) {
      const fieldPath = currentPath ? `${currentPath}.${key}` : key;
      if (!expectedKeys.includes(key)) {
        extraDiffs.push({
          type: 'UNEXPECTED_FIELDS',
          path: fieldPath,
          message: `Property '${key}' was added to response but is not defined in contract schema`,
          severity: 'LOW',
          actualValue: typeof data[key] === 'object' ? JSON.stringify(data[key]) : String(data[key])
        });
      } else {
        // Recurse into nested objects
        if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
          const nested = detectUnexpectedFields(data[key], schema.properties[key], fieldPath);
          extraDiffs.push(...nested);
        }
      }
    }
  }

  return extraDiffs;
}

module.exports = { validateContract };
