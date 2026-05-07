import { createClerkClient, verifyToken as clerkVerifyToken } from '@clerk/backend';

/**
 * Initialize Clerk client
 */
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

/**
 * Get user role from Clerk metadata
 */
export async function getUserRole(userId: string): Promise<string> {
  const user = await clerkClient.users.getUser(userId);

  return user.publicMetadata.role as string || 'uczen';
}

/**
 * Update user role in Clerk metadata
 */
export async function updateUserRole(userId: string, role: string): Promise<void> {
  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      role
    }
  });
}

/**
 * Get complete user metadata
 */
export async function getUserMetadata(userId: string): Promise<Record<string, unknown>> {
  const user = await clerkClient.users.getUser(userId);

  return user.publicMetadata;
}

/**
 * Verify Clerk JWT token
 * Uses Clerk's built-in token verification
 */
export async function verifyAuthToken(token: string) {
  try {
    const payload = await clerkVerifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!
    });
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Get user by ID
 */
export async function getUser(userId: string) {
  return await clerkClient.users.getUser(userId);
}

/**
 * Get list of all users
 */
export async function getUserList() {
  return await clerkClient.users.getUserList();
}