import request, { Response } from "supertest";
import app from "../src/app";

describe("Ticket Routes Endpoints", () => {
    it ("should create a new ticket with createTicket", async () => {
        const newTicket = {
            id: 11,
            title: "test",
            description: "test description",
            priority: "high",
            status: "open",
            createdAt: new Date().toISOString()
        };
        const res: Response = await request(app).post("/api/v1/tickets").send(newTicket);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("message", "Ticket created successfully");
    });
});


