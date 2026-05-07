import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyAuthToken } from '../config/clerk';
import { UserRole, AuthenticatedUser, hasRequiredRole } from '../types/user';

/**
 * Extend Fastify request to include user
 */
declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthenticatedUser;
  }
}

/**
 * JWT payload with claims
 */
interface JwtClaims {
  sub: string;
  email?: string;
  publicMetadata?: {
    role?: UserRole;
    tenantId?: string;
  };
}

/**
 * Verify Clerk authentication token and extract user info
 */
async function verifyUserToken(token: string): Promise<AuthenticatedUser | null> {
  const claims = await verifyAuthToken(token) as JwtClaims | null;

  if (!claims) {
    return null;
  }

  const role = claims.publicMetadata?.role || UserRole.UCZEN;
  const tenantId = claims.publicMetadata?.tenantId;

  return {
    id: claims.sub,
    role,
    tenantId,
    email: claims.email
  };
}

/**
 * Extract authorization token from request headers
 */
function extractToken(request: FastifyRequest): string | null {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.substring(7);
}

/**
 * Authentication middleware - verifies user is logged in
 */
export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const token = extractToken(request);

  if (!token) {
    reply.code(401).send({
      error: 'Unauthorized',
      message: 'No authorization token provided'
    });
    return;
  }

  const user = await verifyUserToken(token);

  if (!user) {
    reply.code(401).send({
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    });
    return;
  }

  request.user = user;
}

/**
 * Authorization middleware - checks if user has required role
 */
export function authorize(requiredRole: UserRole) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    if (!request.user) {
      reply.code(401).send({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
      return;
    }

    if (!hasRequiredRole(request.user.role, requiredRole)) {
      reply.code(403).send({
        error: 'Forbidden',
        message: `Role ${requiredRole} required`
      });
      return;
    }
  };
}

/**
 * Tenant access middleware - checks if user belongs to specific tenant
 */
export async function authorizeTenant(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  if (!request.user) {
    reply.code(401).send({
      error: 'Unauthorized',
      message: 'Authentication required'
    });
    return;
  }

  if (request.user.role !== UserRole.TENANT && request.user.role !== UserRole.ADMIN && request.user.role !== UserRole.SUPERADMIN) {
    reply.code(403).send({
      error: 'Forbidden',
      message: 'Tenant access required'
    });
    return;
  }
}