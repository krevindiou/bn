import { Test } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';
import { Credentials } from './model/credentials';
import { Email } from './model/email';
import { Password } from './model/password';

describe('MemberService', () => {
    let memberController: MemberController;
    let memberRepository: MemberRepository;
    let memberService: MemberService;

    beforeAll(async () => {
        const memberModule = await Test.createTestingModule({
            providers: [
                MemberService,
                {
                    provide: MemberRepository,
                    useFactory: () => ({
                        findByCredentials: jest.fn(() => { throw new Error })
                    }),
                },
            ],
            controllers: [MemberController],
        }).compile();

        memberController = memberModule.get<MemberController>(MemberController);
        memberRepository = memberModule.get<MemberRepository>(MemberRepository);
        memberService = memberModule.get<MemberService>(MemberService);
    });

    describe('login', () => {
        it('should succeed', () => {
            jest.spyOn(memberRepository, 'login').mockImplementation(() => true);

            const credentials = new Credentials(
                new Email('john@example.net'),
                new Password('password123'),
            );

            expect(memberService.login(credentials)).toBe(true);
        });

        it('should fail', () => {
            jest.spyOn(memberRepository, 'login').mockImplementation(() => false);

            const credentials = new Credentials(
                new Email('john@example.net'),
                new Password('password1234'),
            );

            expect(memberService.login(credentials)).toBe(false);
        });
    });
});
