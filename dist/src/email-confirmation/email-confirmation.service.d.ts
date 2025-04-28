import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class EmailConfirmationService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    sendVerificationLink(email: string): Promise<{
        message: string;
    }>;
    confirmEmail(token: string): Promise<{
        message: string;
    }>;
}
