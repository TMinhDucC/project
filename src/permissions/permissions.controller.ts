import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { PermissionsService } from './permissions.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { User } from 'src/decorater/customize'
import { IUser } from 'src/users/user.interface'

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto, @User() user: IUser) {
    return await this.permissionsService.create(createPermissionDto, user)
  }

  @Get()
  findAll(@Query() qs: string, @Query('page') page: string, @Query('limit') limit: string) {
    return this.permissionsService.findAll(qs, +page, +limit)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionsService.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto, @User() user: IUser) {
    return await this.permissionsService.update(id, updatePermissionDto, user)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUser) {
    return await this.permissionsService.remove(id, user)
  }
}
