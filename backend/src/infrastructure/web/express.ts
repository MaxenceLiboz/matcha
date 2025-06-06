import express, { Application } from 'express';
import { userRoutes } from '@infrastructure/web/routes/userRoutes';
import errorMiddleware from './middleware/errorMiddleware';
import cors from 'cors'
import { authRoutes } from './routes/authRoutes';
import { config } from '@infrastructure/config';
import authMiddleware from './middleware/authMiddleware';

export function createApp(): Application {
    const app = express();

    app.use(cors({credentials: true, origin: `http://${config.FRONTEND_HOST}:${config.FRONTEND_PORT}`}))

    app.use(express.json());

    // Main route
    app.get('/', (req, res) => {
        res.send('User API is running!');
    });

    // Add routes here
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/user', authMiddleware, userRoutes);

    // Error middleware must be at the end
    app.use(errorMiddleware);

    return app;
}