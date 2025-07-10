import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import ingredientRoutes from '../src/routes/ingredient';
import { initDatabase, setupSchema } from '../src/database/database';

const app = express();
app.use(bodyParser.json());
app.use('/api/ingredient', ingredientRoutes);

beforeAll(async () => {
  initDatabase(':memory:');
  await setupSchema();
});

describe('Ingredient routes', () => {
  it('should create, update and delete an ingredient', async () => {
    const createRes = await request(app)
      .post('/api/ingredient')
      .send({ name: 'Lime' });
    expect(createRes.status).toBe(201);
    const id = createRes.body.id;

    const listRes = await request(app).get('/api/ingredient');
    expect(listRes.body.length).toBe(1);

    const updateRes = await request(app)
      .put(`/api/ingredient/${id}`)
      .send({ name: 'Lemon' });
    expect(updateRes.body.name).toBe('Lemon');

    await request(app).delete(`/api/ingredient/${id}`).expect(204);

    const listResAfter = await request(app).get('/api/ingredient');
    expect(listResAfter.body.length).toBe(0);
  });
});
