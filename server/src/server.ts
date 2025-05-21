import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import reviewController from './controller/reviewController';
import appRouter from './routes/appRouter';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());


// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// API Endpoints

app.use('/products', appRouter);
app.post('/seed', reviewController.seedData);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
