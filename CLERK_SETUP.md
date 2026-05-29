# Clerk Authentication Setup Guide

This project now uses **Clerk** for member authentication and account creation. Follow the steps below to ensure everything is properly configured for your Vercel deployment.

## Environment Variables

The following environment variables are required for Clerk to work:

### For Development (`.env.local`)
```
CLERK_SECRET_KEY=sk_test_P9BjpHzeJqfoRhxwhoBzL8E2kAjleY5SpGuiKOYGmk
VITE_CLERK_PUBLISHABLE_KEY=pk_test_cHJldHR5LXNsdWctODguY2xlcmsuYWNjb3VudHMuZGV2JA
```

### For Vercel Production
1. Go to your Vercel project settings
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:
   - `CLERK_SECRET_KEY` - Your Clerk secret key
   - `VITE_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key

## How Clerk Integration Works

### Frontend (React)
- The app is wrapped with `ClerkProvider` in `client/src/main.tsx`
- The `useAuth()` hook in `client/src/_core/hooks/useAuth.ts` handles authentication state
- Clerk manages sign-in, sign-up, and session management on the client side

### Backend (Express + tRPC)
- Clerk middleware is added to the Express server in `server/_core/index.ts`
- The `authenticateClerkRequest()` function in `server/_core/clerkAuth.ts` validates Clerk sessions
- Authenticated users are synced to the database with their Clerk user ID as `openId`
- All tRPC procedures can access the authenticated user via `ctx.user`

## Database Schema
- Users are stored in the `users` table with `openId` set to the Clerk user ID
- The `loginMethod` field is set to `"clerk"` for all Clerk-authenticated users
- All existing role-based access control (customer, employee, circle, admin) remains intact

## Testing Locally

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. The app will be available at `http://localhost:3000`

4. Click "Sign In" to authenticate with Clerk

## Vercel Deployment

1. Push your code to GitHub (this is already done)
2. Connect your GitHub repository to Vercel
3. Add the environment variables in Vercel's project settings
4. Deploy! Vercel will automatically build and deploy your project

## Troubleshooting

### "Missing VITE_CLERK_PUBLISHABLE_KEY" error
- Ensure `VITE_CLERK_PUBLISHABLE_KEY` is set in your `.env.local` (for local development) or in Vercel environment variables (for production)

### Users not syncing to database
- Check that `CLERK_SECRET_KEY` is correctly set
- Verify the database connection is working
- Check server logs for authentication errors

### Sign-out not working
- Ensure the backend can reach Clerk's API
- Verify `CLERK_SECRET_KEY` is correct

## Additional Resources
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk + Express Integration](https://clerk.com/docs/quickstarts/express)
- [Clerk + React Integration](https://clerk.com/docs/quickstarts/react)
