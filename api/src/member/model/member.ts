import { Exclude, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';

export enum Role {
    User = 'user',
    Moderator = 'moderator',
    Admin = 'admin',
}

export class Member {
    public memberId!: string;

    public name!: string;

    public email!: string;

    @Exclude()
    public password!: string;

    public picture!: string;

    public website!: string;

    public quote!: string;

    @IsEnum(Role)
    public role!: Role;

    @Type(() => Date)
    public createdAt!: Date;

    @Type(() => Date)
    public updatedAt!: Date;

    @Type(() => Date)
    public deletedAt!: Date;
}
