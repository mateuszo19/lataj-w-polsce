# Clerk Authentication Setup

This project uses Clerk for authentication and role-based access control.

## Prerequisites

1. Create a Clerk account at https://dashboard.clerk.com/
2. Create a new application in Clerk Dashboard
3. Get your API keys from the Clerk Dashboard

## Backend Configuration

1. Copy `server/.env.example` to `server/.env`
2. Add your Clerk credentials:

```bash
PORT=3001
NODE_ENV=development
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
DATABASE_URL=postgresql://user:password@host:port/database
```

## Frontend Configuration

1. Copy `client/.env.local.example` to `client/.env.local`
2. Add your Clerk credentials:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## User Roles

The system supports 4 user roles:

1. **superadmin** - Full system access, can manage all users
2. **admin** - Administrative access, can manage tenants and students
3. **tenant** - Tenant access, can manage own students
4. **uczen** - Student access, basic features

## Setting User Roles

### Method 1: Via Clerk Dashboard

1. Go to Clerk Dashboard
2. Navigate to Users
3. Select a user
4. Add public metadata:
   ```json
   {
     "role": "admin"
   }
   ```

### Method 2: Via API (requires admin role)

```bash
curl -X PUT http://localhost:3001/api/auth/users/{userId}/role \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}'
```

## Running the Application

### Backend

```bash
cd server
npm install
npm run dev
```

Backend will run on http://localhost:3001

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend will run on http://localhost:3000

## Testing Authentication Flow

1. Open http://localhost:3000
2. Click "Zaloguj" button
3. Sign up or sign in with Clerk
4. After login, set user role in Clerk Dashboard
5. Click "Dashboard" to see role-specific page

## API Endpoints

### Public Endpoints

- `GET /` - API info
- `GET /api/health` - Health check

### Protected Endpoints (require authentication)

- `GET /api/auth/me` - Get current user info
- `GET /api/auth/dashboard` - Get user dashboard
- `PUT /api/auth/users/:userId/role` - Update user role (admin+)
- `GET /api/auth/users` - Get all users (admin+)

All protected endpoints require `Authorization: Bearer <token>` header.

## Default User Creation

To create the first superadmin:

1. Sign up through the application
2. Go to Clerk Dashboard
3. Find the user and set role to "superadmin" in public metadata
4. Now you can use admin features