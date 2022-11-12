import { ApiProperty } from '@nestjs/swagger';
import { RAILWAY_CARRIAGE_TYPE, RAILWAY_SEAT_CLASS } from 'src/common/enums/tickets/ticket.enum';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("railway_tickets")
export class RailwayTicket {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ default: '147k' })
	@Column({ unique: true, nullable: false })
	trainNumber: string;

	@ApiProperty({ default: '10' })
    @Column({ unique: false, nullable: false })
	carriageNumber: number;

	@ApiProperty({ enum: RAILWAY_SEAT_CLASS, default: RAILWAY_SEAT_CLASS.SECOND })
	@Column({
		type: 'enum',
		enum: RAILWAY_SEAT_CLASS,
		default: RAILWAY_SEAT_CLASS.SECOND,
	})
	classType: RAILWAY_SEAT_CLASS

	@ApiProperty({ enum: RAILWAY_CARRIAGE_TYPE, default: RAILWAY_CARRIAGE_TYPE.OPEN_COMPARTMENT })
    @Column({
		type: 'enum',
		enum: RAILWAY_CARRIAGE_TYPE,
		default: RAILWAY_CARRIAGE_TYPE.OPEN_COMPARTMENT,
	})
	carriageType: RAILWAY_CARRIAGE_TYPE

	@OneToMany(() => Ticket, (ticket) => ticket.railwayTicketInfo)
    tickets: Array<Ticket>
}