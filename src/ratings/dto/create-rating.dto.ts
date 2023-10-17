import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import mongoose from 'mongoose';


export class CreateRatingDto {

    @IsNotEmpty({ message: 'room khong duoc de trong' })
    @IsMongoId({ each: true, message: "each room la mongo id" })

    room: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'users khong duoc de trong' })
    @IsMongoId({ each: true, message: "each user la mongo id" })

    users: mongoose.Schema.Types.ObjectId

    @IsNotEmpty({ message: "rating khong dc de trong " })
    @IsNumber()
    rating: number;

    @IsNotEmpty({ message: "comment khong dc de trong " })
    comment: string;


}