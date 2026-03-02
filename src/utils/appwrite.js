// src/utils/appwrite.js
// STUB — Appwrite has been replaced by Firebase Auth + MongoDB.
// This file exists so any stray import doesn't crash the app.
// Do not use these exports — they are no-ops.

export const account = {
  get: () => Promise.reject(new Error('Appwrite removed — use Firebase')),
  createEmailPasswordSession: () => Promise.reject(new Error('Appwrite removed')),
  deleteSession: () => Promise.resolve(),
};

export const databases = {
  createDocument: () => Promise.reject(new Error('Appwrite removed — use MongoDB')),
  listDocuments: () => Promise.reject(new Error('Appwrite removed — use MongoDB')),
  updateDocument: () => Promise.reject(new Error('Appwrite removed — use MongoDB')),
  deleteDocument: () => Promise.reject(new Error('Appwrite removed — use MongoDB')),
};

export const oauthProviders = {};

export const DATABASE_ID = '';
export const USER_PROFILES_COLLECTION_ID = '';

console.warn('[appwrite.js] Appwrite has been replaced by Firebase + MongoDB. This stub should not be called.');