/**
 * PRODUCTION SEED SCRIPT - 2-ROLE SYSTEM
 * Candidate Referral Management System
 * 
 * Roles: Admin + Recruiter only (No Manager)
 * Purpose: Demo-ready data for RBAC and analytics
 * Usage: node seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Candidate = require('./src/models/Candidate');

// ========================================
// USERS (Admin + 3 Recruiters Only)
// ========================================

const SEED_USERS = [
    {
        name: 'System Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        name: 'Alice Recruiter',
        email: 'alice@example.com',
        password: 'alice123',
        role: 'recruiter'
    },
    {
        name: 'Bob Recruiter',
        email: 'bob@example.com',
        password: 'bob123',
        role: 'recruiter'
    },
    {
        name: 'Carol Recruiter',
        email: 'carol@example.com',
        password: 'carol123',
        role: 'recruiter'
    }
];

// ========================================
// CANDIDATE DATA (60 TOTAL)
// Distribution: Alice=22, Bob=20, Carol=18
// Status: Pending=24 (40%), Reviewed=21 (35%), Hired=15 (25%)
// ========================================

const CANDIDATES_DATA = [
    // ALICE'S CANDIDATES (22 total) - Top Performer
    // 5 Pending, 8 Reviewed, 9 Hired (40.9% hire rate)

    { name: 'David Chen', email: 'david.chen@techmail.com', phone: '+1 (555) 234-5678', jobTitle: 'Senior Frontend Engineer', status: 'Hired', recruiter: 'alice' },
    { name: 'Sarah Martinez', email: 'smartinez@devhub.io', phone: '555-123-4567', jobTitle: 'Full Stack Developer', status: 'Hired', recruiter: 'alice' },
    { name: 'Michael O\'Brien', email: 'm.obrien@cloudmail.com', phone: '+1-555-876-5432', jobTitle: 'Backend Engineer', status: 'Reviewed', recruiter: 'alice' },
    { name: 'Priya Patel', email: 'priya.patel@techcorp.net', phone: '(555) 345-6789', jobTitle: 'React Developer', status: 'Hired', recruiter: 'alice' },
    { name: 'James Wilson', email: 'jwilson@datamail.com', phone: '+1 555 234 9876', jobTitle: 'Machine Learning Engineer', status: 'Hired', recruiter: 'alice' },
    { name: 'Aisha Rahman', email: 'aisha.r@analytics.io', phone: '555.654.3210', jobTitle: 'Data Scientist', status: 'Reviewed', recruiter: 'alice' },
    { name: 'Carlos Mendoza', email: 'carlos.m@ailab.com', phone: '+1 (555) 789-0123', jobTitle: 'AI Research Engineer', status: 'Pending', recruiter: 'alice' },
    { name: 'Emily Zhang', email: 'emily.zhang@cloudops.net', phone: '555-456-7890', jobTitle: 'DevOps Engineer', status: 'Hired', recruiter: 'alice' },
    { name: 'Thomas Anderson', email: 't.anderson@inframail.com', phone: '+1 555 890 1234', jobTitle: 'Cloud Architect', status: 'Reviewed', recruiter: 'alice' },
    { name: 'Nina Kowalski', email: 'nina.k@sysops.io', phone: '(555) 567-8901', jobTitle: 'Site Reliability Engineer', status: 'Hired', recruiter: 'alice' },
    { name: 'Oliver Thompson', email: 'oliver.t@designstudio.com', phone: '+1-555-678-9012', jobTitle: 'Senior Product Designer', status: 'Reviewed', recruiter: 'alice' },
    { name: 'Sophia Kim', email: 'sophia.kim@productmail.io', phone: '555.789.0123', jobTitle: 'Product Manager', status: 'Hired', recruiter: 'alice' },
    { name: 'Liam Foster', email: 'liam.foster@uxmail.com', phone: '+1 (555) 890-1234', jobTitle: 'UX Researcher', status: 'Pending', recruiter: 'alice' },
    { name: 'Isabella Garcia', email: 'isabella.g@qateam.net', phone: '555-901-2345', jobTitle: 'QA Engineer', status: 'Reviewed', recruiter: 'alice' },
    { name: 'Ethan Brooks', email: 'ethan.brooks@securitymail.com', phone: '+1 555 012 3456', jobTitle: 'Security Engineer', status: 'Hired', recruiter: 'alice' },
    { name: 'Ava Mitchell', email: 'ava.m@testops.io', phone: '(555) 123-4567', jobTitle: 'Test Automation Engineer', status: 'Reviewed', recruiter: 'alice' },
    { name: 'Noah Williams', email: 'noah.w@bizmail.com', phone: '+1-555-234-5678', jobTitle: 'Business Analyst', status: 'Pending', recruiter: 'alice' },
    { name: 'Mia Rodriguez', email: 'mia.rodriguez@opsmail.net', phone: '555.345.6789', jobTitle: 'Operations Manager', status: 'Hired', recruiter: 'alice' },
    { name: 'Lucas Taylor', email: 'lucas.taylor@marketmail.com', phone: '+1 (555) 456-7890', jobTitle: 'Growth Marketing Manager', status: 'Reviewed', recruiter: 'alice' },
    { name: 'Emma Johnson', email: 'emma.j@salesforce.io', phone: '555-567-8901', jobTitle: 'Enterprise Sales Executive', status: 'Pending', recruiter: 'alice' },
    { name: 'Alexander Lee', email: 'alex.lee@financemail.com', phone: '+1 555 678 9012', jobTitle: 'Financial Analyst', status: 'Reviewed', recruiter: 'alice' },
    { name: 'Charlotte Davis', email: 'charlotte.d@legalmail.net', phone: '(555) 789-0123', jobTitle: 'Corporate Counsel', status: 'Pending', recruiter: 'alice' },

    // BOB'S CANDIDATES (20 total) - Moderate Performer
    // 10 Pending, 7 Reviewed, 3 Hired (15% hire rate)

    { name: 'Daniel Park', email: 'daniel.park@codemail.com', phone: '+1-555-890-1234', jobTitle: 'iOS Developer', status: 'Pending', recruiter: 'bob' },
    { name: 'Grace Wu', email: 'grace.wu@mobiledev.io', phone: '555.901.2345', jobTitle: 'Android Engineer', status: 'Reviewed', recruiter: 'bob' },
    { name: 'Ryan Murphy', email: 'ryan.m@fullstack.net', phone: '+1 (555) 012-3456', jobTitle: 'Full Stack Engineer', status: 'Hired', recruiter: 'bob' },
    { name: 'Zoe Hughes', email: 'zoe.hughes@webmail.com', phone: '555-123-4567', jobTitle: 'Frontend Developer', status: 'Pending', recruiter: 'bob' },
    { name: 'Benjamin Scott', email: 'ben.scott@dataops.io', phone: '+1 555 234 5678', jobTitle: 'Data Engineer', status: 'Pending', recruiter: 'bob' },
    { name: 'Chloe Anderson', email: 'chloe.a@mlteam.com', phone: '(555) 345-6789', jobTitle: 'ML Ops Engineer', status: 'Reviewed', recruiter: 'bob' },
    { name: 'Mason Clark', email: 'mason.clark@analytics.net', phone: '+1-555-456-7890', jobTitle: 'Analytics Engineer', status: 'Pending', recruiter: 'bob' },
    { name: 'Hannah Lewis', email: 'hannah.l@cloudteam.io', phone: '555.567.8901', jobTitle: 'Kubernetes Engineer', status: 'Reviewed', recruiter: 'bob' },
    { name: 'Jack Robinson', email: 'jack.r@infraops.com', phone: '+1 (555) 678-9012', jobTitle: 'Infrastructure Engineer', status: 'Pending', recruiter: 'bob' },
    { name: 'Lily Martinez', email: 'lily.martinez@devops.net', phone: '555-789-0123', jobTitle: 'Platform Engineer', status: 'Hired', recruiter: 'bob' },
    { name: 'Owen Harris', email: 'owen.harris@design.io', phone: '+1 555 890 1234', jobTitle: 'Product Designer', status: 'Pending', recruiter: 'bob' },
    { name: 'Amelia White', email: 'amelia.w@productteam.com', phone: '(555) 901-2345', jobTitle: 'Product Manager', status: 'Reviewed', recruiter: 'bob' },
    { name: 'Henry Walker', email: 'henry.walker@qamail.net', phone: '+1-555-012-3456', jobTitle: 'Senior QA Engineer', status: 'Pending', recruiter: 'bob' },
    { name: 'Ella Thompson', email: 'ella.t@secops.io', phone: '555.123.4567', jobTitle: 'Application Security Engineer', status: 'Reviewed', recruiter: 'bob' },
    { name: 'Sebastian Young', email: 'sebastian.y@bizops.com', phone: '+1 (555) 234-5678', jobTitle: 'Business Operations Manager', status: 'Pending', recruiter: 'bob' },
    { name: 'Victoria King', email: 'victoria.king@corpmail.net', phone: '555-345-6789', jobTitle: 'Strategic Partnerships Manager', status: 'Hired', recruiter: 'bob' },
    { name: 'Matthew Wright', email: 'matthew.w@marketing.io', phone: '+1 555 456 7890', jobTitle: 'Content Marketing Lead', status: 'Pending', recruiter: 'bob' },
    { name: 'Harper Green', email: 'harper.green@salesteam.com', phone: '(555) 567-8901', jobTitle: 'Sales Development Rep', status: 'Reviewed', recruiter: 'bob' },
    { name: 'Jackson Hill', email: 'jackson.hill@healthtech.io', phone: '+1-555-678-9012', jobTitle: 'Healthcare Product Manager', status: 'Pending', recruiter: 'bob' },
    { name: 'Scarlett Adams', email: 'scarlett.a@edtech.net', phone: '555.789.0123', jobTitle: 'EdTech Product Designer', status: 'Pending', recruiter: 'bob' },

    // CAROL'S CANDIDATES (18 total) - Good Performer
    // 9 Pending, 6 Reviewed, 3 Hired (16.7% hire rate)

    { name: 'William Nelson', email: 'william.n@engineering.com', phone: '+1 (555) 890-1234', jobTitle: 'Senior Backend Engineer', status: 'Reviewed', recruiter: 'carol' },
    { name: 'Abigail Carter', email: 'abigail.c@devteam.io', phone: '555-901-2345', jobTitle: 'Software Engineer', status: 'Pending', recruiter: 'carol' },
    { name: 'Elijah Mitchell', email: 'elijah.m@techmail.net', phone: '+1 555 012 3456', jobTitle: 'Platform Engineer', status: 'Hired', recruiter: 'carol' },
    { name: 'Sofia Perez', email: 'sofia.perez@datamail.com', phone: '(555) 123-4567', jobTitle: 'Senior Data Scientist', status: 'Pending', recruiter: 'carol' },
    { name: 'James Roberts', email: 'james.roberts@mlops.io', phone: '+1-555-234-5678', jobTitle: 'Data Platform Engineer', status: 'Reviewed', recruiter: 'carol' },
    { name: 'Avery Turner', email: 'avery.t@analytics.com', phone: '555.345.6789', jobTitle: 'Business Intelligence Analyst', status: 'Pending', recruiter: 'carol' },
    { name: 'Evelyn Phillips', email: 'evelyn.p@cloudmail.net', phone: '+1 (555) 456-7890', jobTitle: 'AWS Solutions Architect', status: 'Hired', recruiter: 'carol' },
    { name: 'Logan Campbell', email: 'logan.campbell@devops.io', phone: '555-567-8901', jobTitle: 'Senior DevOps Engineer', status: 'Reviewed', recruiter: 'carol' },
    { name: 'Aria Parker', email: 'aria.parker@product.com', phone: '+1 555 678 9012', jobTitle: 'Senior Product Manager', status: 'Pending', recruiter: 'carol' },
    { name: 'Gabriel Evans', email: 'gabriel.e@designmail.net', phone: '(555) 789-0123', jobTitle: 'UI/UX Designer', status: 'Reviewed', recruiter: 'carol' },
    { name: 'Madison Edwards', email: 'madison.e@uxteam.io', phone: '+1-555-890-1234', jobTitle: 'UX Designer', status: 'Pending', recruiter: 'carol' },
    { name: 'Carter Collins', email: 'carter.c@security.com', phone: '555.901.2345', jobTitle: 'Cybersecurity Analyst', status: 'Hired', recruiter: 'carol' },
    { name: 'Layla Stewart', email: 'layla.stewart@qamail.io', phone: '+1 (555) 012-3456', jobTitle: 'Quality Assurance Lead', status: 'Pending', recruiter: 'carol' },
    { name: 'Wyatt Morris', email: 'wyatt.morris@finance.net', phone: '555-123-4567', jobTitle: 'Senior Financial Analyst', status: 'Reviewed', recruiter: 'carol' },
    { name: 'Penelope Rogers', email: 'penelope.r@bizmail.com', phone: '+1 555 234 5678', jobTitle: 'Operations Director', status: 'Pending', recruiter: 'carol' },
    { name: 'Grayson Reed', email: 'grayson.reed@marketing.io', phone: '(555) 345-6789', jobTitle: 'Digital Marketing Manager', status: 'Pending', recruiter: 'carol' },
    { name: 'Aurora Cook', email: 'aurora.cook@fintech.com', phone: '+1-555-456-7890', jobTitle: 'FinTech Product Manager', status: 'Reviewed', recruiter: 'carol' },
    { name: 'Lincoln Morgan', email: 'lincoln.m@finance.io', phone: '555.567.8901', jobTitle: 'FinTech Engineer', status: 'Pending', recruiter: 'carol' }
];

// ========================================
// SEED FUNCTION
// ========================================

async function seedDatabase() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/candidate-referral', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected\n');

        console.log('🗑️  Clearing existing data...');
        await Candidate.deleteMany({});
        await User.deleteMany({});
        console.log('✅ Existing data cleared\n');

        console.log('👥 Creating users...');
        const createdUsers = [];

        for (const userData of SEED_USERS) {
            const user = await User.create(userData);
            createdUsers.push(user);
            console.log(`   ✓ ${user.role.toUpperCase().padEnd(10)} ${user.name.padEnd(20)} ${user.email}`);
        }
        console.log(`✅ Created ${createdUsers.length} users\n`);

        const recruiterMap = {
            alice: createdUsers.find(u => u.email === 'alice@example.com'),
            bob: createdUsers.find(u => u.email === 'bob@example.com'),
            carol: createdUsers.find(u => u.email === 'carol@example.com')
        };

        console.log('📝 Creating candidates...');
        const candidatesWithRecruiters = CANDIDATES_DATA.map(candidate => ({
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone,
            jobTitle: candidate.jobTitle,
            status: candidate.status,
            referredBy: recruiterMap[candidate.recruiter]._id
        }));

        const createdCandidates = await Candidate.insertMany(candidatesWithRecruiters);
        console.log(`✅ Created ${createdCandidates.length} candidates\n`);

        // Calculate statistics
        const pendingCount = createdCandidates.filter(c => c.status === 'Pending').length;
        const reviewedCount = createdCandidates.filter(c => c.status === 'Reviewed').length;
        const hiredCount = createdCandidates.filter(c => c.status === 'Hired').length;

        const aliceCandidates = createdCandidates.filter(c => c.referredBy.equals(recruiterMap.alice._id));
        const bobCandidates = createdCandidates.filter(c => c.referredBy.equals(recruiterMap.bob._id));
        const carolCandidates = createdCandidates.filter(c => c.referredBy.equals(recruiterMap.carol._id));

        const aliceHired = aliceCandidates.filter(c => c.status === 'Hired').length;
        const bobHired = bobCandidates.filter(c => c.status === 'Hired').length;
        const carolHired = carolCandidates.filter(c => c.status === 'Hired').length;

        console.log('═══════════════════════════════════════════════════════════');
        console.log('📊 SEED SUMMARY');
        console.log('═══════════════════════════════════════════════════════════\n');

        console.log('📈 PIPELINE STATISTICS:');
        console.log(`   Total Candidates: ${createdCandidates.length}`);
        console.log(`   🟡 Pending:       ${pendingCount} (${((pendingCount / createdCandidates.length) * 100).toFixed(1)}%)`);
        console.log(`   🔵 Reviewed:      ${reviewedCount} (${((reviewedCount / createdCandidates.length) * 100).toFixed(1)}%)`);
        console.log(`   🟢 Hired:         ${hiredCount} (${((hiredCount / createdCandidates.length) * 100).toFixed(1)}%)`);

        console.log('\n👥 RECRUITER PERFORMANCE:');
        console.log(`   Alice:  ${aliceCandidates.length} total | ${aliceHired} hired | ${((aliceHired / aliceCandidates.length) * 100).toFixed(1)}% success`);
        console.log(`   Bob:    ${bobCandidates.length} total | ${bobHired} hired | ${((bobHired / bobCandidates.length) * 100).toFixed(1)}% success`);
        console.log(`   Carol:  ${carolCandidates.length} total | ${carolHired} hired | ${((carolHired / carolCandidates.length) * 100).toFixed(1)}% success`);

        console.log('\n🔐 LOGIN CREDENTIALS:');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('   ROLE       EMAIL                        PASSWORD');
        console.log('   ────────── ──────────────────────────── ────────────');
        SEED_USERS.forEach(user => {
            console.log(`   ${user.role.toUpperCase().padEnd(10)} ${user.email.padEnd(28)} ${user.password}`);
        });
        console.log('═══════════════════════════════════════════════════════════\n');

        console.log('✨ Database seeded successfully!\n');
        console.log('🎯 2-ROLE SYSTEM (Simplified):');
        console.log('   ✅ Admin: Full access to all features');
        console.log('   ✅ Recruiter: Own candidates only\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedDatabase();
