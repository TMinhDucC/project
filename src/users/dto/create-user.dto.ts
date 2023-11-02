import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsEmail({}, { message: 'khong dung dinh dang email' })
  @IsNotEmpty({ message: 'email khong dc de trong ' })
  email: string

  @IsNotEmpty({ message: 'password khong dc de trong ' })
  password: string

  @IsNotEmpty({ message: 'name khong dc de trong ' })
  name: string

  @IsNotEmpty({ message: 'role khong dc de trong ' })
  @IsMongoId({ message: 'role la mongo id ' })
  role: string
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'name khong duoc de trong ' })
  name: string

  @IsEmail({}, { message: 'email khong dung dinh dang ' })
  @IsNotEmpty({ message: 'email khong de trong ' })
  email: string

  @IsNotEmpty({ message: 'pass khong duoc de trong ' })
  password: string
}
