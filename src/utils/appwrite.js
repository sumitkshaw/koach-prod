// src/utils/appwrite.js - FOR APPWRITE 20+
import { Client, Account, Databases } from 'appwrite';

// Create client
export const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('68d6e7520021a096d289');

// Create services
export const account = new Account(client);
export const databases = new Databases(client);

// Constants
export const DATABASE_ID = 'user_profile';
export const USER_PROFILES_COLLECTION_ID = 'user_profiles';
export const oauthProviders = { google: 'google', linkedin: 'linkedin' };