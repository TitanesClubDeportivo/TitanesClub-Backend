import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Resend } from 'resend';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { configDotenv } from 'dotenv';

@Injectable()
export class EmailConfirmationService {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) { }

    public async sendVerificationLink(email: string) {
        configDotenv();
        const expirationTime = process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME 
            ? parseInt(process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME)
            : 7200; // Default to 2 hours if not set
        
        // console.log('Token expiration time (seconds):', expirationTime);
        
        const token = this.jwtService.sign(
            { email },
            {
                secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
                expiresIn: expirationTime
            }
        );
        
        // console.log('Generated token:', token);
        const verificationLink = `${process.env.EMAIL_CONFIRMATION_URL}/?token=${token}`;
        const subject = "Confirmación de cuenta";
        const html = `
        <p>Para confirmar tu cuenta, haz clic en el siguiente enlace:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        <p>Este enlace expirará en 2 horas.</p>
        `;
        const resend = new Resend(process.env.RESEND_API_KEY);

        resend.emails.send({
            from: process.env.EMAIL_FROM+"",
            to: email,
            subject: subject,
            html: html
        });
        // console.log("Email enviado");
        return {message: "Enlace de verificación enviado"};
    }

    public async confirmEmail(token: string) {
        try {
            // console.log('Verifying token...');
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_VERIFICATION_TOKEN_SECRET
            });
            // console.log('Token payload:', payload);
            
            const user = await this.usersService.findOneByEmail(payload.email);
            if (!user) {
                throw new UnauthorizedException("Usuario no encontrado");
            }
            if (user.isActive) {
                throw new BadRequestException("Cuenta ya verificada");
            }
            user.isActive = true;
            await this.usersService.update(user._id.toString(), user);
            // console.log("Cuenta verificada");
            return { message: 'Cuenta verificada correctamente' };
        } catch (error) {
            // console.error('Error during email confirmation:', error);
            throw new UnauthorizedException("Token inválido o expirado");
        }
    }
}
