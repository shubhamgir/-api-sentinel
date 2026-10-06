# API Sentinel 🛡️
### Automated API Monitoring, Contract Validation & Reliability Platform

**API Sentinel** is an end-to-end developer-focused API reliability platform that continuously monitors REST API endpoints for availability, response-time degradation, HTTP status failures, and OpenAPI/JSON schema contract drift.

---

## 🌟 Key Features

- 📡 **API Endpoint Registration**: Full CRUD for REST endpoints with configurable HTTP methods, custom headers, payload body, expected status code, timeout, check interval, and retries.
- 🔄 **Automated Background Scheduler**: Asynchronous background health check execution with **Exponential Backoff Retry** handling transient network failures.
- 🔍 **OpenAPI & JSON Schema Drift Detection**: AJV-powered validator comparing actual response payloads against target contracts. Identifies missing fields (`MISSING_FIELDS`), new unannounced fields (`UNEXPECTED_FIELDS`), data type mismatches (`TYPE_MISMATCH`), and null violations.
- 📈 **Time-Series Analytics**: Aggregates system uptime percentages, average latency, latency percentiles (p50, p90, p99), and categorized failure metrics.
- 🔔 **Multi-Channel Alert Adapters**: Pluggable Webhook and Email adapters triggering notifications on status failures, high latency timeouts, or contract drift.
- 🧪 **Built-in Mock Test Suite**: Interactive out-of-the-box target APIs (Healthy Users, Flaky Orders, Schema Drifted Payment, Slow Inventory) with one-click drift toggling.
- 🎨 **Modern Light Theme Design System**: Sleek glassmorphism navigation bar, alabaster background (`#F8FAFC`), crisp white cards, and pastel status indicators.

---

## 🏗️ Technology Stack

- **Backend**: Node.js, Express.js, REST APIs, Axios, Ajv, Ajv-Formats, JSON Storage
- **Frontend**: Vite, React 18, Lucide Icons, Modern Vanilla CSS Light Theme

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
The backend server runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The dashboard runs on `http://localhost:5173`.

---

## 📡 REST API Structure

- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
- **Endpoints**: `GET /api/endpoints`, `POST /api/endpoints`, `PUT /api/endpoints/:id`, `DELETE /api/endpoints/:id`, `PATCH /api/endpoints/:id/toggle`
- **Monitoring**: `POST /api/monitoring/start`, `GET /api/monitoring/status/:id`, `GET /api/monitoring/history/:id`, `POST /api/monitoring/check-now/:id`
- **Contracts**: `POST /api/contracts`, `GET /api/contracts/:id`, `POST /api/contracts/validate-test`
- **Alerts**: `POST /api/alerts/configure`, `GET /api/alerts`, `POST /api/alerts/test`
- **Analytics**: `GET /api/analytics/uptime`, `GET /api/analytics/latency`, `GET /api/analytics/failures`

---

## 👤 Author
**Shubham Giri**
