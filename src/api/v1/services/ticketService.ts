export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string;
}

// Extended interface for urgency calculation
export interface TicketWithUrgency extends Ticket {
    ticketAge: number;
    urgencyScore: number;
    urgencyLevel: string;
}

// Hardcoded ticket array
export const ticketArray: Ticket[] = [
    {id: 1, title: "Update footer copyright year", description: "Footer still shows 2024", priority: "low", status: "open", createdAt:"2025-01-12T10:00:00.000Z"},
    {id: 2, title: "Profile picture upload slow", description: "Upload takes 30+ seconds", priority: "medium", status: "open", createdAt:"2025-01-13T10:00:00.000Z"},
    {id: 3, title: "Dashboard loading slowly", description: "Dashboard takes 10+ seconds to load", priority: "medium", status: "open", createdAt:"2025-01-09T10:00:00.000Z"},
    {id: 4, title: "Password reset email delayed", description: "Reset emails taking over 30 minutes", priority: "high", status: "open", createdAt:"2025-01-10T10:00:00.000Z"},
    {id: 5, title: "Export to PDF not working", description: "PDF export fails silently", priority: "high", status: "open", createdAt:"2025-01-06T10:00:00.000Z"},
    {id: 6, title: "Login page not loading", description: "Users report blank screen on login", priority: "critical", status: "open", createdAt:"2025-01-09T10:00:00.000Z"},
    {id: 7, title: "Dark mode toggle broken", description: "Dark mode doesn't persist after refresh", priority: "medium", status: "resolved", createdAt:"2025-01-05T10:00:00.000Z"}
]; 


export const createTicket = (ticket: Ticket): void => {
    // Add the new ticket to the array
    ticketArray.push(ticket);
}

export const getAllTickets = (): Ticket[] => {
    // Return all tickets
    return ticketArray;
}

export const getTicketById = (id: number): Ticket | undefined => {
    // Find and return the ticket with the given id
    return ticketArray.find(ticket => ticket.id === id);
}

export const updateTicket = (id: number, updatedTicket: Ticket): void => {
    // Find the index of the ticket to be updated
    const index = ticketArray.findIndex(ticket => ticket.id === id);
    // Checks if ticket exists (is not -1)
    if (index !== -1) {
        // Update the ticket at the found index
        ticketArray[index] = updatedTicket;
    }
}

export const deleteTicket = (id: number): void => {
    // Find the index of the ticket to be deleted
    const index = ticketArray.findIndex(ticket => ticket.id === id);
    // Checks if ticket exists (is not -1)
    if (index !== -1) {
        // Uses splice to remove the one ticket
        ticketArray.splice(index, 1);
    }
}

export const calculateUrgency = (id: number): TicketWithUrgency | undefined => {
    const ticket = getTicketById(id);

    // If ticket not found, return undefined which will lead to 404 response
    if (!ticket) {
        return undefined;
    }

    // Calculate ticket age in days
    const currentDate = new Date();
    const createdDate = new Date(ticket.createdAt);
    const ticketAge = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

    // Determine base urgency value
    let baseUrgency: number;
    if (ticket.priority === "critical") {
        baseUrgency = 50;
    } else if (ticket.priority === "high") {
        baseUrgency = 30;
    } else if (ticket.priority === "medium") {
        baseUrgency = 20;
    } else if (ticket.priority === "low") {
        baseUrgency = 10;
    } else {
        baseUrgency = NaN; // Invalid priority, however should not happen
    }

    // Calculate urgency score - if resolved, score is 0
    let urgencyScore: number;
    if (ticket.status === "resolved") {
        urgencyScore = 0;
    } else {
        urgencyScore = baseUrgency + (ticketAge * 5);
    }

    // Determine urgency level
    let urgencyLevel: string;
    if (ticket.status === "resolved") {
        urgencyLevel = "Minimal. Ticket resolved.";
    } else if (ticket.priority === "critical") {
        urgencyLevel = "Critical. Immediate attention required.";
    } else if (ticket.priority === "high") {
        urgencyLevel = "High Urgency. Prioritize resolution.";
    } else if (ticket.priority === "medium") {
        urgencyLevel = "Moderate. Suitable for attention.";
    } else if (ticket.priority === "low") {
        urgencyLevel = "Low urgency. Address when capacity allows.";
    } else {
        urgencyLevel = "Unknown priority level.";
    }

    return {
        ...ticket,
        ticketAge,
        urgencyScore,
        urgencyLevel
    };
}
