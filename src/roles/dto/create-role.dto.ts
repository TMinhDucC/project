import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator'
import mongoose from 'mongoose'

export class CreateRoleDto {
  @IsNotEmpty({ message: 'name khong duoc de trong' })
  name: string

  @IsNotEmpty({ message: 'description khong duoc de trong' })
  description: string

  @IsNotEmpty({ message: 'isActive khong duoc de trong' })
  @IsBoolean({ message: 'isActive la boolean' })
  isActive: string

  @IsNotEmpty({ message: 'module khong duoc de trong' })
  @IsMongoId({ each: true, message: 'each permissions la mongo id' })
  @IsArray({ message: 'permissions la array' })
  permissions: mongoose.Schema.Types.ObjectId[]
}
