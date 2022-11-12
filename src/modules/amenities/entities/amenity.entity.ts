import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('amenities')
export class Amenity {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true, nullable: false })
	name?: string;

    @Column({ unique: false, nullable: false, default: false })
	isFree?: boolean;
}