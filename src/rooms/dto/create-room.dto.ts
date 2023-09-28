import { IsNotEmpty, IsNumber } from 'class-validator';


export class CreateRoomDto {

    @IsNotEmpty({ message: "description khong dc de trong " })
    description: string;

    @IsNotEmpty({ message: "price khong dc de trong " })
    @IsNumber()
    price: number;

    @IsNotEmpty({ message: "name khong dc de trong " })
    name: string;

    @IsNotEmpty({ message: "address khong dc de trong " })
    address: string;

    @IsNotEmpty({ message: "images khong dc de trong " })
    images: [string];
}