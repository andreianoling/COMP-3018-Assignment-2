import express, {Router} from "express";
import {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} from"../controllers/ticketController";