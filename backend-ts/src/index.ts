import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import recipeRoutes from './routes/recipe';
import userRoutes from './routes/user';

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
