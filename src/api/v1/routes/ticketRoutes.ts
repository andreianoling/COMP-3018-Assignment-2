import express, {Router} from "express";
import {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} from"../controllers/ticketController";

const router: Router = express.Router();

router.get("/tickets", getAllTickets);

router.get("/tickets/:id", getTicketById);

export default router;