import { Car } from 'src/modules/cars/entities/car.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class RentedCar {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

    @Column({ nullable: true })
	userId: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column({ nullable: true })
	carId: string

    @OneToOne(() => Car)
    @JoinColumn()
    car: Car
}