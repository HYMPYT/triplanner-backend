import { Stay } from 'src/modules/stays/entities/stay.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class OrderedStay {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

    @Column({ nullable: true })
	userId: string

    @ManyToOne(() => User)
    user: User

    @Column({ nullable: true })
	stayId: string

    @OneToOne(() => Stay)
    @JoinColumn()
    stay: Stay
}