import { Amenity } from 'src/modules/amenities/entities/amenity.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class Hotel {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true, nullable: false })
	name?: string;

    @Column({ unique: false, nullable: false })
	stars?: number;

    @Column({ unique: false, nullable: false })
	description?: string;

    @Column({ unique: false, nullable: false })
	location?: string;

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[]

    @OneToMany(() => Image, (image) => image.hotel)
    images: Image[]

    @ManyToMany(() => Amenity)
    @JoinTable()
    amenities: Amenity[]
}