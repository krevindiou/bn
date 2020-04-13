import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    public readonly username!: string;

    @IsNotEmpty()
    @IsString()
    public readonly password!: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
