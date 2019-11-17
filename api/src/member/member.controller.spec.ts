import { Test } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepository } from './member.repository';
import { LoginDto } from './login.dto';

describe('MemberController', () => {
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
                        login: jest.fn(() => { throw new Error })
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
            jest.spyOn(memberService, 'login').mockImplementation(() => true);
            expect(memberController.login(new LoginDto('john@example.net', 'password123'))).toBe(true);
        });

        it('should fail', () => {
            jest.spyOn(memberService, 'login').mockImplementation(() => false);
            expect(memberController.login(new LoginDto('john@example.net', 'password1234'))).toBe(false);
        });
    });
});
