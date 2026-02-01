import request, { Response } from "supertest";
import app from "../src/app";

describe("Urgency Calculation Function", () => {
    it ("should handle non-existent ticket", async () => {
        const res: Response = await request(app).get("/api/v1/tickets/999/urgency");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Ticket not found");
    });

    it("should assign correct urgency level", async () => {
        const res: Response = await request(app).get("/api/v1/tickets/1/urgency");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("urgencyLevel", "Low urgency. Address when capacity allows.");
    });

});