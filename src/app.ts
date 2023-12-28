import cors from 'cors';
import express, { Application } from 'express';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/users', UserRoutes);

export default app;
