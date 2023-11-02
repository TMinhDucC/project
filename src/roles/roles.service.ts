import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { IUser } from 'src/users/user.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Role, RoleDocument } from './schemas/role.schema'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import aqp from 'api-query-params'
import mongoose from 'mongoose'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>) {}
  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name, description, isActive, permissions } = createRoleDto

    let exist = await this.roleModel.findOne({ name })
    if (exist) {
      throw new BadRequestException('name da ton tai ')
    }

    return await this.roleModel.create({
      name,
      description,
      isActive,
      permissions,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    })
  }

  async findAll(qs: string, page: number, limit: number) {
    const { filter, population } = aqp(qs)
    delete filter.page

    // console.log(filter)

    let offset = (page - 1) * limit
    let defaultLimit = limit ? limit : 10

    const totalItems = (await this.roleModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.roleModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .populate(population)
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('not found role')
    }

    return (await this.roleModel.findOne({ _id: id })).populate({
      path: 'permissions',
      select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 },
    })
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    const { name, description, isActive, permissions } = updateRoleDto
    return await this.roleModel.updateOne(
      { _id: id },

      {
        name,
        description,
        isActive,
        permissions,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    )
  }

  async remove(id: string, user: IUser) {
    let result = await this.roleModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    )

    return await this.roleModel.softDelete({ _id: id })
  }
}
