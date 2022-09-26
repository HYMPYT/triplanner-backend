import { RAILWAY_CARRIAGE_TYPE, RAILWAY_SEAT_CLASS } from 'src/common/enums/tickets/ticket.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RailwayTicket {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true, nullable: false })
	trainNumber?: string;

    @Column({ unique: false, nullable: false })
	carriageNumber?: number;

	@Column({
		type: 'enum',
		enum: RAILWAY_SEAT_CLASS,
		default: RAILWAY_SEAT_CLASS.SECOND,
	})
	classType?: RAILWAY_SEAT_CLASS

    @Column({
		type: 'enum',
		enum: RAILWAY_CARRIAGE_TYPE,
		default: RAILWAY_CARRIAGE_TYPE.OPEN_COMPARTMENT,
	})
	carriageType?: RAILWAY_CARRIAGE_TYPE
}