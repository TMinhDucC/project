import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { IUser } from 'src/users/user.interface';
import { User } from 'src/decorater/customize';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto, @User() user: IUser) {

    return await this.roomsService.create(createRoomDto, user);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query() qs: string
  ) {
    return await this.roomsService.findAll(+page, +limit, qs);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roomsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto, @User() user: IUser) {
    return this.roomsService.update(id, updateRoomDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUser) {
    return await this.roomsService.remove(id, user);
  }
}
