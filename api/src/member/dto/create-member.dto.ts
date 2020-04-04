import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export default class CreateMemberDto {
    @IsNotEmpty()
    @IsString()
    public readonly name!: string;

    @IsNotEmpty()
    @IsEmail()
    public readonly email!: string;

    @IsNotEmpty()
    @IsString()
    public readonly password!: string;
}
