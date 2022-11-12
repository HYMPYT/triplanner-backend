import { CURRENCY_CODE } from 'src/common/enums/cities/currency-code.enum';
import { Country } from 'src/modules/countries/entities/country.entity';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Locale } from 'locale-enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cities')
export class City {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ApiProperty({ default: 'Kyiv' })
    @Column({ unique: true, nullable: false })
    name?: string;

    @ApiProperty({ enum: CURRENCY_CODE, default: CURRENCY_CODE.UAH })
    @Column({
        type: 'enum',
        enum: CURRENCY_CODE,
        default: CURRENCY_CODE.UAH,
    })
    currency?: CURRENCY_CODE

    @ApiProperty({ enum: Locale, default: Locale.uk_UA })
    @Column({
        type: 'enum',
        enum: Locale,
        default: Locale.uk_UA,
    })
    language?: Locale

    @ManyToOne(() => Country, { cascade: true })
    country: Country

    @OneToMany(() => Ticket, (ticket) => ticket.from)
    ticketsFrom: Array<Ticket>

    @OneToMany(() => Ticket, (ticket) => ticket.to)
    ticketsTo: Array<Ticket>
}