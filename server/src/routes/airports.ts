import { FastifyInstance } from 'fastify';

export async function airportRoutes(fastify: FastifyInstance) {
  fastify.get('/api/airports', async (request, reply) => {

    return 1;
  });

  fastify.get('/api/airports/:id', async (request, reply) => {

    return 2;
  });

  fastify.get('/api/airports/stats/summary', async (request, reply) => {
    return 3
  });
}
