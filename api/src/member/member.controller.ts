import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { MemberService } from './member.service';
import { Credentials } from './model/credentials';
import { Email } from './model/email';
import { Member } from './model/member';
import { Password } from './model/password';

@ApiTags('members')
@Controller('members')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @ApiOperation({ summary: 'Connect a member' })
    @Post('/login')
    public async login(@Body() loginDto: LoginDto): Promise<Member | undefined> {
        return this.memberService.login(
            new Credentials(new Email(loginDto.email), new Password(loginDto.password)),
        );
    }

    @ApiOperation({ summary: 'Get connected member' })
    @Get('/me')
    public async getMe(): Promise<Member> {
        return new Member();
    }

    @ApiOperation({ summary: 'Update connected member' })
    @Put('/me')
    public async updateMe(): Promise<Member> {
        return new Member();
    }

    @ApiOperation({ summary: 'Delete connected member' })
    @Delete('/me')
    public async removeMe(): Promise<void> {}

    @ApiOperation({ summary: 'Register a member' })
    @Post()
    public async register(): Promise<Member> {
        return new Member();
    }

    @ApiOperation({ summary: 'Get the list of members' })
    @Get()
    public async list(): Promise<Member[]> {
        return this.memberService.getAll();
    }
}
