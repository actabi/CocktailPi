import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../src/routes/auth';
import { initDatabase, setupSchema } from '../src/database/database';
import { createUser } from '../src/services/userService';

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  initDatabase(':memory:');
  await setupSchema();
  await createUser({ username: 'admin', password: 'admin', role: 'ADMIN' });
});

describe('Auth routes', () => {
  it('should login with default user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'admin' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
