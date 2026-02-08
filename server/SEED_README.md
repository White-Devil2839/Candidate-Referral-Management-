# Database Seeding

## Quick Start

**Run the seed script:**
```bash
cd server
node seed.js
```

**Login credentials:**
- Email: `test@example.com`
- Password: `password123`

---

## What Gets Created

### User Account
- 1 default user for testing
- Can be customized in `seed.js`

### Candidates (50 total)
The seed script creates **50 diverse candidates** across:

#### By Status:
- **~17 Pending** - New referrals awaiting review
- **~17 Reviewed** - Candidates under consideration
- **~16 Hired** - Successfully placed candidates

#### By Category:
- **Technology** (10): Software Engineers, Developers, Designers
- **Data & AI** (5): Data Scientists, ML Engineers, Analysts
- **Management** (5): Engineering Managers, Product Managers, Scrum Masters
- **Security** (5): Security Engineers, Cloud Architects, SREs
- **Specialized Tech** (5): Blockchain, Game Dev, AR/VR, IoT
- **Business** (5): Business Analysts, Operations, Sales Engineers
- **Marketing** (5): Technical Writers, Growth Hackers, SEO Specialists
- **Finance & Legal** (4): Financial Analysts, Compliance Officers
- **Others** (6): Research Scientists, Accessibility Engineers, etc.

#### Data Variety:
- **Names:** Various cultures and formats (Dr., descriptive surnames, apostrophes)
- **Emails:** Multiple domains (.com, .io, .net, country codes, corporate)
- **Phones:** Different formats:
  - `+1 (555) 123-4567`
  - `555-234-5678`
  - `(555) 345-6789`
  - `555.456.7890`
  - `5556789012`
- **Job Titles:** 50 unique positions across all tech domains

---

## Customization

### Change Default User
Edit in `seed.js`:
```javascript
const DEFAULT_USER = {
  name: 'Your Name',
  email: 'your@email.com',
  password: 'your-password'
};
```

### Add More Candidates
Add to `sampleCandidates` array:
```javascript
{
  name: 'New Candidate',
  email: 'email@domain.com',
  phone: '555-123-4567',
  jobTitle: 'Job Title',
  status: 'Pending' // or 'Reviewed' or 'Hired'
}
```

### Clear Database Only
To clear without re-seeding, modify the script or run:
```javascript
await Candidate.deleteMany({});
await User.deleteMany({});
```

---

## Perfect For Testing

✅ **Status Tabs** - Each tab will have ~16-17 candidates  
✅ **Search Functionality** - Test with various job titles  
✅ **Filters** - Mix of all three statuses  
✅ **Modal Views** - Diverse data formats to verify display  
✅ **Format Handling** - Different phone/email formats  
✅ **Realistic Data** - Professional names and titles  

---

## Statistics Display

The seed script outputs:
```
📊 STATISTICS:
═══════════════════════════════════════
   Total Candidates: 50
   🟡 Pending:       17
   🔵 Reviewed:      17
   🟢 Hired:         16
═══════════════════════════════════════
```

---

## Re-running the Script

**Safe to run multiple times!**
- Clears existing data first
- Creates fresh dataset
- Maintains data consistency
- No duplicates

**Warning:** This will **delete all existing** candidates and users!
