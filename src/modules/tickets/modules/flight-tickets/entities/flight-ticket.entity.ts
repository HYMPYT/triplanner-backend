import { FLIGHT_SEAT_CLASS } from 'src/common/enums/tickets/ticket.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FlightTicket {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true, nullable: false })
	flightNumber?: string;

	@Column({
		type: 'enum',
		enum: FLIGHT_SEAT_CLASS,
		default: FLIGHT_SEAT_CLASS.ECONOMY,
	})
	classType?: FLIGHT_SEAT_CLASS
}