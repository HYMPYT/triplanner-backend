import { ApiProperty } from '@nestjs/swagger';
import { City } from 'src/modules/cities/entities/city.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('countries')
export class Country {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ default: 'Kyiv' })
	@Column({ unique: true, nullable: false })
	name: string;

	@OneToMany(() => City, (city) => city.country)
    cities: Array<City>
}