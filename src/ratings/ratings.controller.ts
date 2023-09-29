import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) { }

  @Post()
  async create(@Body() createRatingDto: CreateRatingDto) {

    return await this.ratingsService.create(createRatingDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query() qs: string) {
    return await this.ratingsService.findAll(+page,+limit,qs);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ratingsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return await this.ratingsService.update(id, updateRatingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ratingsService.remove(id);
  }
}
