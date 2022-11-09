import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("bus_ticket")
export class BusTicket {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ default: '123' })
	@Column({ unique: true, nullable: false })
	number: string;

	@OneToMany(() => Ticket, (ticket) => ticket.busTicketInfo)
    tickets: Array<Ticket>
}