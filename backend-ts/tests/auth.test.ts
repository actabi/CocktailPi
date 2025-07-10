import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../src/routes/auth';
import { verifyToken, JwtPayload } from '../src/utils/jwt';

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

describe('Auth routes', () => {
  it('should login with default user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'admin' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    const payload = verifyToken<JwtPayload>(res.body.token);
    expect(payload).not.toBeNull();
    expect(payload?.username).toBe('admin');
  });
});
