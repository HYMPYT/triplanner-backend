import { Entertainment } from 'src/modules/entertainment/entities/entertainment.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class OrderedEntertainment {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

    @ManyToOne(() => User, (user) => user.orderedEntertainment)
    user: User

    @OneToOne(() => Entertainment)
    @JoinColumn()
    entertainment: Entertainment
}