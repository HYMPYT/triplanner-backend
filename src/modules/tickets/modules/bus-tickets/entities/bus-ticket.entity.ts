import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BusTicket {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true, nullable: false })
	number?: string;
}