import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('companies')
export class Company {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ default: 'Airbus' })
	@Column({ unique: true, nullable: false })
	name: string;

	@ApiProperty({ default: 'Airbus', required: false })
    @Column({ unique: false, nullable: true })
	shortName?: string;

	@OneToMany(() => Ticket, (ticket) => ticket.company)
    tickets: Array<Ticket>
}