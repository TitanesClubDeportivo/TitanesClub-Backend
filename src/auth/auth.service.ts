import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import * as bycriptjs from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly emailConfirmationService: EmailConfirmationService) { }

    login() {
        return { message: 'Login successful' };
    }

    async register({ usuario, email, contraseña }: RegisterDto) {
        // try {
            const user = await this.usersService.findOneByUser(usuario);
            if (user) {
                throw new BadRequestException("Usuario ya existe");
            }
            const emailUser = await this.usersService.findOneByEmail(email);
            if (emailUser) {
                throw new BadRequestException("Un usuario ya tiene ese Email");
            }
            await this.usersService.create({
                usuario,
                email,
                contraseña: await bycriptjs.hash(contraseña, 10)
            });
            this.emailConfirmationService.sendVerificationLink(email);
            return {
                message: "Usuario registrado exitosamente. Por favor revise su correo electrónico para verificar su cuenta."
            };
        // } catch (error) {
        //     throw new InternalServerErrorException("Error al registrar el usuario");
        // }

    }
    // Add more authentication methods as needed
}
