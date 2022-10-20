import { STAY_TYPE } from 'src/common/enums/stays/stay.enum';
import { City } from 'src/modules/cities/entities/city.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';

@Entity()
@Unique("STAY_INFO", ["stayId", "stayType"])
export class Stay {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: false, nullable: false })
	arrivalDate?: Date;

	@Column({ unique: false, nullable: false })
	departureDate?: Date;

	@Column({ unique: false, nullable: false })
	price?: number

	@Column({ unique: false, nullable: true })
	childPrice?: number

	@Column({ unique: false, nullable: false })
	rating?: number

	@Column({ unique: false, nullable: false, default: false })
	isBooked?: boolean

	@Column({ unique: false, nullable: false })
	stayId?: string

	@Column({
		type: 'enum',
		enum: STAY_TYPE,
		default: STAY_TYPE.HOTEL_ROOM,
	})
	stayType?: STAY_TYPE

	@Column({ nullable: true })
	cityId: string

	@ManyToOne(() => City, { nullable: true })
	city: City
}