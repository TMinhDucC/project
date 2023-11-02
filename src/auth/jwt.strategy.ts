import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RolesService } from 'src/roles/roles.service'
import { IUserRole } from 'src/users/user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly rolesService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
    })
  }

  async validate(payload: any) {
    // return { _id: payload._id, email: payload.username };
    // return{payload}
    const { _id, role, email } = payload

    //gan them permission vao req.user
    const userRole = role as unknown as IUserRole
    const temp = await this.rolesService.findOne(userRole._id)

    //req.user
    return {
      _id,
      email,
      role,
      permissions: temp?.permissions ?? [],
    }
  }
}
