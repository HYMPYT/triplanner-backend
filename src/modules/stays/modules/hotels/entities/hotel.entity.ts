import { ApiProperty } from '@nestjs/swagger';
import { Amenity } from 'src/modules/amenities/entities/amenity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('hotels')
export class Hotel {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ default: 'Hotel Tashkonak Istanbul' })
	@Column({ unique: true, nullable: false })
	name?: string;

	@ApiProperty({ default: '4' })
    @Column({ unique: false, nullable: false })
	stars?: number;

	@ApiProperty({ default: 'Some description' })
    @Column({ unique: false, nullable: false })
	description?: string;

	@ApiProperty({ default: 'Fatih, Istanbul' })
    @Column({ unique: false, nullable: false })
	location?: string;

    @ManyToMany(() => Amenity)
    @JoinTable()
    amenities: Amenity[]
}