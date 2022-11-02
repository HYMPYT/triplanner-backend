import { FLIGHT_SEAT_CLASS } from 'src/common/enums/tickets/ticket.enum';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("flight_ticket")
export class FlightTicket {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false })
	flightNumber: string;

	@Column({
		type: 'enum',
		enum: FLIGHT_SEAT_CLASS,
		default: FLIGHT_SEAT_CLASS.ECONOMY,
	})
	classType: FLIGHT_SEAT_CLASS

	@OneToMany(() => Ticket, (ticket) => ticket.flightTicketInfo)
    tickets: Array<Ticket>
}