import express, { Application } from "express";
import { userRoutes } from "@infrastructure/web/routes/userRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes";
import { config } from "@infrastructure/config";
import authMiddleware from "./middleware/authMiddleware";
import { profile } from "console";
import { profileRoutes } from "./routes/profileRoutes";
import { tagRoutes } from "./routes/tagRoutes";

export function createApp(): Application {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: `http://${config.FRONTEND_HOST}:${config.FRONTEND_PORT}`,
    })
  );

  app.use(express.json());

  // Main route
  app.get("/", (req, res) => {
    res.send("User API is running!");
  });

  // Add routes here
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/user", (req, res, next) => authMiddleware(req, res, next), userRoutes);
  app.use("/api/v1/profile", (req, res, next) => authMiddleware(req, res, next), profileRoutes);
  app.use("/api/v1/tags", (req, res, next) => authMiddleware(req, res, next), tagRoutes);

  // Error middleware must be at the end
  app.use(errorMiddleware);

  return app;
}
