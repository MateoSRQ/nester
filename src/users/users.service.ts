import {
  BadRequestException,
  Get,
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { UserRepository } from '../entities/users/user.repository';
import { User } from '../entities/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import * as crypto from 'crypto';
import { MoreThan, Not } from 'typeorm';
import _ from 'lodash';

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
}

//     _query = { where: { firstName: { $Not: 'Mateo' }, id: { $MoreThan: 19 } } };
function iterate(obj, root, stack) {
  if (stack == null) stack = '';

  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == 'object') {
        iterate(obj[property], root, stack + '.' + property);
      } else {
        if (property[0] == '$') {
          console.log(eval('root' + stack + '= 0'));
          console.log(root);
        }
      }
    }
  }
}

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

  async getAll(query?: string): Promise<User[]> {
    let _query = null;
    console.log(query);
    try {
      if (query) {
        _query = JSON.parse(query);
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
    _query = { where: { firstName: { $Not: 'Mateo' }, id: { $MoreThan: 19 } } };
    iterate(_query, _query, null);
    _query = { where: { firstName: Not('Mateo'), id: MoreThan(19) } };
    console.log('XXXXXX');
    console.log(JSON.stringify(_query));
    let r = _query;

    return this.userRepository.find(r);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      let result = await this.userRepository.findOne({
        username: createUserDto.username,
      });
      if (!result) {
        result = await this.userRepository.findOne({
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
        });
        if (!result) {
          createUserDto.password = await hashPassword(createUserDto.password);
          result = await this.userRepository.createUser(createUserDto);
          delete result.password;
          return result;
        }
      }
      throw new BadRequestException(
        'User with same username, or same first and lastnames is already created.',
      );
      //createUserDto.password = await hashPassword(createUserDto.password);
      //return this.userRepository.createUser(createUserDto);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
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
