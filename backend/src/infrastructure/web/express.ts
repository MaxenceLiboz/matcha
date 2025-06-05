import express, { Application } from 'express';
import { userRoutes } from '@infrastructure/web/routes/userRoutes';
import errorMiddleware from './middleware/errorMiddleware';
import cors from 'cors'
import { authRoutes } from './routes/authRoutes';

export function createApp(): Application {
    const app = express();

    app.use(cors({credentials: true, origin: 'http://localhost:8000'}))

    app.use(express.json());

    // Main route
    app.get('/', (req, res) => {
        res.send('User API is running!');
    });

    // Add routes here
    app.use('/api/v1/user', userRoutes);
    app.use('/api/v1/auth', authRoutes);
    
    // Add other middleware here

    // Error middleware must be at the end
    app.use(errorMiddleware);

    return app;
}