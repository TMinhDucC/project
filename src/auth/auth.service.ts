import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import * as ms from 'ms'
import { RolesService } from 'src/roles/roles.service'
import { RegisterUserDto } from 'src/users/dto/create-user.dto'
import { IUser, IUserRole } from 'src/users/user.interface'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private rolesService: RolesService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username)

    if (user) {
      const checkPass = this.usersService.checkPassword(pass, user.password)
      if (checkPass == true) {
        const userRole = user.role as unknown as IUserRole
        const temp = await this.rolesService.findOne(userRole._id)

        const objUser = {
          ...user.toObject(),
          permissions: temp?.permissions ?? [],
        }

        return objUser
      }
    }

    return null
  }

  async login(user: IUser, response: Response) {
    const { role, permissions } = user
    const payload = { email: user.email, _id: user._id, role }

    const refreshToken = this.createRefreshToken(payload)

    //update trong db
    await this.usersService.updateUserToken(refreshToken, user._id)

    //set refresh_token as cookies
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('REFRESH_EXPIRE')),
    })

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        email: user.email,
        role,
        permissions,
      },
    }
  }

  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_EXPIRE'),
    })
    return refresh_token
  }

  register = async (registerUserDto: RegisterUserDto) => {
    const result = await this.usersService.HandleRegister(registerUserDto)

    return {
      _id: result._id,
      createdAt: result.createdAt,
    }
  }

  checkRefreshToken = async (refresh_token: string, response: Response) => {
    const user = this.jwtService.verify(refresh_token, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    })
    // return user
    if (user) {
      const payload = { username: user.email, _id: user._id, role: user.role }
      const refresh_token = this.createRefreshToken(payload)

      //update trong db
      await this.usersService.updateUserToken(refresh_token, user._id)

      //set refresh_token as cookies
      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: ms(this.configService.get<string>('REFRESH_EXPIRE')),
      })

      //fetch permission
      // const userRole = user.role._id
      // const temp = await this.rolesService.findOne(userRole)

      //fetch permission
      const userRole = user.role as unknown as IUserRole
      const temp = await this.rolesService.findOne(userRole._id)

      // return userRole
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          permissions: temp?.permissions,
        },
      }
    } else {
      throw new NotFoundException('refresh_token khong hop le')
    }
  }
}
