/**
 * seed-admin.ts
 * Run once to create the admin@koach.space user in MongoDB.
 * Usage: npx ts-node seed-admin.ts
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/koach';

const AdminUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
}, { timestamps: true });

const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'admin@koach.space';
    const password = 'Admin@123';

    const existing = await AdminUser.findOne({ email });
    if (existing) {
        console.log(`⚠️  Admin already exists: ${email}`);
        await mongoose.disconnect();
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await AdminUser.create({ email, passwordHash });
    console.log(`✅ Admin created: ${email}`);
    await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
