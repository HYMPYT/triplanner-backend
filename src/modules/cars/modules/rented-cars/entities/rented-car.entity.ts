import { ApiProperty } from '@nestjs/swagger';
import { Car } from 'src/modules/cars/entities/car.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';

@Entity('rented_cars')
export class RentedCar {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ApiProperty({ default: "3564a7be-7e8f-4c1a-9662-8d0418e99644" })
    @Column({ nullable: true })
    userId: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @ApiProperty({ default: "3564a7be-7e8f-4c1a-9662-8d0418e99644" })
    @Column({ nullable: true })
    carId: string

    @OneToOne(() => Car)
    @JoinColumn()
    car: Car
}