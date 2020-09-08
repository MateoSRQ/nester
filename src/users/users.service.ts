import {
  Get,
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { UserRepository } from '../entities/users/user.repository';
import { User } from '../entities/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getById(id: number): Promise<User> {
    const result = await this.userRepository.findOne(id);
    if (!result) {
      throw new NotFoundException(`User with IDX ${id} not found.`);
    }
    return result;
  }

  async findOne(username: string) {
    const result = await this.userRepository.findOne({ username: username });
    if (!result) {
      throw new NotFoundException('User with ID ${id} not found.');
    }
    return result;
  }

  // async create(user: User): Promise<User> {
  //   return User.save(user);
  // }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }
}
