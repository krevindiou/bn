import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LoginDto } from './login.dto';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';
import { Email } from './model/email';
import { Member } from './model/member';

describe('MemberController', () => {
    let memberController: MemberController;
    let memberService: MemberService;

    beforeAll(async () => {
        const memberModule = await Test.createTestingModule({
            providers: [
                Logger,
                MemberService,
                {
                    provide: MemberRepository,
                    useFactory: () => ({
                        findByCredentials: jest.fn(() => { throw new Error(); }),
                    }),
                },
            ],
            controllers: [MemberController],
        }).compile();

        memberController = memberModule.get<MemberController>(MemberController);
        memberService = memberModule.get<MemberService>(MemberService);
    });

    describe('login', () => {
        it('should succeed', () => {
            const member = new Member();
            member.email = new Email('john@example.net');
            jest.spyOn(memberService, 'login').mockImplementation(() => Promise.resolve(member));

            expect(memberController.login(new LoginDto('john@example.net', 'password123')))
                .toStrictEqual(Promise.resolve(member));
        });

        it('should fail', () => {
            jest.spyOn(memberService, 'login').mockImplementation(() => Promise.resolve(undefined));

            expect(memberController.login(new LoginDto('john@example.net', 'password123')))
                .toStrictEqual(Promise.resolve(undefined));
        });
    });
});
