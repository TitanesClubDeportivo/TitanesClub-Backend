import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Resend } from 'resend';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmailConfirmationService {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) { }

    public sendVerificationLink(email: string) {
        const token = this.jwtService.sign({ email }, {
            secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
            expiresIn: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME
        });
        const verificationLink = `${process.env.EMAIL_CONFIRMATION_URL}/?token=${token}`;
        const subject = "Confirmación de cuenta";
        const html = `
        <p>Para confirmar tu cuenta, haz clic en el siguiente enlace:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        `;
        const resend = new Resend(process.env.RESEND_API_KEY);

        resend.emails.send({
            from: process.env.EMAIL_FROM+"",
            to: email,
            subject: subject,
            html: html
        });
        console.log("Email enviado");
        return;

    }

    public async confirmEmail(token: string) {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_VERIFICATION_TOKEN_SECRET
        });
        const user = await this.usersService.findOneByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException("Usuario no encontrado");
        }
        if (user.isActive) {
            throw new BadRequestException("Cuenta ya verificada");
        }
        user.isActive = true;
        await this.usersService.update(user._id.toString(), user);
        console.log("Cuenta verificada");
        return { message: 'Cuenta verificada correctamente' };
    }
}
