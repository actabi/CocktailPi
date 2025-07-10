import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import recipeRoutes from './routes/recipe';
import userRoutes from './routes/user';
import ingredientRoutes from './routes/ingredient';
import categoryRoutes from './routes/category';
import { initDatabase, setupSchema } from './database/database';

const app = express();
app.use(bodyParser.json());

initDatabase(process.env.DB_PATH);
setupSchema();

app.use('/api/auth', authRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/ingredient', ingredientRoutes);
app.use('/api/category', categoryRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
