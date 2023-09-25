import { IsEmail, IsNotEmpty } from 'class-validator';


export class CreateUserDto {
    @IsEmail({}, { message: "khong dung dinh dang email" })
    @IsNotEmpty({ message: "email khong dc de trong " })
    email: string;

    @IsNotEmpty({ message: "password khong dc de trong " })
    password: string;


    // @IsNotEmpty({ message: "role khong dc de trong " })
    // role: string;
}


