import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import express from 'express';

import { Member } from '../member/model/member';
import AuthService from './auth.service';
import LoginDto from './dto/login.dto';
import LocalAuthGuard from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
    // eslint-disable-next-line no-useless-constructor
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Connect a member' })
    @Post('login')
    async login(@Request() req: express.Request, @Body() _dto: LoginDto): Promise<object> {
        return {
            accessToken: await this.authService.getToken(req.user as Member),
        };
    }
}
