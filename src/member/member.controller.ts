import { Body, Controller, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { MemberService } from './member.service';
import { Credentials } from './model/credentials';
import { Email } from './model/email';
import { Password } from './model/password';

@ApiUseTags('member')
@Controller()
export class MemberController {
    constructor(
        private readonly memberService: MemberService,
    ) {}

    @Post('/login')
    public login(@Body() loginDto: LoginDto): boolean {
        return this.memberService.login(
            new Credentials(
                new Email(loginDto.email),
                new Password(loginDto.password),
            ),
        );
    }
}
