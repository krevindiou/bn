import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { MemberService } from './member.service';
import { Credentials } from './model/credentials';
import { Email } from './model/email';
import { Member } from './model/member';
import { Password } from './model/password';

@ApiTags('member')
@Controller()
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post('/login')
    public async login(@Body() loginDto: LoginDto): Promise<Member | undefined> {
        return this.memberService.login(
            new Credentials(new Email(loginDto.email), new Password(loginDto.password)),
        );
    }

    @Get('/members')
    public async members(): Promise<Member[]> {
        return this.memberService.getAll();
    }
}
