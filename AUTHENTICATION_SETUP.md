# Authentication Setup Guide

This guide will help you set up and configure the authentication system for your Koach application.

## Overview

The authentication system supports:
- ✅ Email/Password authentication with magic link verification
- ✅ Google OAuth
- ✅ LinkedIn OAuth
- ✅ Password reset functionality
- ✅ Email verification with magic URLs

## Prerequisites

1. **Appwrite Account**: Sign up at [Appwrite Console](https://cloud.appwrite.io)
2. **Google OAuth**: Google Cloud Console project with OAuth credentials
3. **LinkedIn OAuth**: LinkedIn Developer account with OAuth app

## Step 1: Appwrite Setup

### 1.1 Create Appwrite Project
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Click "Create Project"
3. Enter project name (e.g., "Koach App")
4. Copy your Project ID

### 1.2 Configure Authentication
1. In your Appwrite project, go to **Auth** section
2. Enable the following authentication methods:
   - **Email/Password**: Enable
   - **Magic URL**: Enable
   - **OAuth Providers**: Enable Google and LinkedIn

### 1.3 OAuth Provider Setup

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/{PROJECT_ID}`
   - For local development: `http://localhost:3000/v1/account/sessions/oauth2/callback/google/{PROJECT_ID}`
7. Copy Client ID and Client Secret
8. In Appwrite Console, go to Auth > Providers > Google
9. Enter your Google Client ID and Client Secret

#### LinkedIn OAuth:
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers)
2. Create a new app
3. In Auth tab, add redirect URLs:
   - `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/linkedin/{PROJECT_ID}`
   - For local development: `http://localhost:3000/v1/account/sessions/oauth2/callback/linkedin/{PROJECT_ID}`
4. Copy Client ID and Client Secret
5. In Appwrite Console, go to Auth > Providers > LinkedIn
6. Enter your LinkedIn Client ID and Client Secret

## Step 2: Environment Variables

Create a `.env` file in your project root:

```env
# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
```

## Step 3: Testing Authentication

### 3.1 Email/Password Authentication
1. Start your development server: `npm run dev`
2. Go to `/signup` and create an account
3. Check your email for verification link
4. Click the verification link
5. Go to `/login` and sign in

### 3.2 OAuth Authentication
1. Go to `/login` or `/signup`
2. Click "Login with Google" or "Login with LinkedIn"
3. Complete OAuth flow
4. You should be redirected to `/dashboard`

### 3.3 Password Reset
1. Go to `/login`
2. Click "Forgot Password?"
3. Enter your email
4. Check email for reset link
5. Click reset link and set new password

## Step 4: Production Deployment

### 4.1 Update OAuth Redirect URIs
When deploying to production, update your OAuth provider redirect URIs:

**Google Cloud Console:**
- Add: `https://yourdomain.com/v1/account/sessions/oauth2/callback/google/{PROJECT_ID}`

**LinkedIn Developer Portal:**
- Add: `https://yourdomain.com/v1/account/sessions/oauth2/callback/linkedin/{PROJECT_ID}`

### 4.2 Environment Variables
Set environment variables in your hosting platform:
- `VITE_APPWRITE_ENDPOINT`
- `VITE_APPWRITE_PROJECT_ID`

## Troubleshooting

### Common Issues:

1. **"OAuth provider not configured"**
   - Check if OAuth providers are enabled in Appwrite Console
   - Verify Client ID and Secret are correct
   - Ensure redirect URIs match exactly

2. **"Email verification failed"**
   - Check if magic URL is enabled in Appwrite
   - Verify email template settings
   - Check spam folder

3. **"Invalid credentials"**
   - Ensure user has verified their email
   - Check if account exists
   - Verify password is correct

4. **"Rate limit exceeded"**
   - The app includes rate limiting protection
   - Wait a few minutes before retrying
   - Check Appwrite console for rate limit settings

### Debug Mode:
Add this to your `.env` file for detailed error logging:
```env
VITE_DEBUG=true
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files to version control
2. **HTTPS**: Always use HTTPS in production
3. **Rate Limiting**: Appwrite provides built-in rate limiting
4. **Email Verification**: Always require email verification
5. **Password Strength**: Enforce strong passwords (8+ characters)

## Support

If you encounter issues:
1. Check Appwrite Console logs
2. Verify environment variables
3. Test OAuth redirect URIs
4. Check browser console for errors
5. Review the authentication flow in the code

## Files Modified

The following files were updated to implement the authentication system:

- `src/utils/auth.js` - Core authentication functions
- `src/utils/AuthContext.jsx` - React context for auth state
- `src/utils/appwrite.js` - Appwrite client configuration
- `src/pages/LoginPage.jsx` - Login page with OAuth buttons
- `src/pages/SignUpPage.jsx` - Signup page with OAuth buttons
- `src/pages/ForgotPassword.jsx` - Password reset request page
- `src/pages/ResetPassword.jsx` - Password reset confirmation page
- `src/App.jsx` - Added routing for reset password page
