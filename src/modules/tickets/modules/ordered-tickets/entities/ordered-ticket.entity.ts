import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, Column } from 'typeorm';

@Entity('ordered_tickets')
export class OrderedTicket {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
    @Column({ nullable: true })
    userId: string

    @ManyToOne(() => User)
    user: User

    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
    @Column({ nullable: true })
    ticketId: string

    @OneToOne(() => Ticket)
    @JoinColumn()
    ticket: Ticket
}