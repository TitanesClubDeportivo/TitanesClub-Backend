import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(): {
        message: string;
    };
    register({ usuario, email, contraseña }: RegisterDto): Promise<import("../users/dto/create-user.dto").CreateUserDto & import("../users/entities/user.entity").User>;
}
