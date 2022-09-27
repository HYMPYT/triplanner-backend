import { Car } from 'src/modules/cars/entities/car.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class RentedCar {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToOne(() => Car)
    @JoinColumn()
    car: Car
}