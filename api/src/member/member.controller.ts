import { Request, Controller, Get, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import express from 'express';
import MemberService from './member.service';
import { Member } from './model/member';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';

@ApiTags('members')
@Controller('members')
export default class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get connected member' })
    @Get('me')
    async getMe(@Request() req: express.Request): Promise<Member> {
        const { memberId } = req.user as Member;

        try {
            return this.memberService.get(memberId);
        } catch (_error) {
            throw new NotFoundException();
        }
    }
}
