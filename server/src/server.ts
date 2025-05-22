import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import reviewController from './controller/reviewController';
import appRouter from './routes/appRouter';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product review backend',
      version: '1.0.0',
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],  
  apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJsdoc(options);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use('/products', appRouter);
app.post('/seed', reviewController.seedData);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
