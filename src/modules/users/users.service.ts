import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: Repository<User>) { }

    async createUser(user: User): Promise<CreateUserResponseDto> {
        try {
            const data = await this.usersRepository.save(user)
            return { user_id: data.id }
        } catch(e) {

        }
    }

    async getUserById(id: string): Promise<User> {
        return await this.usersRepository.findOneBy({ id })
    }

    async getUserByCustomProperty(user: Array<User>): Promise<User> {
        return await this.usersRepository.findOne({ where: user })
    }
}
