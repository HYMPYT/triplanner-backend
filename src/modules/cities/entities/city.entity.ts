import { Car } from 'src/modules/cars/entities/car.entity';
import { Country } from 'src/modules/countries/entities/country.entity';
import { Entertainment } from 'src/modules/entertainment/entities/entertainment.entity';
import { Stay } from 'src/modules/stays/entities/stay.entity';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class City {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true, nullable: false })
	name?: string;

    @Column({ unique: true, nullable: false })
	currency?: string;

    @Column({ unique: false, nullable: false })
	language?: string;

    @ManyToOne(() => Country, (country) => country.cities)
    country: Country

    @OneToMany(() => Ticket, (ticket) => ticket.from)
    fromTickets: Ticket[]

    @OneToMany(() => Ticket, (ticket) => ticket.to)
    toTickets: Ticket[]

    @OneToMany(() => Car, (car) => car.city)
    cars: Car[]

    @OneToMany(() => Entertainment, (entertainment) => entertainment.city)
    entertainment: Entertainment[]

    @OneToMany(() => Stay, (stay) => stay.city)
    stays: Stay[]
}