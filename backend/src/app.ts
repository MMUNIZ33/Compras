import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import cardRoutes from './routes/cards';
import webhookRoutes from './routes/webhooks';

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);
app.use('/webhooks', webhookRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Compras API' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
