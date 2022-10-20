import { Entertainment } from 'src/modules/entertainment/entities/entertainment.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class OrderedEntertainment {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

    @Column({ nullable: true })
	userId: string

    @ManyToOne(() => User)
    user: User

    @Column({ nullable: true })
	entertainmentId: string
    
    @OneToOne(() => Entertainment)
    @JoinColumn()
    entertainment: Entertainment
}