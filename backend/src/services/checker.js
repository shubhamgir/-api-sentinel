const axios = require('axios');

/**
 * Execute HTTP check against a target endpoint with exponential backoff retries.
 * @param {Object} endpoint
 * @returns {Promise<Object>} checkResult
 */
async function executeCheck(endpoint) {
  const {
    id: endpointId,
    url,
    method = 'GET',
    headers = {},
    payload = null,
    expectedStatus = 200,
    timeoutMs = 3000,
    retryCount = 2
  } = endpoint;

  let attempt = 0;
  let lastError = null;
  let response = null;
  let latencyMs = 0;
  let status = null;
  let responseData = null;
  let isTransientFailure = false;

  const maxAttempts = Math.max(1, (retryCount || 0) + 1);

  while (attempt < maxAttempts) {
    attempt++;
    const startTime = process.hrtime();

    try {
      const requestHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        ...(headers || {})
      };

      const axiosConfig = {
        url,
        method,
        headers: requestHeaders,
        data: payload,
        timeout: timeoutMs,
        validateStatus: () => true // Capture all HTTP status codes without throwing immediately
      };

      response = await axios(axiosConfig);
      const diff = process.hrtime(startTime);
      latencyMs = Math.round((diff[0] * 1000) + (diff[1] / 1e6));
      status = response.status;
      responseData = response.data;

      // Check if status matches expected or if it's a 5xx server error that should trigger retry
      if (status === expectedStatus || (status >= 200 && status < 300)) {
        // Success
        lastError = null;
        break;
      } else if (status >= 500 && attempt < maxAttempts) {
        // 5xx Server Error - candidate for transient retry
        isTransientFailure = true;
        lastError = `HTTP Status ${status} (Expected ${expectedStatus})`;
        const backoffMs = Math.min(1000, Math.pow(2, attempt - 1) * 200);
        await new Promise(res => setTimeout(res, backoffMs));
      } else {
        lastError = `HTTP Status ${status} (Expected ${expectedStatus})`;
        break;
      }
    } catch (err) {
      const diff = process.hrtime(startTime);
      latencyMs = Math.round((diff[0] * 1000) + (diff[1] / 1e6));
      
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        lastError = `Timeout after ${timeoutMs}ms`;
      } else if (err.code === 'ECONNREFUSED') {
        lastError = 'Connection Refused';
      } else {
        lastError = err.message || 'Network Request Failed';
      }

      isTransientFailure = true;

      if (attempt < maxAttempts) {
        const backoffMs = Math.min(1000, Math.pow(2, attempt - 1) * 200);
        await new Promise(res => setTimeout(res, backoffMs));
      }
    }
  }

  const isSuccess = !lastError && (status === expectedStatus || (status >= 200 && status < 300));

  return {
    endpointId,
    endpointName: endpoint.name,
    url,
    method,
    status,
    expectedStatus,
    latencyMs,
    success: isSuccess,
    errorMessage: lastError,
    retryAttempts: attempt - 1,
    wasRetried: attempt > 1,
    responseData,
    responseHeaders: response ? response.headers : null,
    checkedAt: new Date().toISOString()
  };
}

module.exports = { executeCheck };
