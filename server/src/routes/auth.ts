import { FastifyInstance } from 'fastify';
import { authenticate, authorize, authorizeTenant } from '../middleware/auth';
import { UserRole } from '../types/user';
import {
  getCurrentUser,
  getDashboard,
  updateUserRoleHandler,
  getAllUsers
} from '../controllers/authController';

/**
 * Register authentication routes
 */
export async function authRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', authenticate);

  fastify.get('/me', getCurrentUser);

  fastify.get('/dashboard', getDashboard);

  fastify.put<{
    Params: { userId: string };
    Body: { role: UserRole };
  }>('/users/:userId/role', {
    preHandler: async (request, reply) => {
      await authorize(UserRole.ADMIN)(request, reply);
    },
    handler: updateUserRoleHandler as any
  });

  fastify.get('/users', {
    preHandler: async (request, reply) => {
      await authorize(UserRole.ADMIN)(request, reply);
    },
    handler: getAllUsers as any
  });
}