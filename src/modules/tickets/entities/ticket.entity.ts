import { TICKET_TYPE } from 'src/common/enums/tickets/ticket.enum';
import { City } from 'src/modules/cities/entities/city.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BusTicket } from '../modules/bus-tickets/entities/bus-ticket.entity';
import { FlightTicket } from '../modules/flight-tickets/entities/flight-ticket.entity';
import { RailwayTicket } from '../modules/railway-tickets/entities/railway-ticket.entity';

@Entity()
export class Ticket {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: false, nullable: false })
	departureTime: Date;

	@Column({ unique: false, nullable: false })
	arrivalTime: Date;

	@Column({ unique: false, nullable: false })
	place: string

	@Column({ unique: false, nullable: false })
	price: number

	@Column({
		type: 'enum',
		enum: TICKET_TYPE,
		default: TICKET_TYPE.FLIGHT,
	})
	ticketType: TICKET_TYPE

	@ManyToOne(() => City, (city) => city.fromTickets, { cascade: true })
	from: City

	@ManyToOne(() => City, (city) => city.toTickets, { cascade: true })
	to: City

	@ManyToOne(() => Company, (company) => company.tickets, { cascade: true })
	company: Company

	@ManyToOne(() => BusTicket, (busTicket) => busTicket.tickets, { cascade: true })
	busTicketInfo: BusTicket

	@ManyToOne(() => FlightTicket, (flightTicket) => flightTicket.tickets, { cascade: true })
	flightTicketInfo: FlightTicket

	@ManyToOne(() => RailwayTicket, (railwayTicket) => railwayTicket.tickets, { cascade: true })
	railwayTicketInfo: RailwayTicket
}