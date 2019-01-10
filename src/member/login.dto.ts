import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiModelProperty()
    @IsEmail()
    public readonly email: string;

    @ApiModelProperty()
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
