import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { airportRoutes } from './routes/airports';
import { authRoutes } from './routes/auth';

const fastify = Fastify({
  logger: true
});

fastify.register(cors, {
  origin: true,
  credentials: true
});

fastify.get('/', async (request, reply) => {
  return { message: 'Lataj w Polsce API' };
});

fastify.get('/api/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

fastify.register(airportRoutes);
fastify.register(authRoutes, { prefix: '/api/auth' });

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
