import express, {Router} from "express";
import {createTicket, getAllTickets, getTicketById, deleteTicket} from "../controllers/ticketController";

const router: Router = express.Router();

router.post("/", createTicket);

router.get("/", getAllTickets);

router.get("/:id", getTicketById);

router.delete("/:id", deleteTicket);

export default router;