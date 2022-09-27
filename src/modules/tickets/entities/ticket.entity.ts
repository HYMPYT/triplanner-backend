import { TICKET_TYPE } from 'src/common/enums/tickets/ticket.enum';
import { City } from 'src/modules/cities/entities/city.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';

@Entity()
@Unique("TICKET_INFO", ["ticketId", "ticketType"])
export class Ticket {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: false, nullable: false })
	departureTime?: Date;

	@Column({ unique: false, nullable: false })
	arrivalTime?: Date;

	@Column({ unique: false, nullable: true })
	place?: string

	@Column({ unique: false, nullable: true })
	price?: number

    @Column({ unique: false, nullable: false })
	ticketId?: string

	@Column({
		type: 'enum',
		enum: TICKET_TYPE,
		default: TICKET_TYPE.FLIGHT,
	})
	ticketType?: TICKET_TYPE

    @ManyToOne(() => City, (city) => city.fromTickets)
    from: City

    @ManyToOne(() => City, (city) => city.toTickets)
    to: City

    @ManyToOne(() => Company, (company) => company.tickets)
    company: Company
}