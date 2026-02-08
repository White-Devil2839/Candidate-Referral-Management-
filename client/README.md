# Candidate Referral System - Frontend

Simple React frontend for the Candidate Referral Management System.

## Tech Stack

- React 18
- Vite
- Axios
- Plain CSS

## Project Structure

```
client/
├── src/
│   ├── api.js              # Axios configuration and API calls
│   ├── App.jsx             # Main app with routing logic
│   ├── Login.jsx           # Login page
│   ├── Dashboard.jsx       # Main dashboard with candidate list
│   ├── ReferralForm.jsx    # Form to add new candidates
│   ├── Stats.jsx           # Statistics display
│   ├── main.jsx            # React entry point
│   └── index.css           # Basic styles
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- Backend server running on http://localhost:5000

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure backend URL:**
   
   If your backend runs on a different port, edit `src/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000'; // Change this if needed
   ```

## Running the App

**Development mode:**
```bash
npm run dev
```

The app will start on `http://localhost:3000`

**Build for production:**
```bash
npm run build
```

## Features

### 1. Authentication
- Login page with email and password
- JWT token stored in localStorage
- Automatic redirect based on login status

### 2. Dashboard
- View all your referred candidates
- Search by job title
- Filter by status (Pending, Reviewed, Hired)
- Update candidate status via dropdown
- Delete candidates

### 3. Add Candidates
- Simple form with validation
- Fields: name, email, phone, jobTitle
- Automatically refreshes list after adding

### 4. Statistics
- Total candidates count
- Breakdown by status (Pending, Reviewed, Hired)
- Real-time updates

## Usage Flow

1. **Login:**
   - Use credentials from a registered user
   - If you don't have an account, register via backend API (Postman/cURL)

2. **View Dashboard:**
   - See statistics at the top
   - View all your referred candidates in a table

3. **Add New Candidate:**
   - Fill in the form at the top of dashboard
   - Click "Add Candidate"
   - List updates automatically

4. **Manage Candidates:**
   - Change status using the dropdown in each row
   - Delete candidates using the Delete button
   - Use search/filter to find specific candidates

5. **Logout:**
   - Click Logout button to clear session

## API Configuration

All API calls are centralized in `src/api.js`:
- Axios instance with base URL
- JWT token automatically added to headers
- All endpoints defined as functions

## Code Philosophy

- **Simple & Clear:** No complex state management
- **Beginner-Friendly:** Easy to understand for React beginners
- **Functional:** Focuses on core features without extras
- **No Over-Engineering:** Uses only useState and useEffect

## Why This Project?

This project demonstrates a **pragmatic approach** to building full-stack applications:

### Design Decisions

**Simplicity Over Complexity**
- We chose **plain CSS** over TailwindCSS or styled-components to keep the setup minimal
- We use **conditional rendering** instead of React Router because the app has only 4 views
- We use **useState/useEffect** instead of Redux/Context because the state is simple and local

**Clarity Over Cleverness**
- Every component is self-contained and easy to understand
- No abstract patterns, custom hooks, or utility layers unless absolutely necessary
- Code reads like plain English with clear variable names and comments

**Functionality Over Aesthetics**
- The UI is clean and functional, not fancy
- We prioritize **working features** over visual polish
- Forms have validation, errors are displayed clearly, loading states are simple

**Learning-Friendly**
- Perfect for beginners learning React and full-stack development
- Easy to extend with new features
- Great foundation to understand before adding complexity

### What We Intentionally Avoided

❌ **React Router** - Not needed for 4 simple views  
❌ **State Management Libraries** - Local state is sufficient  
❌ **UI Component Libraries** - Basic HTML elements work fine  
❌ **Form Libraries** - Simple controlled components are enough  
❌ **CSS Frameworks** - Plain CSS keeps it simple  

### When to Use This Approach

✅ **Small to medium applications**  
✅ **Learning projects**  
✅ **MVPs and prototypes**  
✅ **When you value clarity and simplicity**  

### When to Add Complexity

As your app grows, consider adding:
- React Router (if you have 10+ pages)
- State management (if data flows across many components)
- TypeScript (for large teams or complex data models)
- UI library (for consistent design at scale)

**Start simple. Add complexity only when you need it, not because others use it.**

## Screenshots

_Coming soon: Add screenshots of the landing page, dashboard, and forms_

## Troubleshooting

**CORS errors:**
- Make sure backend is running on port 5000
- Backend should have CORS enabled

**Login fails:**
- Verify backend is running
- Check if user exists (register via backend first)
- Check browser console for error messages

**Token issues:**
- Clear localStorage and login again
- Check if JWT_SECRET matches between sessions

## License

ISC
