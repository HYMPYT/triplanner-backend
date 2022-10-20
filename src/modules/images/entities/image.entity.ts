import { Car } from 'src/modules/cars/entities/car.entity';
import { Entertainment } from 'src/modules/entertainment/entities/entertainment.entity';
import { Hotel } from 'src/modules/stays/modules/hotels/entities/hotel.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    imagePath?: string;

    @Column({ nullable: true })
    carId: string

    @ManyToOne(() => Car, { nullable: true })
    car: Car

    @Column({ nullable: true })
    entertainmentId: string

    @ManyToOne(() => Entertainment, { nullable: true })
    entertainment: Entertainment

    @Column({ nullable: true })
    hotelId: string

    @ManyToOne(() => Hotel, { nullable: true })
    hotel: Hotel
}