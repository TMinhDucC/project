import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { User } from 'src/decorater/customize'
import { IUser } from 'src/users/user.interface'

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @User() user: IUser) {
    return await this.rolesService.create(createRoleDto, user)
  }

  @Get()
  findAll(@Query() qs: string, @Query('page') page: string, @Query('limit') limit: string) {
    return this.rolesService.findAll(qs, +page, +limit)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user: IUser) {
    return await this.rolesService.update(id, updateRoleDto, user)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUser) {
    return await this.rolesService.remove(id, user)
  }
}
