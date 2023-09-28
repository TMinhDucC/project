import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { genSaltSync, hashSync } from 'bcryptjs'
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {

    const { email, password, name } = createUserDto
    const hashedPass = this.hashPassword(password)
    return this.userModel.create({
      email,
      password: hashedPass,
      name
    })
  }

  async findAll(qs: string, page: number, limit: number) {
    const { filter } = aqp(qs);
    delete filter.page

    // console.log(filter)

    let offset = (page - 1) * (limit);
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel.find(filter)
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
    return await this.userModel.findOne({ _id: id })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: id },
      {
        ...updateUserDto
      })
  }

  async remove(id: string) {
    return await this.userModel.softDelete({ _id: id })
  }

  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash
  }
}
