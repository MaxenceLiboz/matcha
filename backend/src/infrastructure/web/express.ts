import express, { Application } from 'express';
import { userRoutes } from '@infrastructure/web/routes/userRoutes';
import errorMiddleware from './middleware/errorMiddleware';

export function createApp(): Application {
    const app = express();

    app.use(express.json()); // Middleware to parse JSON bodies

    // Main route
    app.get('/', (req, res) => {
        res.send('User API is running!');
    });

    // Add routes here
    app.use('/api/v1/user', userRoutes);
    
    // Add other middleware here

    // Error middleware must be at the end
    app.use(errorMiddleware);

    return app;
}