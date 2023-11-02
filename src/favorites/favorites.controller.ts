import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import { CreateFavoriteDto } from './dto/create-favorite.dto'
import { UpdateFavoriteDto } from './dto/update-favorite.dto'
import { IUser } from 'src/users/user.interface'
import { User } from 'src/decorater/customize'

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto, @User() user: IUser) {
    return await this.favoritesService.create(createFavoriteDto, user)
  }

  @Get()
  async findAll(@Query('page') page, @Query('limit') limit, @Query() qs) {
    return this.favoritesService.findAll(+page, +limit, qs)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.favoritesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto, @User() user: IUser) {
    return this.favoritesService.update(id, updateFavoriteDto, user)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUser) {
    return await this.favoritesService.remove(id, user)
  }
}
