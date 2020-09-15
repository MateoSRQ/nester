import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../../users/dto/create.user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const item = new User();
    item.firstName = createUserDto.firstName;
    item.lastName = createUserDto.lastName;
    item.username = createUserDto.username;
    item.password = createUserDto.password;
    item.isActive = createUserDto.isActive;
    await item.save();
    return item;
  }
}
