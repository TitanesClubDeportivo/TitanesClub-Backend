import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
export declare class AuthService {
    private readonly usersService;
    private readonly emailConfirmationService;
    constructor(usersService: UsersService, emailConfirmationService: EmailConfirmationService);
    login(): {
        message: string;
    };
    register({ usuario, email, contraseña }: RegisterDto): Promise<{
        message: string;
    }>;
}
