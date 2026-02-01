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

    it ("should retrieve all tickets with getAllTickets", async () => {
        const res: Response = await request(app).get("/api/v1/tickets");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "All tickets retrieved successfully");
    });

    it ("should retrieve a ticket by ID with getTicketById", async () => {
        const res: Response = await request(app).get("/api/v1/tickets/1");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Ticket retrieved successfully");
    });

    
});


