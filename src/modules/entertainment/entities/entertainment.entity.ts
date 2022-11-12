import { ApiProperty } from '@nestjs/swagger';
import { City } from 'src/modules/cities/entities/city.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('entertainment')
export class Entertainment {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ApiProperty({ default: 'quad bikes' })
	@Column({ unique: false, nullable: false })
	name?: string;

	@ApiProperty({ default: 'description' })
	@Column({ unique: false, nullable: false })
	description?: string;

	@ApiProperty({ default: '100' })
	@Column({ unique: false, nullable: false })
	price?: number

	@ApiProperty({ default: '90' })
	@Column({ unique: false, nullable: true })
	childPrice?: number

	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	@Column({ nullable: true })
	cityId: string

    @ManyToOne(() => City)
    city: City

	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	@Column({ nullable: true })
	companyId: string

    @ManyToOne(() => Company)
    company: Company
}