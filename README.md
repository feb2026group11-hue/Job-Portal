# Job Portal Project Development Workflow - July 28, 2026

This documentation covers the detailed implementation and workflow of today's development on both the backend microservices and the candidate frontend dashboard.

---

## 1. Backend: Job Application Microservice (`job-application-service`)
We designed and implemented a brand new Spring Boot microservice to manage jobs, job status mappings, job applications, and portal messaging records.

### Tech Stack:
- Java 21, Spring Boot `3.3.1`
- Spring Data JPA
- Spring Web, Spring Validation
- MySQL Connector

### Implementation Details:
* **Models & Entity Mappings** (`com.jobportal.jobapp.entities`):
  - `Job`: Maps to `job` table (details titles, location, type enums, salary, descriptions, and employer relationships).
  - `JobApplication`: Maps to `job_application` table (joins candidate profiles, jobs, resumes, and tracking statuses).
  - `JobStatus`: Maps to `job_status` table (holds status IDs: `1` = Applied, `2` = Shortlisted, `3` = Accepted, `4` = Rejected).
  - `Message`: Maps to `message` table (records chat and communication history).
* **Repositories** (`com.jobportal.jobapp.repository`):
  - Created query methods for candidate applications and job postings.
* **Service Implementations** (`com.jobportal.jobapp.service`):
  - `JobServiceImpl`: CRUD logic for posting, editing, retrieving, and deleting jobs.
  - `JobApplicationServiceImpl`: Handles submitting applications, status transitions, and duplicate prevention.
  - `MessageServiceImpl`: Logs and retrieves chat history between users.
* **REST Controllers** (`com.jobportal.jobapp.controllers`):
  - Exposes endpoints under `/api/jobs`, `/api/applications`, and `/api/messages`.
* **Global Handler**:
  - `GlobalExceptionHandler`: Returns standardized error formats for invalid request payloads or missing database resource identifiers.

### Compilation status:
Successfully compiled using:
```bash
cd backend/job-application-service
mvn clean compile
```

---

## 2. API Gateway Routing
We mapped the gateway routes to support the new microservices architecture.
* **Modifications in API Gateway**:
  - Configured `GatewayController.java` to forward `/api/jobs/**`, `/api/applications/**`, and `/api/job-status/**` requests to the new service port `8083`.
  - Configured `/api/employers/**` requests to point to port `8085`.
* **Branch Safety**:
  - Stashed the `ApiGateway` changes locally to avoid conflicts and allow testing on individual ports before full deployment. Stash ID: `stash@{0}`.

---

## 3. Frontend: Candidate Dashboard Pages
We created and styled five premium pages under `client/src/Pages/Candidate/` using Material-UI, with custom HSL tailored colors and premium layouts.

### New Components:
1. **Home (`Home.jsx`)**:
   - Welcome banner featuring HSL linear gradients.
   - Live summary metrics (Applications count, Bookmarked jobs, and Open vacancies).
   - Dynamic profile tracker and recent job posts table.
2. **Jobs Board (`Jobs.jsx`)**:
   - Search search bar, location input, and job type dropdown.
   - Applies logic to bookmark jobs in local storage and apply to jobs directly.
3. **Saved Jobs (`SavedJobs.jsx`)**:
   - Lists candidate bookmarks from local storage.
   - Quick buttons to apply or unbookmark.
4. **Applied Tracker (`AppliedJobs.jsx`)**:
   - Fetches historical applications from the microservice.
   - Displays linear step progress: *Applied &rarr; Shortlisted &rarr; Final Decision*.
5. **Verified Companies (`Companies.jsx`)**:
   - Lists verified recruiters, categories, and contacts by calling the employer service on port `8085`.

### Route Integration:
Lazily imported and mapped the subroutes under `/dashboard/candidate/*` in [RoutingFile.jsx](file:///f:/Job-Portal/client/src/RouteFile/RoutingFile.jsx):
```javascript
const CandidateHome = React.lazy(() => import("../Pages/Candidate/Home"));
const CandidateJobs = React.lazy(() => import("../Pages/Candidate/Jobs"));
const CandidateSavedJobs = React.lazy(() => import("../Pages/Candidate/SavedJobs"));
const CandidateAppliedJobs = React.lazy(() => import("../Pages/Candidate/AppliedJobs"));
const CandidateCompanies = React.lazy(() => import("../Pages/Candidate/Companies"));
```

---

## 4. Verification and Port Mapping
To allow local development without the API Gateway, services are configured to communicate directly on dedicated ports:

| Service | Port | Folder Path |
| :--- | :--- | :--- |
| **Authentication Service** | `8081` | `backend/authentication-service` |
| **Candidate Profile Service** | `8082` | `backend/candidate-profile-service` |
| **Job Application Service** | `8083` | `backend/job-application-service` |
| **Employer Profile Service** | `8085` | `backend/employer-profile-service` |
| **Vite Frontend Client** | `5173` | `client` |

### Production Build Test:
Verified compilation of client side with:
```bash
cd client
npm run build
```
Status: **`SUCCESS`** (completed chunks output without warnings).
