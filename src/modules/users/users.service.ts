import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
    CreateUserResponseDto,
    UpdateUserAdminFieldsInsertDto,
    UpdateUserInsertDto,
    UpdateUserModeratorFieldsInsertDto
} from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: Repository<User>) { }

    async createUser(user: User): Promise<CreateUserResponseDto> {
        try {
            const data = await this.usersRepository.save(user)
            return { user_id: data.id }
        } catch (e) {
            return
        }
    }

    async updateUser(
        user:
            | UpdateUserInsertDto
            | UpdateUserModeratorFieldsInsertDto
            | UpdateUserAdminFieldsInsertDto
            | User,
    ): Promise<boolean> {
        try {
            await this.usersRepository.save(user)
            return true
        } catch (e) {
            return false
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.usersRepository.findOneByOrFail({ email })
            return user
        } catch (e) {
            return
        }
    }

    async getUserById(id: string): Promise<User> {
        return await this.usersRepository.findOneBy({ id })
    }

    async getUserByCustomProperty(user: Array<User>): Promise<User> {
        return await this.usersRepository.findOne({ where: user })
    }

    async getAllUsers(): Promise<Array<User>> {
        try {
            const tokens = await this.usersRepository.find()
            return tokens
        } catch (e) {
            return
        }
    }
}
