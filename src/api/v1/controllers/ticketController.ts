import { Request, Response } from "express";
import * as ticketService from "../services/ticketService";
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";
import { Ticket } from "../services/ticketService";

export const createTicket = async (req: Request, res: Response): Promise<void> => {
    const { id, title, description, priority, createdAt } = req.body;

    // if id is missing or not a number
    if (id === undefined || id === null) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: id" });
        return;
    }
    // Check if id is a number
    if (typeof id !== "number" || isNaN(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Field 'id' must be a valid number" });
        return;
    }
    // Check if ticket with the same id already exists
    if (ticketService.getTicketById(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "A ticket with this id already exists" });
        return;
    }
    // Validate required title field
    if (!title) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: title" });
        return;
    }
    // Validate required description field
    if (!description) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: description" });
        return;
    }
    // Validate required priority field
    const validPriorities = ["critical", "high", "medium", "low"];
    // Check if priority is missing or invalid
    if (!priority || !validPriorities.includes(priority)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid priority. Must be one of: critical, high, medium, low" });
        return;
    }

    // Create new ticket object
    const newTicket: Ticket = {
        id,
        title,
        description,
        priority,
        status: "open",
        createdAt: createdAt || new Date().toISOString()
    };

    await ticketService.createTicket(newTicket);
    res.status(HTTP_STATUS.CREATED).json({ message: "Ticket created successfully", data: newTicket });
}

export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
    // Get all tickets using the ticketService
    const tickets = ticketService.getAllTickets();
    res.status(HTTP_STATUS.OK).json({message: "All tickets retrieved successfully", data: tickets});
}

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
    // Extract ticket id from request
    const id = Number(req.params.id);
    // Get ticket by id using the ticketService
    const ticket = ticketService.getTicketById(id);
    
    // If ticket found, return it; otherwise return 404
    if (ticket) {
        res.status(HTTP_STATUS.OK).json({message: "Ticket retrieved successfully", data: ticket});
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Ticket not found"});
    }
}

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
    // Extract ticket id from request
    const id = Number(req.params.id);
    // Get updated ticket data from request body
    const updatedTicket: Ticket = req.body;
    // Update the ticket using the ticketService
    await ticketService.updateTicket(id, updatedTicket);
    res.status(HTTP_STATUS.OK).json({message: `Ticket with id ${id} updated successfully`, data: updatedTicket});
}

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
    // Extract ticket id from request
    const id = Number(req.params.id);
    // Delete the ticket using the ticketService
    await ticketService.deleteTicket(id);
    res.status(HTTP_STATUS.OK).json({message: `Ticket with id ${id} deleted successfully`});
}

export const calculateUrgency = async (req: Request, res: Response): Promise<void> => {
    // Extract ticket id from request
    const id = Number(req.params.id);
    // Calculate urgency using the ticketService
    const ticketWithUrgency = await ticketService.calculateUrgency(id);
    
    if (ticketWithUrgency) {
        res.status(HTTP_STATUS.OK).json({message: `Ticket urgency calculated`, data: ticketWithUrgency });
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Ticket not found"});
    }
}    