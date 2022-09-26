import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class OrderedTicket {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true, nullable: false })
	name?: string;

    @ManyToOne(() => User, (user) => user.orderedTickets)
    user: User

    @OneToOne(() => Ticket)
    @JoinColumn()
    ticket: Ticket
}