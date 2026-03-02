import { Client, Databases, Account, Users } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

// ── Server-side Appwrite Client (uses API key — never exposed to browser) ───
const client = new Client();

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

// ── Service instances ────────────────────────────────────────────────────────
export const databases = new Databases(client);
export const account = new Account(client);
export const users = new Users(client);

// ── DB / Collection IDs ──────────────────────────────────────────────────────
export const DATABASE_ID = process.env.DATABASE_ID || 'koach_db';
export const USER_PROFILE_DATABASE_ID = process.env.USER_PROFILE_DATABASE_ID || 'user_profile';
export const USER_PROFILES_COLLECTION_ID = process.env.USER_PROFILES_COLLECTION_ID || 'user_profiles';
export const MENTORS_COLLECTION_ID = 'mentors';
export const BOOKINGS_COLLECTION_ID = 'bookings';
export const REVIEWS_COLLECTION_ID = 'reviews';
export const MESSAGES_COLLECTION_ID = 'messages';

// ── Helper: build a client scoped to a user session (for auth-gated ops) ────
export const getSessionClient = (sessionToken: string) => {
    const sessionClient = new Client();
    sessionClient
        .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
        .setProject(process.env.APPWRITE_PROJECT_ID || '')
        .setSession(sessionToken);
    return {
        account: new Account(sessionClient),
        databases: new Databases(sessionClient),
    };
};

export default client;
