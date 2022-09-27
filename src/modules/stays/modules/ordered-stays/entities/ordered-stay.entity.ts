import { Stay } from 'src/modules/stays/entities/stay.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class OrderedStay {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

    @ManyToOne(() => User, (user) => user.orderedStays)
    user: User

    @OneToOne(() => Stay)
    @JoinColumn()
    stay: Stay
}