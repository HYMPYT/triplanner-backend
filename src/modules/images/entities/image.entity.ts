import { ApiProperty } from '@nestjs/swagger';
import { Car } from 'src/modules/cars/entities/car.entity';
import { Entertainment } from 'src/modules/entertainment/entities/entertainment.entity';
import { Hotel } from 'src/modules/stays/modules/hotels/entities/hotel.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ default: 'path' })
    @Column({ unique: true, nullable: false })
    imagePath?: string;

    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
    @Column({ nullable: true })
    carId: string

    @ManyToOne(() => Car, { nullable: true })
    car: Car

    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
    @Column({ nullable: true })
    entertainmentId: string

    @ManyToOne(() => Entertainment, { nullable: true })
    entertainment: Entertainment

    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
    @Column({ nullable: true })
    hotelId: string

    @ManyToOne(() => Hotel, { nullable: true })
    hotel: Hotel
}