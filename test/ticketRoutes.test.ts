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

    it ("should update a ticket with updateTicket", async () => {
        const updatedTicket = {
            id: 1,
            title: "updated test",
            description: "updated description",
            priority: "medium",
            status: "open",
            createdAt: new Date().toISOString()
        };
        const res: Response = await request(app).put("/api/v1/tickets/1").send(updatedTicket);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Ticket with id 1 updated successfully");
    });

    it ("should delete a ticket with deleteTicket", async () => {
        const res: Response = await request(app).delete("/api/v1/tickets/1");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Ticket with id 1 deleted successfully");
    });

    it ("should calculate urgency for a ticket with calculateUrgency", async () => {
        const res: Response = await request(app).get("/api/v1/tickets/2/urgency");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Ticket urgency calculated");
    });
});


