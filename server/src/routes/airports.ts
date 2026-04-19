import { FastifyInstance } from 'fastify';

export async function airportRoutes(fastify: FastifyInstance) {
  fastify.get('/api/airports', async (request, reply) => {
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10
      }
    };
  });

  fastify.get('/api/airports/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    return {
      id: Number(id),
      name: 'Airport name',
      type: 'controlled'
    };
  });
}
