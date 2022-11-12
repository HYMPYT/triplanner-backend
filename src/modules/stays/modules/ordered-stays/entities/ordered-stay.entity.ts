import { ApiProperty } from '@nestjs/swagger';
import { Stay } from 'src/modules/stays/entities/stay.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, Column } from 'typeorm';

@Entity('ordered_stays')
export class OrderedStay {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
    @Column({ nullable: true })
	userId: string

    @ManyToOne(() => User)
    user: User

    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
    @Column({ nullable: true })
	stayId: string

    @OneToOne(() => Stay)
    @JoinColumn()
    stay: Stay
}