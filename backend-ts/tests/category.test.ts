import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import categoryRoutes from '../src/routes/category';
import { initDatabase, setupSchema } from '../src/database/database';

const app = express();
app.use(bodyParser.json());
app.use('/api/category', categoryRoutes);

beforeAll(async () => {
  initDatabase(':memory:');
  await setupSchema();
});

describe('Category routes', () => {
  it('should create, update and delete a category', async () => {
    const createRes = await request(app)
      .post('/api/category')
      .send({ name: 'Fruits' });
    expect(createRes.status).toBe(201);
    const id = createRes.body.id;

    const listRes = await request(app).get('/api/category');
    expect(listRes.body.length).toBe(1);

    const updateRes = await request(app)
      .put(`/api/category/${id}`)
      .send({ name: 'Fruit' });
    expect(updateRes.body.name).toBe('Fruit');

    await request(app).delete(`/api/category/${id}`).expect(204);

    const listResAfter = await request(app).get('/api/category');
    expect(listResAfter.body.length).toBe(0);
  });
});
