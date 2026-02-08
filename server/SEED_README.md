# Database Seeding Guide

This document explains how to seed the Candidate Referral Management System database with sample data for testing and demonstration purposes.

## Overview

The seed script (`seed.js`) populates the MongoDB database with:
- **4 Users**: 1 Admin + 3 Recruiters
- **60 Candidates**: Distributed across the 3 recruiters with realistic data
- **Varied Status Distribution**: Pending (41.7%), Reviewed (33.3%), Hired (25%)

## Prerequisites

- MongoDB running (local or Atlas)
- Backend dependencies installed (`npm install` in server directory)
- `.env` file configured with `MONGO_URI`

## Running the Seed Script

From the `server` directory:

```bash
node seed.js
```

The script will:
1. Connect to MongoDB
2. Clear existing users and candidates
3. Create 4 user accounts with hashed passwords
4. Generate 60 realistic candidate records
5. Display a summary of seeded data

## Seeded Data

### Users Created

| Role | Name | Email | Password | Candidates |
|------|------|-------|----------|------------|
| Admin | System Admin | admin@example.com | admin123 | 0 (can view all) |
| Recruiter | Alice Recruiter | alice@example.com | alice123 | 22 |
| Recruiter | Bob Recruiter | bob@example.com | bob123 | 20 |
| Recruiter | Carol Recruiter | carol@example.com | carol123 | 18 |

### Candidate Distribution

**Total Candidates**: 60

**By Status**:
- Pending: 25 candidates (41.7%)
- Reviewed: 20 candidates (33.3%)
- Hired: 15 candidates (25%)

**By Recruiter**:
- Alice: 22 referrals (9 hired, 40.9% success rate)
- Bob: 20 referrals (3 hired, 15% success rate)
- Carol: 18 referrals (3 hired, 16.7% success rate)

### Candidate Data Fields

Each candidate includes:
- Full name (realistic, randomly generated)
- Email address (format: firstname.lastname@domain.com)
- Phone number (US format)
- Job title (various engineering and technical roles)
- Status (Pending/Reviewed/Hired)
- Resume URL (placeholder)
- Referrer (assigned recruiter)
- Created/Updated timestamps

## Data Generation

The script uses predefined arrays of:
- 30 first names
- 30 last names  
- 20 job titles (Software Engineer, Data Scientist, etc.)
- 15 email domains (cloudmail.com, analytics.io, etc.)

Candidates are randomly generated with:
- Unique name combinations
- Realistic email addresses
- Valid phone numbers
- Even distribution across recruiters
- Weighted status distribution

## Re-running the Seed Script

The script is **idempotent** - running it multiple times will:
1. Drop all existing users and candidates
2. Re-create the same 4 users
3. Generate fresh random candidate data

**Warning**: This will delete all existing data. Do not run on production databases.

## Customization

To modify the seeded data, edit `seed.js`:

**Change user roles or credentials**:
```javascript
const SEED_USERS = [
  { name: "Your Name", email: "you@example.com", password: "yourpass", role: "admin" }
];
```

**Adjust candidate count**:
```javascript
const TOTAL_CANDIDATES = 100; // Change from 60
```

**Modify status distribution**:
```javascript
const statusWeights = {
  Pending: 50,   // Increase pending
  Reviewed: 30,
  Hired: 20
};
```

## Testing RBAC

After seeding, test role-based access control:

**Admin Login** (`admin@example.com`):
- View all 60 candidates
- Access recruiter performance analytics
- Delete any candidate
- Update any candidate status

**Recruiter Login** (e.g., `alice@example.com`):
- View only their 22 candidates
- Cannot see other recruiters' candidates
- Can only modify/delete their own referrals
- View personal statistics only

## Troubleshooting

**"MongooseServerSelectionError"**:
- Check MongoDB is running
- Verify `MONGO_URI` in `.env` file
- For Atlas: Ensure IP is whitelisted

**"Duplicate key error"**:
- Script should auto-clear data first
- Manually drop collections if needed: `db.users.drop()`, `db.candidates.drop()`

**"ValidationError"**:
- Check schema changes in `models/User.js` or `models/Candidate.js`
- Ensure seed data matches current schema requirements

## Output Example

```
🔌 Connecting to MongoDB...
✅ MongoDB Connected

🗑️  Clearing existing data...
✅ Existing data cleared

👥 Creating users...
   ✓ ADMIN      System Admin         admin@example.com
   ✓ RECRUITER  Alice Recruiter      alice@example.com
   ✓ RECRUITER  Bob Recruiter        bob@example.com
   ✓ RECRUITER  Carol Recruiter      carol@example.com  
✅ Created 4 users

📝 Creating candidates...
✅ Created 60 candidates

═══════════════════════════════════════════════════════════
📊 SEED SUMMARY
═══════════════════════════════════════════════════════════

📈 PIPELINE STATISTICS:
   Total Candidates: 60
   🟡 Pending:       25 (41.7%)
   🔵 Reviewed:      20 (33.3%)
   🟢 Hired:         15 (25.0%)

👥 RECRUITER PERFORMANCE:
   Alice:  22 total | 9 hired | 40.9% success
   Bob:    20 total | 3 hired | 15.0% success
   Carol:  18 total | 3 hired | 16.7% success

🔐 LOGIN CREDENTIALS:
═══════════════════════════════════════════════════════════
   ROLE       EMAIL                        PASSWORD    
   ────────── ──────────────────────────── ────────────
   ADMIN      admin@example.com            admin123    
   RECRUITER  alice@example.com            alice123    
   RECRUITER  bob@example.com              bob123      
   RECRUITER  carol@example.com            carol123    
═══════════════════════════════════════════════════════════

✨ Database seeded successfully!

🎯 2-ROLE SYSTEM (Simplified):
   ✅ Admin: Full access to all features
   ✅ Recruiter: Own candidates only
```
