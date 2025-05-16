"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("@infrastructure/web/routes/userRoutes");
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json()); // Middleware to parse JSON bodies
    // Main route
    app.get('/', (req, res) => {
        res.send('User API is running!');
    });
    // Add routes here
    app.use('/api/v1/user', userRoutes_1.userRoutes);
    // Add other middleware here
    return app;
}
