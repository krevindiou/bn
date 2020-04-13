import { Exclude, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import * as crypto from 'crypto';

import CreateMemberDto from '../dto/create-member.dto';
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

    @Exclude()
    @Type(() => Date)
    public createdAt!: Date;

    @Exclude()
    @Type(() => Date)
    public updatedAt!: Date;

    @Exclude()
    @Type(() => Date)
    public deletedAt!: Date;
}

export function createMemberFromDto(dto: CreateMemberDto): Member {
    const member = new Member();
    member.name = dto.name;
    member.email = dto.email;
    member.password = crypto.createHash('md5').update(dto.password).digest('hex');

    return member;
}

export function updateMemberFromDto(member: Member, dto: UpdateMemberDto): Member {
    const updatedMember = member;
    updatedMember.name = dto.name;
    updatedMember.email = dto.email;
    updatedMember.picture = dto.picture;
    updatedMember.website = dto.website;
    updatedMember.quote = dto.quote;

    return updatedMember;
}
