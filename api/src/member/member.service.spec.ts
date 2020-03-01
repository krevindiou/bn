import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';
import { Credentials } from './model/credentials';
import { Email } from './model/email';
import { Member } from './model/member';
import { Password } from './model/password';

describe('MemberService', () => {
    let memberRepository: MemberRepository;
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

        memberRepository = memberModule.get<MemberRepository>(MemberRepository);
        memberService = memberModule.get<MemberService>(MemberService);
    });

    describe('login', () => {
        it('should succeed', () => {
            const member = new Member();
            member.email = new Email('john@example.net');
            jest.spyOn(memberRepository, 'findByCredentials').mockImplementation(() => Promise.resolve(member));

            const credentials = new Credentials(new Email('john@example.net'), new Password('password123'));
            expect(memberService.login(credentials)).toStrictEqual(Promise.resolve(member));
        });

        it('should fail', () => {
            jest.spyOn(memberRepository, 'findByCredentials').mockImplementation(() => {
                throw new Error('Member not found');
            });

            const credentials = new Credentials(new Email('john@example.net'), new Password('password123'));
            expect(memberService.login(credentials)).toStrictEqual(Promise.resolve(undefined));
        });
    });
});
