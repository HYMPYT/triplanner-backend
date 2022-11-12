import { ApiProperty } from '@nestjs/swagger';
import { FLIGHT_SEAT_CLASS } from 'src/common/enums/tickets/ticket.enum';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("flight_tickets")
export class FlightTicket {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ default: '777' })
	@Column({ unique: true, nullable: false })
	flightNumber: string;

	@ApiProperty({ enum: FLIGHT_SEAT_CLASS, default: FLIGHT_SEAT_CLASS.ECONOMY })
	@Column({
		type: 'enum',
		enum: FLIGHT_SEAT_CLASS,
		default: FLIGHT_SEAT_CLASS.ECONOMY,
	})
	classType: FLIGHT_SEAT_CLASS

	@OneToMany(() => Ticket, (ticket) => ticket.flightTicketInfo)
    tickets: Array<Ticket>
}