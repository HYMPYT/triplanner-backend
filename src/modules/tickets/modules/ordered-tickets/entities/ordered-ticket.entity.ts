import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class OrderedTicket {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

    @ManyToOne(() => User, (user) => user.orderedTickets)
    user: User

    @OneToOne(() => Ticket)
    @JoinColumn()
    ticket: Ticket
}