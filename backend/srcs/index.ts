import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.status(200).json("Hello from the server!!!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening on port`, PORT);
});