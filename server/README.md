# Candidate Referral Management System - Backend

A simple, beginner-friendly backend for managing candidate referrals built with Node.js, Express, MongoDB, and JWT authentication.

## Project Structure

```
server/
├── src/
│   ├── db.js                      # MongoDB connection
│   ├── server.js                  # Main Express server
│   ├── models/
│   │   ├── User.js               # User model with password hashing
│   │   └── Candidate.js          # Candidate model
│   ├── controllers/
│   │   ├── authController.js     # Registration and login logic
│   │   └── candidateController.js # CRUD operations for candidates
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   └── candidateRoutes.js    # Candidate endpoints
│   └── middleware/
│       └── authMiddleware.js     # JWT verification
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Edit the `.env` file and update the values:
   ```
   MONGO_URI=mongodb://localhost:27017/candidate-referral
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

3. **Make sure MongoDB is running:**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Update `MONGO_URI` with your connection string

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** User object with JWT token

#### Login User
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** User object with JWT token

### Candidates (Protected Routes - Requires JWT Token)

**Note:** Include JWT token in Authorization header: `Bearer <token>`

#### Create Candidate
- **POST** `/candidates`
- **Body:**
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "1234567890",
    "jobTitle": "Software Engineer"
  }
  ```

#### Get All Candidates
- **GET** `/candidates`
- **Response:** Array of candidates referred by logged-in user

#### Update Candidate Status
- **PUT** `/candidates/:id/status`
- **Body:**
  ```json
  {
    "status": "Reviewed"
  }
  ```
- **Valid statuses:** Pending, Reviewed, Hired

#### Delete Candidate
- **DELETE** `/candidates/:id`

#### Get Statistics
- **GET** `/candidates/stats`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "total": 10,
      "pending": 5,
      "reviewed": 3,
      "hired": 2
    }
  }
  ```

## Testing the API

You can test the API using:
- **Postman**
- **Thunder Client** (VS Code extension)
- **cURL**

Example cURL command:
```bash
# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Create candidate (replace <token> with actual JWT)
curl -X POST http://localhost:5000/candidates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Jane Smith","email":"jane@example.com","phone":"1234567890","jobTitle":"Developer"}'
```

## Features

✅ User registration and login with JWT authentication  
✅ Password hashing with bcrypt  
✅ Protected routes with JWT middleware  
✅ CRUD operations for candidates  
✅ Status management (Pending, Reviewed, Hired)  
✅ Statistics endpoint  
✅ Email and phone validation  
✅ Clear error messages  
✅ Simple, readable code structure  

> **Note:** Resume upload functionality was intentionally skipped to avoid dependency on paid cloud services (AWS S3, Cloudinary, etc.). All other bonus features including authentication, metrics endpoint, and production-ready structure are fully implemented.  

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

## Code Philosophy

This codebase follows these principles:
- **Simple and explicit** - No over-engineering
- **Beginner-friendly** - Clear comments and structure
- **Easy to understand** - Readable over clever
- **No extra abstractions** - Direct implementation

## MongoDB Connection Explained

The database connection is handled in `src/db.js`:

1. Mongoose connects to MongoDB using the URI from `.env`
2. Connection success is logged with the host name
3. If connection fails, error is logged and process exits
4. The connection function is called when the server starts

## License

ISC
