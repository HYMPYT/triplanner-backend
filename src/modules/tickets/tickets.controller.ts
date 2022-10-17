import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';
import { Response } from 'express'
import { CreateTicketResponseDto } from './dto/create-ticket-response.dto';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Ticket } from './entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post()
    async createTicket(
        @Body() createTicketDto: CreateTicketDto,
        @Res() res: Response
    ) {
        try {
            const ticket: CreateTicketResponseDto = await this.ticketsService.createTicket(createTicketDto)

            if (ticket) {
                res.status(HttpStatus.CREATED).json(ticket)
            } else {
                res.sendStatus(HttpStatus.BAD_REQUEST)
            }
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    async getAllTickets(@Res() res: Response) {
        try {
            const tickets: Array<Ticket> = await this.ticketsService.getAllTickets()
            res.status(HttpStatus.OK).json(tickets)
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }
}
