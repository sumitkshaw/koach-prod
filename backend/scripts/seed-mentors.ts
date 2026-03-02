import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// ── Inline model (avoids import path issues in scripts) ──────────────────────
const ExperienceSchema = new mongoose.Schema({
    title: String, company: String, period: String, description: String,
}, { _id: false });

const EducationSchema = new mongoose.Schema({
    degree: String, institution: String, year: String,
}, { _id: false });

const ReviewSchema = new mongoose.Schema({
    name: String, title: String, rating: Number, comment: String, createdAt: { type: Date, default: Date.now },
}, { _id: false });

const MentorSchema = new mongoose.Schema({
    name: String, country: String, title: String, company: String, bio: String,
    avatarUrl: String, location: String, language: String, industry: String,
    skills: [String], yearsOfExperience: Number, hourlyRate: Number,
    rating: Number, reviewCount: { type: Number, default: 0 },
    badge: String, badgeType: String, topContributor: Boolean, isActive: { type: Boolean, default: true },
    linkedIn: String, twitter: String,
    experience: [ExperienceSchema],
    education: EducationSchema,
    reviews: [ReviewSchema],
    appwriteUserId: { type: String, default: '' },
}, { timestamps: true });

const Mentor = mongoose.model('Mentor', MentorSchema);

// ── Demo Mentors ─────────────────────────────────────────────────────────────
const demoMentors = [
    {
        name: 'Alex Bricks',
        country: '🇨🇦',
        title: 'Senior Backend Engineer at Apple',
        company: 'Apple',
        yearsOfExperience: 8,
        rating: 4.9,
        avatarUrl: 'https://i.pravatar.cc/300?img=11',
        badge: 'Available ASAP',
        badgeType: 'primary',
        topContributor: true,
        industry: 'Technology',
        location: 'Toronto, Canada',
        language: 'English',
        skills: ['JavaScript', 'Node.js', 'Backend', 'AWS', 'PostgreSQL', 'System Design'],
        hourlyRate: 110,
        bio: 'Senior Backend Engineer with 8 years at Apple and Amazon. I specialize in Node.js, distributed systems, and high-scale API design. I love helping engineers level up from mid to senior level and guide folks through Big Tech interviews.',
        linkedIn: 'https://linkedin.com',
        twitter: '',
        experience: [
            {
                title: 'Senior Backend Engineer',
                company: 'Apple, Canada',
                period: 'Jan 2020 – Present',
                description: "Built and maintained core payment microservices handling 50M+ daily transactions. Led a team of 6 engineers on Apple Pay's backend infrastructure.",
            },
            {
                title: 'Software Engineer II',
                company: 'Amazon, USA',
                period: 'Mar 2017 – Dec 2019',
                description: "Developed Lambda-based data pipelines and DynamoDB schema designs for AWS Marketplace. Reduced API latency by 40% through caching optimizations.",
            },
        ],
        education: {
            degree: 'B.Sc. Computer Science',
            institution: 'University of Toronto',
            year: '2017',
        },
        reviews: [
            {
                name: 'Priya S.',
                title: 'Senior Developer at Shopify',
                rating: 5,
                comment: "Alex completely transformed how I think about system design. Got my L5 offer at Google thanks to his coaching!",
            },
            {
                name: 'Marcus L.',
                title: 'Backend Engineer at Stripe',
                rating: 5,
                comment: 'Incredible depth of knowledge. Every session felt like 3× the value of any online course.',
            },
        ],
    },
    {
        name: 'Danny Blue',
        country: '🇮🇪',
        title: 'Lead Frontend Engineer at Samsung',
        company: 'Samsung',
        yearsOfExperience: 5,
        rating: 4.8,
        avatarUrl: 'https://i.pravatar.cc/300?img=12',
        badge: 'Available ASAP',
        badgeType: 'primary',
        topContributor: false,
        industry: 'Technology',
        location: 'Dublin, Ireland',
        language: 'English',
        skills: ['React', 'TypeScript', 'Frontend', 'Figma', 'Next.js', 'Web Performance'],
        hourlyRate: 90,
        bio: "Lead Frontend Engineer at Samsung with 5 years of experience building high-performance web apps with React and TypeScript. I love WebGL, animations, and turning beautiful Figma designs into pixel-perfect code.",
        linkedIn: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        experience: [
            {
                title: 'Lead Frontend Engineer',
                company: 'Samsung, Ireland',
                period: 'May 2021 – Present',
                description: "Leading the design-to-code pipeline for Samsung's One UI Web platform. Reduced load time by 40% via code splitting and lazy loading.",
            },
            {
                title: 'Frontend Developer',
                company: 'Intercom, Ireland',
                period: 'Aug 2019 – Apr 2021',
                description: "Built customer-facing features for Intercom's messenger product used by 25,000+ businesses worldwide.",
            },
        ],
        education: {
            degree: 'M.Sc. Human-Computer Interaction',
            institution: 'Trinity College Dublin',
            year: '2019',
        },
        reviews: [
            {
                name: 'Sofia M.',
                title: 'Junior Developer at Accenture',
                rating: 5,
                comment: 'Danny is an incredible teacher. He explains complex React patterns with crystal clarity.',
            },
            {
                name: 'Tom R.',
                title: 'Frontend Engineer at Zendesk',
                rating: 4,
                comment: 'Super practical sessions. Went from confused about TypeScript to confident in 4 weeks.',
            },
        ],
    },
    {
        name: 'Bianca Lorenzo',
        country: '🇩🇪',
        title: 'Head of Product Design at Airbnb',
        company: 'Airbnb',
        yearsOfExperience: 9,
        rating: 5.0,
        avatarUrl: 'https://i.pravatar.cc/300?img=5',
        badge: 'Popular',
        badgeType: 'secondary',
        topContributor: true,
        industry: 'Design',
        location: 'Berlin, Germany',
        language: 'German',
        skills: ['Figma', 'UI/UX', 'Product Design', 'Design Systems', 'Branding', 'Motion Design'],
        hourlyRate: 130,
        bio: "Head of Product Design at Airbnb with 9 years creating beloved digital experiences. I've shipped design systems used by millions globally and love coaching designers to break into top-tier product roles.",
        linkedIn: 'https://linkedin.com',
        twitter: '',
        experience: [
            {
                title: 'Head of Product Design',
                company: 'Airbnb, USA',
                period: 'Mar 2020 – Present',
                description: 'Leading a 20-person design org. Spearheaded the new Airbnb design system adopted across 15 international teams and 30+ product surfaces.',
            },
            {
                title: 'Senior Product Designer',
                company: 'Spotify, Sweden',
                period: 'Jun 2016 – Feb 2020',
                description: "Designed Spotify Home's personalization features used by 400M+ users. Led the launch of Spotify Blend and collaborative playlist features.",
            },
        ],
        education: {
            degree: 'B.A. Communication Design',
            institution: 'Berlin University of the Arts',
            year: '2015',
        },
        reviews: [
            {
                name: 'Anika W.',
                title: 'Junior Designer at Meta',
                rating: 5,
                comment: "Bianca helped me land my dream role at Meta. She doesn't just review your portfolio — she transforms it.",
            },
            {
                name: 'Chris N.',
                title: 'Product Designer at Figma',
                rating: 5,
                comment: 'Best investment I\'ve made in my career. Each session gives you frameworks you can apply for life.',
            },
        ],
    },
    {
        name: 'Jennifer Smith',
        country: '🇺🇸',
        title: 'Growth Marketing Lead at Google',
        company: 'Google',
        yearsOfExperience: 7,
        rating: 4.7,
        avatarUrl: 'https://i.pravatar.cc/300?img=9',
        badge: 'New',
        badgeType: 'default',
        topContributor: false,
        industry: 'Marketing',
        location: 'New York, USA',
        language: 'English',
        skills: ['Growth Marketing', 'SEO', 'Analytics', 'Paid Ads', 'Content Strategy', 'B2B SaaS'],
        hourlyRate: 95,
        bio: 'Growth Marketing Lead at Google with 7 years driving B2B and B2C growth at scale. I specialize in organic acquisition, paid media strategy, and data-driven marketing. I mentor founders and marketers looking to build growth engines from scratch.',
        linkedIn: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        experience: [
            {
                title: 'Growth Marketing Lead',
                company: 'Google, USA',
                period: 'Sep 2021 – Present',
                description: 'Own the growth strategy for Google Workspace SMB. Scaled trial-to-paid conversion by 35% through A/B experimentation and funnel optimization.',
            },
            {
                title: 'Marketing Manager',
                company: 'HubSpot, USA',
                period: 'Jan 2018 – Aug 2021',
                description: 'Built the SEO content program from 0 to 800K monthly organic sessions. Led a team of 5 content strategists and grew blog revenue by $2M ARR.',
            },
        ],
        education: {
            degree: 'MBA, Marketing',
            institution: 'NYU Stern School of Business',
            year: '2018',
        },
        reviews: [
            {
                name: 'Ryan P.',
                title: 'Founder at SaaS Startup',
                rating: 5,
                comment: 'Jennifer helped us build our entire growth playbook in 3 sessions. Went from 0 to 5K signups in 6 weeks.',
            },
            {
                name: 'Lisa T.',
                title: 'Marketing Associate at Salesforce',
                rating: 4,
                comment: 'Super actionable advice. She knows exactly what works at scale and tailors it to your specific stage.',
            },
        ],
    },
];

// ── Seed ─────────────────────────────────────────────────────────────────────
async function seed() {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/koach';
    console.log(`\n🌱 Connecting to MongoDB at ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected!\n');

    // Clear existing
    const count = await Mentor.countDocuments();
    if (count > 0) {
        console.log(`🗑  Removing ${count} existing mentor(s)...`);
        await Mentor.deleteMany({});
    }

    console.log('📦 Inserting demo mentors...\n');
    for (const m of demoMentors) {
        const doc = await Mentor.create(m);
        console.log(`  ✅ ${m.name}  →  ${doc._id}`);
    }

    console.log('\n🎉 Seed complete! Your mentors are ready.\n');
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(err => {
    console.error('Seed failed:', err.message);
    process.exit(1);
});
