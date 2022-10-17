import { CURRENCY_CODE } from 'src/common/enums/cities/currency-code.enum';
import { Car } from 'src/modules/cars/entities/car.entity';
import { Country } from 'src/modules/countries/entities/country.entity';
import { Entertainment } from 'src/modules/entertainment/entities/entertainment.entity';
import { Stay } from 'src/modules/stays/entities/stay.entity';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Locale } from 'locale-enum';

@Entity()
export class City {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ unique: true, nullable: false })
    name?: string;

    @Column({
        type: 'enum',
        enum: CURRENCY_CODE,
        default: CURRENCY_CODE.UAH,
    })
    currency?: CURRENCY_CODE

    @Column({
        type: 'enum',
        enum: Locale,
        default: Locale.uk_UA,
    })
    language?: Locale

    @ManyToOne(() => Country, (country) => country.cities, { cascade: true })
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