import { ApiProperty } from '@nestjs/swagger';
import { HOTEL_ROOM_TYPE } from 'src/common/enums/stays/stay.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hotel } from '../../hotels/entities/hotel.entity';

@Entity('rooms')
export class Room {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ default: '2' })
	@Column({ unique: false, nullable: false })
	beds?: number;

	@ApiProperty({ enum: HOTEL_ROOM_TYPE, default: HOTEL_ROOM_TYPE.APARTMENT })
    @Column({
		type: 'enum',
		enum: HOTEL_ROOM_TYPE,
		default: HOTEL_ROOM_TYPE.APARTMENT,
	})
	roomType?: HOTEL_ROOM_TYPE

	@ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
	@Column({ nullable: true })
	hotelId: string

    @ManyToOne(() => Hotel)
    hotel: Hotel
}