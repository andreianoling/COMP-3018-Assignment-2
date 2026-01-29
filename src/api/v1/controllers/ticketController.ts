import { Request, Response } from "express";
import * as ticketService from "../services/ticketService";
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";

export const createTicket = async (req: Request, res: Response): Promise<void> => {
    const newTicket: string = req.body;
    ticketService.createTicket(newTicket);
    res.status(HTTP_STATUS.CREATED).json({message: "Ticket created successfully", data: newTicket});
}

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

export const deleteTicket = (req: Request, res: Response): void => {
    const {id} = req.params;
    ticketService.deleteTicket(id);
    res.status(HTTP_STATUS.OK).json({message: `Ticket with id ${id} deleted successfully`});
}