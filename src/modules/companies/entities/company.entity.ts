import { Car } from 'src/modules/cars/entities/car.entity';
import { Entertainment } from 'src/modules/entertainment/entities/entertainment.entity';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Company {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false })
	name: string;

    @Column({ unique: false, nullable: true })
	shortName?: string;

    @OneToMany(() => Ticket, (ticket) => ticket.company)
    tickets: Ticket[]

	@OneToMany(() => Car, (car) => car.company)
    cars: Car[]

	@OneToMany(() => Entertainment, (entertainment) => entertainment.company)
    entertainment: Entertainment[]
}