# API Sentinel 🛡️
### Automated API Monitoring, Contract Validation & Reliability Platform

**API Sentinel** is an end-to-end developer-focused API reliability platform that continuously monitors REST API endpoints for availability, response-time degradation, HTTP status failures, and OpenAPI/JSON schema contract drift.

---

## 🔗 GitHub Repository
**[https://github.com/shubhamgir/-api-sentinel](https://github.com/shubhamgir/-api-sentinel)**

---

## 🌟 Key Architecture & Modules (All Checklist Features)

- 🌐 **Websites & Multi-Project Hierarchy**: Group endpoints under website projects (e.g. `website/id=web-6789`, name, description, SLA) with granular route response-time latency tracking.
- 📡 **35+ Full REST API Routes**: Complete suites covering `GET`, `POST`, `PUT`, `DELETE`, `PATCH` across Websites, Endpoints, Monitoring, Contracts, Alerts, Analytics, and Mock targets.
- 🚦 **BullMQ / In-Memory Job Queue**: Asynchronous background queue engine with concurrency limits, worker metrics, and duplicate job suppression.
- 🔄 **Exponential Backoff Retry Engine**: Automatic retry handling for transient 5xx / network failures before triggering alerts.
- 🔍 **Contract & Schema Drift Detection**: AJV JSON Schema validator with structural diff analysis for `MISSING_FIELDS`, `UNEXPECTED_FIELDS`, and `TYPE_MISMATCH`.
- 🔕 **Noisy Alert Suppression & Cooldown**: Configurable cooldown window prevents notification fatigue during prolonged outages.
- 🔔 **Pluggable Alert Adapters**: Webhook and Email dispatchers with historical log streaming.
- 📈 **Time-Series Latency & Uptime Storage**: Real-time calculations of p50, p90, p99 percentiles and uptime percentages.
- 🐳 **Docker Packaging & Compose**: Production-ready `Dockerfile` (Backend & Frontend) and `docker-compose.yml`.
- ⚙️ **CI Pipeline**: Automated GitHub Actions `.github/workflows/ci.yml` build, lint, and container test pipeline.
- 📖 **Interactive API Documentation**: Live OpenAPI 3.0 catalog with 35+ routes at `/api/docs` and interactive in-app Docs explorer.
- 🎨 **Modern Light Theme Design**: Polished dashboard with soft slate background (`#F8FAFC`), white cards, and vibrant pastel status tags.

---

## 🏗️ Technology Stack

- **Backend**: Node.js, Express.js (35+ REST routes), BullMQ-style Job Queue, Axios, Ajv, Ajv-Formats, JSON DB
- **Frontend**: Vite, React 18, Lucide Icons, Custom Light Theme Design System
- **DevOps**: Docker, Docker Compose, Nginx, GitHub Actions CI

---

## 🚀 Getting Started

### 1. Run with Docker Compose
```bash
docker compose up --build
```
- Frontend: `http://localhost:80` (or `http://localhost:5173` via Vite)
- Backend: `http://localhost:5000`

### 2. Run Locally
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

---

## 📡 REST API Catalog (35+ Endpoints)

| Module | Method | Route | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | POST | `/api/auth/register` | Register new user |
| **Auth** | POST | `/api/auth/login` | Authenticate & get JWT token |
| **Auth** | GET | `/api/auth/me` | Fetch active user profile |
| **Websites** | GET | `/api/websites` | List website projects |
| **Websites** | GET | `/api/websites/:id` | Get website by ID (e.g. `web-6789`) |
| **Websites** | POST | `/api/websites` | Create website with ID, name, description |
| **Websites** | PUT | `/api/websites/:id` | Update website metadata |
| **Websites** | DELETE | `/api/websites/:id` | Delete website and unlink routes |
| **Websites** | POST | `/api/websites/:id/endpoints` | Add endpoint directly to website |
| **Endpoints**| GET | `/api/endpoints` | List all monitored endpoints |
| **Endpoints**| GET | `/api/endpoints/:id` | Get single endpoint with logs |
| **Endpoints**| POST | `/api/endpoints` | Register target endpoint |
| **Endpoints**| PUT | `/api/endpoints/:id` | Update endpoint configuration |
| **Endpoints**| DELETE| `/api/endpoints/:id` | Delete endpoint and history |
| **Endpoints**| PATCH| `/api/endpoints/:id/toggle` | Toggle monitoring active/paused |
| **Monitoring**| POST | `/api/monitoring/start` | Trigger global monitoring cycle |
| **Monitoring**| GET | `/api/monitoring/status/:id` | Check current health & drift |
| **Monitoring**| GET | `/api/monitoring/history/:id`| Get time-series check history |
| **Monitoring**| GET | `/api/monitoring/history` | Query all global check logs |
| **Monitoring**| POST | `/api/monitoring/check-now/:id`| Trigger instant check with retry |
| **Contracts** | GET | `/api/contracts` | List all schema contracts |
| **Contracts** | POST | `/api/contracts` | Save JSON Schema contract |
| **Contracts** | GET | `/api/contracts/:id` | Retrieve contract by endpoint ID |
| **Contracts** | POST | `/api/contracts/validate-test` | Test payload against schema |
| **Alerts** | POST | `/api/alerts/configure` | Set alert rule & cooldown window |
| **Alerts** | GET | `/api/alerts` | List alert configurations |
| **Alerts** | GET | `/api/alerts/logs` | Fetch dispatch logs |
| **Alerts** | POST | `/api/alerts/test` | Test webhook / email dispatch |
| **Analytics**| GET | `/api/analytics/uptime` | System & endpoint uptime % |
| **Analytics**| GET | `/api/analytics/latency` | Avg, p50, p90, p99 latencies |
| **Analytics**| GET | `/api/analytics/failures` | Failure category breakdown |
| **Analytics**| GET | `/api/analytics/summary` | Executive summary metrics |
| **Queue** | GET | `/api/queue/metrics` | BullMQ queue depth & worker stats |
| **Queue** | POST | `/api/queue/clear-completed` | Clear completed job cache |
| **Targets** | GET, POST, PUT, DELETE | `/api/mock/users` | User microservice CRUD |
| **Targets** | GET, POST, DELETE | `/api/mock/orders` | Order microservice (flaky retry) |
| **Targets** | GET, POST | `/api/mock/payment-info` | Payment Gateway (schema drift) |
| **Targets** | GET, POST, PUT, DELETE | `/api/mock/products` | Products catalog CRUD |
| **Targets** | GET | `/api/mock/slow-inventory` | Slow latency endpoint (1800ms) |
| **Targets** | POST | `/api/mock/toggle-drift` | Toggle schema drift injection |
| **Docs** | GET | `/api/docs` | OpenAPI 3.0 specification |

---

## 👤 Author
**Shubham Giri**
