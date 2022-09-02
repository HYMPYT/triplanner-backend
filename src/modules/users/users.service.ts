import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: Repository<User>) { }

    async create(dto: CreateUserDto): Promise<User> {
        const user = new User()

        user.firstName = dto.firstName
        user.lastName = dto.lastName
        user.age = dto.age
        user.email = dto.email
        user.password = dto.password
        user.role = dto.role

        return this.usersRepository.save(user)
    }

    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id })
    }
}
