import { ApiProperty } from '@nestjs/swagger';
import { TICKET_TYPE } from 'src/common/enums/tickets/ticket.enum';
import { City } from 'src/modules/cities/entities/city.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BusTicket } from '../modules/bus-tickets/entities/bus-ticket.entity';
import { FlightTicket } from '../modules/flight-tickets/entities/flight-ticket.entity';
import { RailwayTicket } from '../modules/railway-tickets/entities/railway-ticket.entity';

@Entity('tickets')
export class Ticket {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ default: '2022-11-05' })
	@Column({ unique: false, nullable: false, type: 'timestamp without time zone' })
	departureTime: Date;

	@ApiProperty({ default: '2022-11-05' })
	@Column({ unique: false, nullable: false, type: 'timestamp without time zone' })
	arrivalTime: Date;

	@ApiProperty({ default: '4B' })
	@Column({ unique: false, nullable: false })
	place: string

	@ApiProperty({ default: '320.50' })
	@Column({ unique: false, nullable: true, type: 'decimal' })
	price: number

	@ApiProperty({ enum: TICKET_TYPE, default: TICKET_TYPE.FLIGHT })
	@Column({
		type: 'enum',
		enum: TICKET_TYPE,
		default: TICKET_TYPE.FLIGHT,
	})
	ticketType: TICKET_TYPE

	@ManyToOne(() => City, { cascade: true })
	from: City

	@ManyToOne(() => City, { cascade: true })
	to: City

	@ManyToOne(() => Company, { cascade: true })
	company: Company

	@ManyToOne(() => BusTicket, { cascade: true })
	busTicketInfo: BusTicket

	@ManyToOne(() => FlightTicket, { cascade: true })
	flightTicketInfo: FlightTicket

	@ManyToOne(() => RailwayTicket, { cascade: true })
	railwayTicketInfo: RailwayTicket
}