import { RegisterDto } from "./dto/register.dto";
import { UsersService } from "src/users/users.service";
import { EmailConfirmationService } from "src/email-confirmation/email-confirmation.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly usersService;
    private readonly emailConfirmationService;
    private jwtService;
    constructor(usersService: UsersService, emailConfirmationService: EmailConfirmationService, jwtService: JwtService);
    login(username: string, pass: string): Promise<{
        access_token: string;
    }>;
    register({ usuario, email, contraseña }: RegisterDto): Promise<{
        message: string;
    }>;
}
