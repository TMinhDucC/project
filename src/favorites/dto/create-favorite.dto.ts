import { IsArray, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator'
import mongoose from 'mongoose'

export class CreateFavoriteDto {
  @IsNotEmpty({ message: 'room khong duoc de trong' })
  @IsMongoId({ each: true, message: 'each room la mongo id' })
  @IsArray({ message: 'room phai la array' })
  room: mongoose.Schema.Types.ObjectId

  @IsNotEmpty({ message: 'users khong duoc de trong' })
  @IsMongoId({ each: true, message: 'each user la mongo id' })
  users: mongoose.Schema.Types.ObjectId
}
