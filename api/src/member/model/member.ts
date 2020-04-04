import { Exclude, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import UpdateMemberDto from '../dto/update-member.dto';

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

export function updateMemberFromDto(member: Member, dto: UpdateMemberDto): Member {
    member.name = dto.name;
    member.email = dto.email;
    member.picture = dto.picture;
    member.website = dto.website;
    member.quote = dto.quote;

    return member;
}
