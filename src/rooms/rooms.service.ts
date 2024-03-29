import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';

@Injectable()
export class RoomsService {

  constructor(@InjectModel(Room.name) private RoomModel: SoftDeleteModel<RoomDocument>) { }

  async create(createRoomDto: CreateRoomDto) {
    const { description, name, price, address, images } = createRoomDto
    return await this.RoomModel.create({
      description,
      name,
      price,
      address,
      images
    })
  }

  async findAll(page: number, limit: number, qs: string) {
    const { filter } = aqp(qs);
    delete filter.page

    // console.log(filter)

    let offset = (page - 1) * (limit);
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.RoomModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.RoomModel.find(filter)
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
    return await this.RoomModel.findOne({ _id: id })
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    return await this.RoomModel.updateOne({ _id: id }, { ...updateRoomDto })
  }

  async remove(id: string) {
    return await this.RoomModel.softDelete({ _id: id })
  }
}
