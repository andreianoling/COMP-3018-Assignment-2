import { Request, Response } from "express";
import * as ticketService from "../services/ticketService";
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";
import { Ticket } from "../services/ticketService";

export const createTicket = async (req: Request, res: Response): Promise<void> => {
    const { id, title, description, priority } = req.body;

    if (id === undefined || id === null) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: id" });
        return;
    }
    if (typeof id !== "number" || isNaN(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Field 'id' must be a valid number" });
        return;
    }
    if (ticketService.getTicketById(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "A ticket with this id already exists" });
        return;
    }
    if (!title) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: title" });
        return;
    }
    if (!description) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: description" });
        return;
    }
    const validPriorities = ["critical", "high", "medium", "low"];
    if (!priority || !validPriorities.includes(priority)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid priority. Must be one of: critical, high, medium, low" });
        return;
    }

    const newTicket: Ticket = {
        id,
        title,
        description,
        priority,
        status: "open",
        createdAt: new Date().toISOString()
    };

    await ticketService.createTicket(newTicket);
    res.status(HTTP_STATUS.CREATED).json({ message: "Ticket created successfully", data: newTicket });
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

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const updatedTicket: Ticket = req.body;
    ticketService.updateTicket(id, updatedTicket);
    res.status(HTTP_STATUS.OK).json({message: `Ticket with id ${id} updated successfully`, data: updatedTicket});
}

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    await ticketService.deleteTicket(id);
    res.status(HTTP_STATUS.OK).json({message: `Ticket with id ${id} deleted successfully`});
}

export const calculateUrgency = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const ticketWithUrgency = ticketService.calculateUrgency(id);
    
    if (ticketWithUrgency) {
        res.status(HTTP_STATUS.OK).json({message: `Ticket urgency calculated`, data: ticketWithUrgency });
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Ticket not found"});
    }
}    