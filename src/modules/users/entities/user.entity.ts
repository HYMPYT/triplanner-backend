import { USER_ROLES, USER_STATUS } from 'src/common/enums/users/user.enum';
import { OrderedEntertainment } from 'src/modules/entertainment/modules/ordered-entertainment/entities/ordered-entertainment.entity';
import { OrderedTicket } from 'src/modules/tickets/modules/ordered-tickets/entities/ordered-ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: false, nullable: false })
	firstName?: string;

	@Column({ unique: false, nullable: false })
	lastName?: string;

	@Column({ unique: false, nullable: true })
	photoLink?: string

	@Column({ unique: false, nullable: true })
	age?: number

	@Column({ unique: true, nullable: true })
	email?: string

	@Column({ nullable: true })
	password?: string

	@Column({ unique: false, nullable: true })
	providerId?: string

	@Column({ unique: false, nullable: true })
	loginProvider?: string

	@Column({
		type: 'enum',
		enum: USER_ROLES,
		default: USER_ROLES.USER,
	})
	role?: USER_ROLES

	@Column({
		type: 'enum',
		enum: USER_STATUS,
		default: USER_STATUS.UNAPPROVED,
		nullable: false,
	})
	status?: USER_STATUS

	@OneToMany(() => OrderedTicket, (orderedTickets) => orderedTickets.user)
    orderedTickets: OrderedTicket[]

	@OneToMany(() => OrderedEntertainment, (orderedEntertainment) => orderedEntertainment.user)
    orderedEntertainment: OrderedEntertainment[]
}