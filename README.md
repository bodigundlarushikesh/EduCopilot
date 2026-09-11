# 🎓 EduCopilot

### AI-Powered Executive Decision Support Platform for School Groups

EduCopilot is a secure, AI-powered decision-support platform designed for school groups and educational organizations.

It provides executives and administrators with a centralized platform to monitor school performance, search approved institutional knowledge, ask questions about school data, identify operational risks, and support data-driven decision-making.

## 🚀 Live Application

**Live Demo:**
https://educopilot-1.onrender.com

**GitHub Repository:**
https://github.com/bodigundlarushikesh/EduCopilot

---

## 📌 Project Overview

Educational organizations manage large amounts of operational and academic information across campuses. Finding the right information quickly and converting it into actionable insights can be difficult.

EduCopilot addresses this problem by bringing important school information into one executive decision-support platform.

The platform combines:

* Executive performance dashboards
* Knowledge search
* Source-verified AI Q&A
* Operational risk identification
* Strategic initiatives tracking
* Campus performance monitoring
* Authentication and role-based information
* PostgreSQL-backed data

The goal is to help school leadership make faster and more informed decisions using approved organizational data.

---

## ✨ Key Features

### 1. 🔐 Authentication

EduCopilot provides a secure authentication system for accessing the platform.

Features include:

* User login
* User registration
* Forgot password flow
* Password reset
* JWT-based authentication
* Active-user validation
* Role information
* Campus information

---

### 2. 📊 Executive Dashboard

The Executive Dashboard provides an overview of school-group performance.

It displays:

* Total Users
* Total Campuses
* Executive Users
* Total Enrolment
* Attendance
* Learning Progress
* Assessment Performance
* Teacher Workload
* Intervention Completion
* Parent Response
* Capacity Utilisation

The dashboard also provides:

* Enrolment and capacity trends
* Attendance trends
* Assessment performance
* Intervention completion
* Campus overview
* Major operational risks
* Strategic initiatives
* AI-generated executive insights

Dashboard data is loaded from PostgreSQL through the Express API.

---

### 3. 🔎 Knowledge Search

Knowledge Search allows users to search approved school documents and policies.

Example knowledge sources include:

* 2026 Admission Policy
* Student Attendance Policy
* Assessment Guidelines 2026
* Teacher Workload Guidelines
* Parent Communication Policy
* Student Intervention Framework

Search results provide information such as:

* Document title
* Document type
* Category
* Source
* Approval status
* Relevance score
* Supporting content

This helps executives quickly find verified institutional information.

---

### 4. 🤖 Executive Q&A

The Executive Q&A module allows users to ask questions about approved school knowledge and operational information.

Example questions:

> What is the student attendance policy?

> What are the expected student attendance requirements?

The system provides:

* AI-generated answer
* Confidence score
* Confidence level
* Source verification
* Supporting sources
* Relevance scores

The Q&A system is designed to ground responses in approved knowledge sources rather than relying only on unsupported information.

---

### 5. ⚠️ Risk & Decision Intelligence

The dashboard highlights important operational risks that may require executive attention.

Examples include:

* Teacher capacity pressure
* Attendance decline
* Parent response below target
* Campus capacity concerns

Each risk can include:

* Risk level
* Description
* Responsible owner

This helps leadership prioritize important issues.

---

### 6. 🎯 Strategic Initiatives

EduCopilot provides visibility into important organizational initiatives.

Examples include:

* Teacher Allocation Optimisation
* Parent Engagement Programme
* Campus Capacity Planning

Each initiative displays its progress and current status.

---

### 7. 🏫 Campus Overview

The platform provides campus-level operational information including:

* Campus name
* Student count
* Attendance
* Capacity utilisation
* Operational status

This allows executives to quickly understand campus performance.

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS
* React Router
* Fetch API

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* Zod
* PostgreSQL Driver (`pg`)
* CORS
* dotenv

### Database

* PostgreSQL

### Deployment

* Render Static Site — Frontend
* Render Web Service — Backend
* Render PostgreSQL — Database

### Version Control

* Git
* GitHub

---

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      User / Admin    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React + Vite UI    │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │
                              REST API Requests
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Node.js + Express  │
                         │       Backend        │
                         └──────────┬───────────┘
                                    │
                   ┌────────────────┼────────────────┐
                   │                │                │
                   ▼                ▼                ▼
              Authentication   Dashboard API   Knowledge / Q&A
                   │                │                │
                   └────────────────┼────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      PostgreSQL      │
                         │       Database       │
                         └──────────────────────┘
```

---

## 📁 Project Structure

```text
EduCopilot/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── knowledgeController.js
│   │   └── qaController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── knowledgeRoutes.js
│   │   └── qaRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── seedUser.js
│   ├── resetPassword.js
│   └── server.js
│
├── public/
│
├── src/
│   ├── componets/
│   │   ├── ProtectedRoute.jsx
│   │   └── layout/
│   │       └── AppLayout.jsx
│   │
│   ├── data/
│   │   ├── dashboardData.js
│   │   ├── knowledgeData.js
│   │   ├── qaData.js
│   │   ├── scenarioData.js
│   │   ├── briefingData.js
│   │   └── decisionData.js
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Dashboard.jsx
│   │   ├── KnowledgeSearch.jsx
│   │   ├── ExecutiveQA.jsx
│   │   ├── ScenarioBuilder.jsx
│   │   ├── Briefings.jsx
│   │   ├── DecisionsActions.jsx
│   │   ├── Recommendations.jsx
│   │   ├── ReportsAnalytics.jsx
│   │   ├── Notifications.jsx
│   │   ├── UsersRoles.jsx
│   │   ├── AuditLogs.jsx
│   │   └── Settings.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env.production
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🗄️ Database

EduCopilot uses PostgreSQL for persistent application data.

The database contains information related to:

* Users
* Roles
* Campuses
* Dashboard metrics
* Knowledge documents
* School policies
* Operational information

The production database is hosted using Render PostgreSQL.

---

## 🔑 Authentication Flow

```text
User
  │
  ▼
Login Form
  │
  ▼
POST /api/auth/login
  │
  ▼
Express Backend
  │
  ▼
PostgreSQL
  │
  ▼
Validate User
  │
  ▼
Generate JWT
  │
  ▼
Frontend
  │
  ▼
Protected Application
```

Protected API requests use the JWT token:

```text
Authorization: Bearer <token>
```

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/login
POST /api/auth/register
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Dashboard

```text
GET /api/dashboard
```

### Knowledge

```text
GET /api/knowledge
```

### Executive Q&A

```text
POST /api/qa
```

### Health Check

```text
GET /api/health
```

---

## ⚙️ Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/bodigundlarushikesh/EduCopilot.git
```

```bash
cd EduCopilot
```

---

### 2. Install frontend dependencies

```bash
npm install
```

---

### 3. Install backend dependencies

```bash
cd backend
npm install
```

---

### 4. Configure environment variables

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=educopilot
DB_PASSWORD=your_database_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

For the frontend production environment:

```env
VITE_API_URL=https://educopilot.onrender.com
```

Do not commit real passwords, database credentials, or private secrets.

---

### 5. Start the backend

From the `backend` directory:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

### 6. Start the frontend

Open another terminal:

```bash
npm run dev
```

Vite will provide the local frontend URL.

---

## ☁️ Deployment

The application is deployed using Render.

### Frontend

```text
Render Static Site
        │
        ▼
React + Vite
        │
        ▼
EduCopilot Frontend
```

### Backend

```text
Render Web Service
        │
        ▼
Node.js + Express
        │
        ▼
REST API
```

### Database

```text
Render PostgreSQL
        │
        ▼
Application Data
```

---

## 🔒 Security

The project includes several security-related features:

* JWT-based authentication
* Password hashing with bcryptjs
* Protected routes
* Authentication middleware
* Environment variables for secrets
* PostgreSQL-backed user management
* Approved-source approach for knowledge and Q&A
* CORS configuration

Sensitive configuration values should always be stored in environment variables rather than committed to GitHub.

---

## 📈 Current MVP Capabilities

The current deployed MVP successfully demonstrates:

* User authentication
* PostgreSQL integration
* Executive dashboard
* Live dashboard metrics
* Knowledge search
* Source-verified Q&A
* Operational risks
* Strategic initiatives
* Campus overview
* AI executive insights
* Production deployment

---

## 🔮 Future Enhancements

Potential future improvements include:

* Advanced RAG pipeline
* Vector database integration
* Gemini/LLM integration with stronger grounding
* Backend-enforced role-based access control
* Real-time audit logging
* Email notifications
* Report exports
* Advanced scenario simulation
* Automated executive briefings
* Advanced analytics
* Docker deployment
* Monitoring and observability
* Automated database backups and disaster recovery
* Improved handling of unsupported Q&A questions

---

## 🎯 Project Objective

The main objective of EduCopilot is to provide school leadership with a centralized platform that converts institutional data and approved knowledge into useful executive insights.

Instead of searching through multiple documents and systems, administrators can use one platform to:

```text
Monitor → Search → Ask → Analyze → Decide
```

This enables faster, more informed, and data-driven decision-making across school groups.

---

## 👨‍💻 Developer

**Rushikesh Bodigundla**

GitHub:
https://github.com/bodigundlarushikesh/EduCopilot

---

## 🌐 Links

**Live Application:**
https://educopilot-1.onrender.com

**GitHub Repository:**
https://github.com/bodigundlarushikesh/EduCopilot

---

## 📄 License

This project is developed as an educational/MVP project.
