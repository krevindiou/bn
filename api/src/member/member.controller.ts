import { Request, Body, Controller, Get, Post, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import express from 'express';
import MemberService from './member.service';
import { Member } from './model/member';
import CreateMemberDto from './dto/create-member.dto';
import UpdateMemberDto from './dto/update-member.dto';
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

    @ApiOperation({ summary: 'Get the list of members' })
    @Get()
    async list(): Promise<Member[]> {
        return this.memberService.getAll();
    }

    @ApiOperation({ summary: 'Register a member' })
    @Post()
    async register(@Body() dto: CreateMemberDto): Promise<Member> {
        return this.memberService.register(dto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update connected member' })
    @Put('me')
    async updateMe(@Request() req: express.Request, @Body() dto: UpdateMemberDto): Promise<Member> {
        const { memberId } = req.user as Member;

        return this.memberService.update(memberId, dto);
    }
}
