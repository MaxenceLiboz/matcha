import express, { Application } from 'express';
import { userRoutes } from '@infrastructure/web/routes/userRoutes';

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

    return app;
}