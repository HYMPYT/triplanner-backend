import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50
  })
  lastName: string;

  @Column()
  age: number

  @Column({
    type: 'varchar',
    length: 100
  })
  email: string

  @Column({
    type: 'varchar',
    length: 100
  })
  password: string

  @Column()
  role: string
}