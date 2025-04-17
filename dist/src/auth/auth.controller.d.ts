import { AuthService } from "./auth.service";
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(): {
        message: string;
    };
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
}
