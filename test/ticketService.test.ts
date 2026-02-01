import request, { Response } from "supertest";
import app from "../src/app";

describe("Urgency Calculation Function", () => {
    it ("should handle non-existent ticket", async () => {
        const res: Response = await request(app).get("/api/v1/tickets/999/urgency");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Ticket not found");
    });

    it("should assign critical urgency level correctly", async () => {
        const tenDayOldTestDate = new Date();
        tenDayOldTestDate.setDate(tenDayOldTestDate.getDate() - 100);
        
        const testTicket = {
            id: 35,
            title: "Test 2",
            description: "Test 2",
            priority: "low",
            status: "open",
            createdAt: tenDayOldTestDate.toISOString()
        };
        
        await request(app).post("/api/v1/tickets").send(testTicket);
        
        const res: Response = await request(app).get("/api/v1/tickets/35/urgency");
        expect(res.status).toBe(200);
        expect(res.body.data.urgencyLevel).toBe("Critical. Immediate attention required.");
        
        await request(app).delete("/api/v1/tickets/35");
    });

    it ("should calculate urgency score and age correctly", async () => {
        const tenDayOldTestDate = new Date();
        tenDayOldTestDate.setDate(tenDayOldTestDate.getDate() - 10);
        
        const testTicket = {
            id: 25,
            title: "Test 3",
            description: "Test 3",
            priority: "low",
            status: "open",
            createdAt: tenDayOldTestDate.toISOString()
        };
        
        await request(app).post("/api/v1/tickets").send(testTicket);
        
        const res: Response = await request(app).get("/api/v1/tickets/25/urgency");
        expect(res.status).toBe(200);
        expect(res.body.data.ticketAge).toBe(10);
        expect(res.body.data.urgencyScore).toBe(60);
        
        await request(app).delete("/api/v1/tickets/25");
    });
});