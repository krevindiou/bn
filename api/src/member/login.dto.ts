import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    public readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly password: string;

    constructor(
        email: string,
        password: string,
    ) {
        this.email = email;
        this.password = password;
    }
}
