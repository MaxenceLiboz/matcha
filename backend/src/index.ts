import { config } from "@infrastructure/config";
import { createApp } from '@infrastructure/web/express';


async function startServer() {

    const app = createApp();

    app.listen(config.PORT, () => {
    console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
    });
}

startServer().catch(error => {
    console.error("Failed to start server:", error);
    process.exit(1);
});