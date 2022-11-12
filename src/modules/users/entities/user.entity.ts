import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLES, USER_STATUS } from 'src/common/enums/users/user.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ApiProperty({ default: 'john' })
	@Column({ unique: false, nullable: false })
	firstName?: string;

	@ApiProperty({ default: 'john' })
	@Column({ unique: false, nullable: false })
	lastName?: string;

	@ApiProperty({ default: 'test22@gmail.com' })
	@Column({ unique: true, nullable: true })
	email?: string

	@ApiProperty({ default: 'qwerty12345' })
	@Column({ nullable: true })
	password?: string

	@ApiProperty({ default: 'uid' })
	@Column({ unique: false, nullable: true })
	providerId?: string

	@ApiProperty({ default: 'john' })
	@Column({ unique: false, nullable: true })
	loginProvider?: string

	@ApiProperty({ enum: USER_ROLES, default: USER_ROLES.USER })
	@Column({
		type: 'enum',
		enum: USER_ROLES,
		default: USER_ROLES.USER,
	})
	role?: USER_ROLES

	@ApiProperty({ enum: USER_STATUS, default: USER_STATUS.UNAPPROVED })
	@Column({
		type: 'enum',
		enum: USER_STATUS,
		default: USER_STATUS.UNAPPROVED,
		nullable: false,
	})
	status?: USER_STATUS
}