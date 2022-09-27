import { Car } from 'src/modules/cars/entities/car.entity';
import { Entertainment } from 'src/modules/entertainment/entities/entertainment.entity';
import { Hotel } from 'src/modules/stays/modules/hotels/entities/hotel.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Image {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true, nullable: false })
	imagePath?: string;

    @ManyToOne(() => Car, (car) => car.images)
    car?: Car

    @ManyToOne(() => Entertainment, (entertainment) => entertainment.images)
    entertainment?: Entertainment

    @ManyToOne(() => Hotel, (hotel) => hotel.images)
    hotel?: Hotel
}