import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';
import aqp from 'api-query-params';
import { IUser } from 'src/users/user.interface';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite.name) private FavoriteModel: SoftDeleteModel<FavoriteDocument>) { }

  async create(createFavoriteDto: CreateFavoriteDto, user: IUser) {
    const { room, users } = createFavoriteDto
    return await this.FavoriteModel.create({
      room,
      users,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
  }

  async findAll(page: number, limit: number, qs: string) {
    const { filter } = aqp(qs);
    delete filter.page

    let offset = (page - 1) * (limit);
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.FavoriteModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.FavoriteModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .select("-password")  //khong hien thi pass cho client
      .exec();

    return {
      meta: {
        current: page, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  async findOne(id: string) {
    return await this.FavoriteModel.findOne({ _id: id })
  }

  async update(id: string, updateFavoriteDto: UpdateFavoriteDto, user: IUser) {
    return await this.FavoriteModel.updateOne(
      { _id: id },
      {
        ...updateFavoriteDto,
        updatedBy: {
          _id: user._id,          
          email: user.email
        }

      }

    )
  }

  async remove(id: string, user: IUser) {
    await this.FavoriteModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return await this.FavoriteModel.softDelete({ _id: id })
  }
}
