import {
  Body,
  Controller,
  Get,
  Param,
  Request,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';

import { User } from '../entities/users/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Get()
  async get(@Req() req: Request): Promise<User[]> {
    return this.userService.getAll(req['query'].query);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
