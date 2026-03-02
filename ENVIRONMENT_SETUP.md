# Environment Variables Setup

Create a `.env` file in your project root with the following variables:

## Required Appwrite Configuration
```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
```

## Optional Firebase Configuration (for backup auth)
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

## How to get these values:

### Appwrite Setup:
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project or select existing one
3. Go to Settings > General
4. Copy your Project ID
5. The endpoint is usually `https://cloud.appwrite.io/v1`

### Firebase Setup (Optional):
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Add a web app if you haven't already
6. Copy the config values from the Firebase config object
