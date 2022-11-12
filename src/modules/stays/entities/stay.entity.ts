import { ApiProperty } from '@nestjs/swagger';
import { STAY_TYPE } from 'src/common/enums/stays/stay.enum';
import { City } from 'src/modules/cities/entities/city.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';

@Entity('stays')
@Unique("STAY_INFO", ["stayId", "stayType"])
export class Stay {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ default: '2022-11-054' })
	@Column({ unique: false, nullable: false })
	arrivalDate?: Date;

	@ApiProperty({ default: '2022-11-05' })
	@Column({ unique: false, nullable: false })
	departureDate?: Date;

	@ApiProperty({ default: '500' })
	@Column({ unique: false, nullable: false })
	price?: number

	@ApiProperty({ default: '320' })
	@Column({ unique: false, nullable: true })
	childPrice?: number

	@ApiProperty({ default: '4.7' })
	@Column({ unique: false, nullable: false })
	rating?: number

	@ApiProperty({ default: false })
	@Column({ unique: false, nullable: false, default: false })
	isBooked?: boolean

	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	@Column({ unique: false, nullable: false })
	stayId?: string

	@ApiProperty({ enum: STAY_TYPE, default: STAY_TYPE.HOTEL_ROOM })
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