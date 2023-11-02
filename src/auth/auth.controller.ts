import { Controller, Request, Post, UseGuards, Get, Res, Body, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'
import { Public, User } from 'src/decorater/customize'
import { Response, Request as Requestt } from 'express'
import { RegisterUserDto } from 'src/users/dto/create-user.dto'
import { IUser } from 'src/users/user.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }

  @Get('account')
  getAccount(@User() user: IUser) {
    return { user }
  }

  @Public()
  @Get('refresh')
  findAll(@Req() request: Requestt, @Res({ passthrough: true }) response: Response) {
    const refresh_token = request.cookies.refresh_token
    return this.authService.checkRefreshToken(refresh_token, response)
  }
}
