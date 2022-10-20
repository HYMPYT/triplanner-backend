import { CAR_TYPE } from 'src/common/enums/cars/car.enum';
import { City } from 'src/modules/cities/entities/city.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Car {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: false, nullable: false })
	model?: string;

	@Column({ unique: false, nullable: false })
	price?: number;

	@Column({ unique: false, nullable: false })
	receiptPlace?: string

	@Column({ unique: false, nullable: true })
	returnPlace?: string

	@Column({
		type: 'enum',
		enum: CAR_TYPE,
		default: CAR_TYPE.GASOLINE,
	})
	type?: CAR_TYPE

	@Column({ nullable: true })
	cityId: string

	@ManyToOne(() => City)
	city: City

	@Column({ nullable: true })
	companyId: string

	@ManyToOne(() => Company)
	company: Company
}