import { Request, Response } from "express";
import * as ticketService from "../services/ticketService";
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";

export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
    const tickets = ticketService.getAllTickets();
    res.status(HTTP_STATUS.OK).json({message: "All tickets retrieved successfully", data: tickets});
}

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const ticket = ticketService.getTicketById(id);
    
    if (ticket) {
        res.status(HTTP_STATUS.OK).json({message: "Ticket retrieved successfully", data: ticket});
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Ticket not found"});
    }
}