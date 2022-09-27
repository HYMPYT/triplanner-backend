import { City } from 'src/modules/cities/entities/city.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Entertainment {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: false, nullable: false })
	name?: string;

	@Column({ unique: false, nullable: false })
	description?: string;

	@Column({ unique: false, nullable: false })
	price?: number

	@Column({ unique: false, nullable: true })
	childPrice?: number

    @ManyToOne(() => City, (city) => city.entertainment)
    city: City

    @ManyToOne(() => Company, (company) => company.entertainment)
    company: Company

	@OneToMany(() => Image, (image) => image.entertainment)
    images: Image[]
}