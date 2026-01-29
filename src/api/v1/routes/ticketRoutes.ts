import express, {Router} from "express";
import {getAllTickets, getTicketById} from "../controllers/ticketController";

const router: Router = express.Router();

router.get("/", getAllTickets);

router.get("/:id", getTicketById);

export default router;