"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const dotenv_1 = require("dotenv");
let EmailConfirmationService = class EmailConfirmationService {
    jwtService;
    usersService;
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async sendVerificationLink(email) {
        (0, dotenv_1.configDotenv)();
        const expirationTime = process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME
            ? parseInt(process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME)
            : 7200;
        const token = this.jwtService.sign({ email }, {
            secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
            expiresIn: expirationTime
        });
        const verificationLink = `${process.env.EMAIL_CONFIRMATION_URL}/?token=${token}`;
        const subject = "Confirmación de cuenta";
        const html = `
        <p>Para confirmar tu cuenta, haz clic en el siguiente enlace:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        <p>Este enlace expirará en 2 horas.</p>
        `;
        const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
        resend.emails.send({
            from: process.env.EMAIL_FROM + "",
            to: email,
            subject: subject,
            html: html
        });
        return { message: "Enlace de verificación enviado" };
    }
    async confirmEmail(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_VERIFICATION_TOKEN_SECRET
            });
            const user = await this.usersService.findOneByEmail(payload.email);
            if (!user) {
                throw new common_1.UnauthorizedException("Usuario no encontrado");
            }
            if (user.isActive) {
                throw new common_1.BadRequestException("Cuenta ya verificada");
            }
            user.isActive = true;
            await this.usersService.update(user._id.toString(), user);
            return { message: 'Cuenta verificada correctamente' };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Token inválido o expirado");
        }
    }
};
exports.EmailConfirmationService = EmailConfirmationService;
exports.EmailConfirmationService = EmailConfirmationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, users_service_1.UsersService])
], EmailConfirmationService);
//# sourceMappingURL=email-confirmation.service.js.map