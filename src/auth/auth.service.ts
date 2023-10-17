import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express'
import *as ms from 'ms';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private rolesService: RolesService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {

    const user = await this.usersService.findOneByUsername(username)

    if (user) {

      const checkPass = await this.usersService.checkPassword(pass, user.password)
      if (checkPass == true) {

        const userRole = user.role as unknown as { _id: string; name: string }
        const temp = await this.rolesService.findOne(userRole._id)

        const objUser = {
          ...user.toObject(),
          permissions: temp?.permissions ?? []
        }

        return objUser

      }
    }

    return null;
  }

  async login(user: any, response: Response) {
    const { role, permissions } = user;
    const payload = { username: user.email, _id: user._id };
    const refresh_token = this.createRefreshToken(payload)

    //update trong db
    await this.usersService.updateUserToken(refresh_token, user._id)

    //set refresh_token as cookies
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>("REFRESH_EXPIRE"))

    })

    return {

      access_token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        email: user.email,
        role,
        permissions
      }
    };
  }

  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get<string>("REFRESH_EXPIRE")

    })
    return refresh_token
  }
}