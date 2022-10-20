import { HOTEL_ROOM_TYPE } from 'src/common/enums/stays/stay.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hotel } from '../../hotels/entities/hotel.entity';

@Entity()
export class Room {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: false, nullable: false })
	beds?: number;

    @Column({
		type: 'enum',
		enum: HOTEL_ROOM_TYPE,
		default: HOTEL_ROOM_TYPE.APARTMENT,
	})
	roomType?: HOTEL_ROOM_TYPE

	@Column({ nullable: true })
	hotelId: string

    @ManyToOne(() => Hotel)
    hotel: Hotel
}