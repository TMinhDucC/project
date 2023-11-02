import { Injectable } from '@nestjs/common'
import { CreateRatingDto } from './dto/create-rating.dto'
import { UpdateRatingDto } from './dto/update-rating.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Rating, RatingDocument } from './schemas/rating.schema'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import aqp from 'api-query-params'
import { IUser } from 'src/users/user.interface'

@Injectable()
export class RatingsService {
  constructor(@InjectModel(Rating.name) private RatingModel: SoftDeleteModel<RatingDocument>) {}
  async create(createRatingDto: CreateRatingDto, user: IUser) {
    const { room, users, comment, rating } = createRatingDto
    return await this.RatingModel.create({
      room,
      users,
      comment,
      rating,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    })
  }

  async findAll(page: number, limit: number, qs: string) {
    const { filter } = aqp(qs)
    delete filter.page

    let offset = (page - 1) * limit
    let defaultLimit = limit ? limit : 10

    const totalItems = (await this.RatingModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.RatingModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .select('-password') //khong hien thi pass cho client
      .exec()

    return {
      meta: {
        current: page, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    }
  }

  async findOne(id: string) {
    return await this.RatingModel.findOne({ _id: id })
  }

  async update(id: string, updateRatingDto: UpdateRatingDto, user: IUser) {
    return await this.RatingModel.updateOne(
      { _id: id },
      {
        ...updateRatingDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    )
  }

  async remove(id: string, user: IUser) {
    await this.RatingModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    )
    return await this.RatingModel.softDelete({ _id: id })
  }
}
