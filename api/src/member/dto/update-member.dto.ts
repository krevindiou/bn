import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export default class UpdateMemberDto {
    @IsNotEmpty()
    @IsString()
    public readonly name!: string;

    @IsNotEmpty()
    @IsEmail()
    public readonly email!: string;

    @IsString()
    public readonly picture!: string;

    @IsString()
    public readonly website!: string;

    @IsString()
    public readonly quote!: string;
}
