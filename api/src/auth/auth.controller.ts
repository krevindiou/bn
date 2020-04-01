import { Controller, Body, Request, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import express from 'express';
import AuthService from './auth.service';
import LocalAuthGuard from './guards/local-auth.guard';
import LoginDto from './dto/login.dto';
import { Member } from '../member/model/member';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Connect a member' })
    @Post('login')
    async login(@Request() req: express.Request, @Body() _dto: LoginDto): Promise<object> {
        return {
            accessToken: await this.authService.getToken(req.user as Member)
        };
    }
}
