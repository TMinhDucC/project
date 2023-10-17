import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './user.interface';
import { Public, User } from 'src/decorater/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    return await this.usersService.create(createUserDto, user);
  }

  @Get()
  findAll(
    @Query() qs: string,
    @Query('page') page: string,
    @Query('limit') limit: string,) {
    return this.usersService.findAll(qs, +page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return await this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUser) {
    return await this.usersService.remove(id, user);
  }
}
