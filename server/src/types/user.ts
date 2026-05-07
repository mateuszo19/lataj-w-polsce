/**
 * User role hierarchy levels
 */
export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  TENANT = 'tenant',
  UCZEN = 'uczen'
}

/**
 * Role hierarchy for authorization checks
 * Higher number = higher privileges
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SUPERADMIN]: 4,
  [UserRole.ADMIN]: 3,
  [UserRole.TENANT]: 2,
  [UserRole.UCZEN]: 1
};

/**
 * User metadata interface
 */
export interface UserMetadata {
  role: UserRole;
  tenantId?: string;
  organization?: string;
}

/**
 * Extended user interface with role information
 */
export interface AuthenticatedUser {
  id: string;
  role: UserRole;
  tenantId?: string;
  email?: string;
}

/**
 * Check if user has required role level
 */
export function hasRequiredRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}