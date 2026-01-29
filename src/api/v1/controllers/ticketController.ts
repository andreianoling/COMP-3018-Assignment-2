import { Request, Response } from "express";
import * as ticketService from "../servcies/ticketService";

export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
    const tickets = ticketService.getAllTickets();
    res.status(200).json({message: "All tickets retrieved successfully", data: tickets});
}

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const ticket = ticketService.getTicketById(id);
    
    if (ticket) {
        res.status(200).json({message: "Ticket retrieved successfully", data: ticket});
    } else {
        res.status(404).json({message: "Ticket not found"});
    }
}