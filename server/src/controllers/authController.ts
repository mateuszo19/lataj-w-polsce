import { FastifyRequest, FastifyReply } from 'fastify';
import { getUser, updateUserRole, getUserList } from '../config/clerk';
import { UserRole } from '../types/user';

/**
 * Get current user info
 */
export async function getCurrentUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user) {
      reply.code(401).send({ error: 'Unauthorized' });
      return;
    }

    const user = await getUser(request.user.id);

    reply.send({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      role: user.publicMetadata?.role || UserRole.UCZEN,
      tenantId: user.publicMetadata?.tenantId,
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch user data' });
  }
}

/**
 * Get user profile based on role
 */
export async function getDashboard(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user) {
      reply.code(401).send({ error: 'Unauthorized' });
      return;
    }

    const role = request.user.role;

    reply.send({
      role,
      dashboardType: role.toUpperCase(),
      userId: request.user.id
    });
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch profile' });
  }
}

/**
 * Update user role (admin only)
 */
export async function updateUserRoleHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user) {
      reply.code(401).send({ error: 'Unauthorized' });
      return;
    }

    const { userId, role } = request.body as { userId: string; role: UserRole };

    if (!userId || !role) {
      reply.code(400).send({ error: 'userId and role are required' });
      return;
    }

    if (!Object.values(UserRole).includes(role)) {
      reply.code(400).send({ error: 'Invalid role' });
      return;
    }

    await updateUserRole(userId, role);

    reply.send({
      message: 'User role updated successfully',
      userId,
      role
    });
  } catch (error) {
    reply.code(500).send({ error: 'Failed to update user role' });
  }
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user) {
      reply.code(401).send({ error: 'Unauthorized' });
      return;
    }

    const users = await getUserList();

    const usersWithRoles = users.data.map((user: any) => ({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      role: user.publicMetadata?.role || UserRole.UCZEN,
      firstName: user.firstName,
      lastName: user.lastName
    }));

    reply.send({ users: usersWithRoles });
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch users' });
  }
}