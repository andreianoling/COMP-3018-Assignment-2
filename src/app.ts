import express, { Express } from "express";
import ticketRoutes from "./api/v1/routes/ticketRoutes.ts";

const app: Express = express();

app.use(express.json());
app.use("/api/v1/tickets", ticketRoutes);

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;