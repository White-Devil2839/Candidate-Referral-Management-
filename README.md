# Candidate Referral Management System

A full-stack MERN application for managing candidate referrals in a recruitment workflow. The system enables team members to submit candidate referrals, track their progress through hiring stages, and provides role-based access control for administrators and recruiters.

## Project Overview

This system addresses the need for organizations to efficiently manage employee-referred candidates. It provides a centralized platform where:

- Recruiters can submit and track candidates they have referred
- Administrators have oversight of all referrals and recruiter performance
- Candidates move through defined workflow stages (Pending, Reviewed, Hired)
- Analytics provide insights into referral pipeline health and individual recruiter effectiveness

## Features Implemented

### Core Functionality
- User authentication using JSON Web Tokens (JWT)
- Role-Based Access Control (RBAC) with Admin and Recruiter roles
- Full CRUD operations for candidate management
- Candidate status workflow: Pending → Reviewed → Hired
- Resource ownership enforcement (recruiters manage only their referrals)
- Search and filter capabilities by job title
- Status-based tabbed navigation

### Analytics & Reporting
- Real-time dashboard with Recharts visualization
- Candidate status distribution (pie chart)
- Individual recruiter performance metrics (bar chart)
- System-wide statistics and top performer rankings

### User Experience
- Enterprise-grade, calm UI design (Linear/GitHub/Stripe style)
- Responsive layout for desktop and mobile
- Candidate detail modal with comprehensive information
- Password visibility toggle on authentication forms
- Form validation with error handling

### Data Management
- Comprehensive database seeding script
- Realistic demo data (60 candidates, 4 users)
- Automated distribution of candidates across recruiters

### Beyond Assignment Scope

**Role-Based Access Control (RBAC):** Implemented to demonstrate real-world application security patterns. In production recruitment systems, different roles require different levels of access to sensitive candidate data.

**Analytics Dashboard:** Added to showcase data visualization capabilities and provide actionable insights that would be valuable in a production environment, helping organizations track referral program effectiveness.

## Tech Stack

### Frontend
- React 18.3
- Axios (HTTP client)
- Recharts (data visualization)
- React Router DOM (navigation)
- jwt-decode (token parsing)
- Vite (build tool)

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- bcrypt.js for password hashing
- CORS enabled for cross-origin requests

## Project Structure

```
candidate-referral-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React context (AuthContext)
│   │   ├── api.js         # Axios instance and API calls
│   │   └── index.css      # Global styles
│   └── README.md          # Frontend-specific documentation
│
├── server/                # Express backend
│   ├── src/
│   │   ├── models/       # Mongoose schemas
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Auth & RBAC middleware
│   │   ├── routes/       # API routes
│   │   └── config/       # Database configuration
│   ├── seed.js           # Database seeding script
│   └── README.md         # Backend-specific documentation
│
└── README.md             # This file
```

## API Documentation

A Postman collection is provided for testing all API endpoints.

**File:** `Candidate-Referral-System.postman_collection.json`

**To use:**
1. Open Postman
2. Click "Import" in the top-left
3. Select the collection file
4. The collection includes all authentication, candidate, and analytics endpoints
5. Use the authentication endpoint first to obtain a JWT token
6. Set the token in the Authorization header for subsequent requests

## Running the Project Locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm package manager

### Setup Instructions

**1. Clone the repository**
```bash
git clone <repository-url>
cd candidate-referral-system
```

**2. Backend Setup**
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```
PORT=5002
MONGO_URI=mongodb://localhost:27017/candidate-referral
JWT_SECRET=your_jwt_secret_key_here
```

For MongoDB Atlas, replace `MONGO_URI` with your connection string.

**3. Database Seeding (Optional but Recommended)**
```bash
node seed.js
```

This populates the database with:
- 1 admin user
- 3 recruiter users
- 60 sample candidates

**4. Start the Backend**
```bash
npm start
```

Backend runs on: `http://localhost:5002`

**5. Frontend Setup**

Open a new terminal:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```
VITE_API_BASE_URL=http://localhost:5002
```

**6. Start the Frontend**
```bash
npm run dev
```

Frontend runs on: `http://localhost:3000` or `http://localhost:5173`

## Test Credentials

After running the seed script, use these credentials:

**Administrator Account:**
- Email: `admin@example.com`
- Password: `admin123`
- Access: Full system access, all candidates, recruiter analytics

**Recruiter Accounts:**
- Alice: `alice@example.com` / `alice123` (22 referrals)
- Bob: `bob@example.com` / `bob123` (20 referrals)
- Carol: `carol@example.com` / `carol123` (18 referrals)
- Access: Own referrals only, personal statistics

## Assumptions & Limitations

### Not Implemented
- **Resume Upload:** The system includes a resume field in the schema but does not implement file upload functionality. In production, this would integrate with cloud storage (AWS S3, Cloudinary).
- **Email Notifications:** Status change notifications are not sent to candidates or recruiters.
- **User Management UI:** Admins cannot create or manage user accounts through the interface. User creation requires direct database access or API calls.

### Access Control
- **Recruiter Permissions:** Recruiters can only view, edit, and delete their own referrals. Access to other recruiters' candidates is denied at the middleware level.
- **Security:** All authorization logic is enforced on the backend. Frontend UI restrictions are for user experience only and are not security controls.

### Data Validation
- Basic input validation is implemented on both frontend and backend
- Production deployments would require additional validation rules
- Email format validation is present but email verification is not implemented

## Live Demo

Frontend deployment: [https://candidate-referral-management-phi.vercel.app/](https://candidate-referral-management-phi.vercel.app/)

Backend API: [https://candidate-referral-management-h2ix.onrender.com](https://candidate-referral-management-h2ix.onrender.com)
