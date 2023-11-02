import { Injectable } from '@nestjs/common'
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import aqp from 'api-query-params'
import { IUser } from './user.interface'
import { Role, RoleDocument } from 'src/roles/schemas/role.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  async create(createUserDto: CreateUserDto, user: IUser) {
    const { email, password, name, role } = createUserDto
    const hashedPass = this.hashPassword(password)
    return this.userModel.create({
      email,
      password: hashedPass,
      name,
      role,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    })
  }

  async findAll(qs: string, page: number, limit: number) {
    const { filter } = aqp(qs)
    delete filter.page

    // console.log(filter)

    let offset = (page - 1) * limit
    let defaultLimit = limit ? limit : 10

    const totalItems = (await this.userModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.userModel
      .find(filter)
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
    return await this.userModel.findOne({ _id: id })
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    return await this.userModel.updateOne(
      { _id: id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    )
  }

  async remove(id: string, user: IUser) {
    await this.userModel.updateOne(
      { _id: id },

      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    )
    return await this.userModel.softDelete({ _id: id })
  }

  hashPassword = (password: string) => {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    return hash
  }

  findOneByUsername = async (username: string) => {
    try {
      return await this.userModel.findOne({ email: username })
      .populate({ path: 'role', select: { name: 1 } })
    } catch (error) {
      console.log(error)
    }
  }

  checkPassword = (password: any, hash: any) => {
    return compareSync(password, hash)
  }

  updateUserToken = async (refresh_token: any, _id: any) => {
    await this.userModel.updateOne({ _id: _id }, { refreshToken: refresh_token })
  }

  HandleRegister = async (registerUserDto: RegisterUserDto) => {
    const { name, email, password } = registerUserDto
    const userRole = await this.roleModel.findOne({ name: 'Nomal_User' })
    const hashedPass = this.hashPassword(password)
    return this.userModel.create({
      email,
      password: hashedPass,
      name,
      role: userRole?._id,
    })
  }
}
