import { Body, Controller, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';
import { Response } from 'express'
import { CreateTicketResponseDto } from './dto/create-ticket-response.dto';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Ticket } from './entities/ticket.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger/dist';
import RoleAuth from 'src/guards/decorators/roles.decorator';
import { USER_ROLES } from 'src/common/enums/users/user.enum';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @ApiCreatedResponse({ description: 'Ticket has been created' })
	@ApiBadRequestResponse({ description: 'Ticket info has already been created' })
	@ApiOperation({ summary: '[ALL] Create ticket' })
	@ApiOkResponse({ type: CreateTicketResponseDto })
    @ApiBearerAuth()
    @RoleAuth([USER_ROLES.ADMIN, USER_ROLES.MODERATOR])
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

    @ApiOperation({ summary: '[ADMIN] Get all tickets' })
	@ApiBearerAuth()
	@RoleAuth([USER_ROLES.ADMIN])
    @Get()
    async getAllTickets(@Res() res: Response) {
        try {
            const tickets: Array<Ticket> = await this.ticketsService.getAllTickets()
            res.status(HttpStatus.OK).json(tickets)
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOkResponse({ type: [Ticket] })
	@ApiCreatedResponse({ description: "I'm looking for..." })
	@ApiBadRequestResponse({ description: 'Wrong parameters' })
	@ApiOperation({ summary: '[ALL] Get tickets' })
    @Get('search')
    async search(@Query() query: {
        fromId: string,
        toId?: string,
        dDate?: string,
        rDate?: string,
    }, @Res() res: Response) {
        try {
            const tickets: Array<Ticket> = await this.ticketsService.search(
                query.fromId,
                query.toId,
                Date.parse(query.dDate) || 0,
                Date.parse(query.rDate) || 0
            )
            res.status(HttpStatus.OK).json(tickets)
        } catch (e) {
            res.sendStatus(HttpStatus.BAD_REQUEST)
        }
    }
}
