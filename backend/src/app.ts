import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth';
import cardRoutes from './routes/cards';
import supplierRoutes from './routes/suppliers';
import deptRoutes from './routes/departments';
import methodRoutes from './routes/paymentMethods';
import webhookRoutes from './routes/webhooks';
import { swaggerSpec } from './swagger';

const app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/departments', deptRoutes);
app.use('/payment-methods', methodRoutes);
app.use('/webhooks', webhookRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Compras API' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
