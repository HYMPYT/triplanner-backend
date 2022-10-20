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

	@Column({ unique: false, nullable: false, type: 'timestamp without time zone' })
	departureTime: Date;

	@Column({ unique: false, nullable: false, type: 'timestamp without time zone' })
	arrivalTime: Date;

	@Column({ unique: false, nullable: false })
	place: string

	//TODO Change nullable to true
	@Column({ unique: false, nullable: true, type: 'decimal' })
	price: number

	@Column({
		type: 'enum',
		enum: TICKET_TYPE,
		default: TICKET_TYPE.FLIGHT,
	})
	ticketType: TICKET_TYPE

	@Column({ nullable: true })
	fromId: string

	@ManyToOne(() => City, { cascade: true })
	from: City

	@Column({ nullable: true })
	toId: string

	@ManyToOne(() => City, { cascade: true })
	to: City

	@Column({ nullable: true })
	companyId: string

	@ManyToOne(() => Company, { cascade: true })
	company: Company

	@Column({ nullable: true })
	busTicketInfoId: string

	@ManyToOne(() => BusTicket, { cascade: true })
	busTicketInfo: BusTicket

	@Column({ nullable: true })
	flightTicketInfoId: string

	@ManyToOne(() => FlightTicket, { cascade: true })
	flightTicketInfo: FlightTicket

	@Column({ nullable: true })
	railwayTicketInfoId: string

	@ManyToOne(() => RailwayTicket, { cascade: true })
	railwayTicketInfo: RailwayTicket
}