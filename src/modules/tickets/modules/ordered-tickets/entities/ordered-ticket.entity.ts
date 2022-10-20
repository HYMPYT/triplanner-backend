import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class OrderedTicket {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ nullable: true })
    userId: string

    @ManyToOne(() => User)
    user: User

    @Column({ nullable: true })
    ticketId: string

    @OneToOne(() => Ticket)
    @JoinColumn()
    ticket: Ticket
}