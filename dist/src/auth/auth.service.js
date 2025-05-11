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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const email_confirmation_service_1 = require("../email-confirmation/email-confirmation.service");
const bycriptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    usersService;
    emailConfirmationService;
    jwtService;
    constructor(usersService, emailConfirmationService, jwtService) {
        this.usersService = usersService;
        this.emailConfirmationService = emailConfirmationService;
        this.jwtService = jwtService;
    }
    async login(username, pass) {
        const user = await this.usersService.findOneByUser(username);
        console.log('JwtService instance:', this.jwtService);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const isPasswordValid = await bycriptjs.compare(pass, user.contraseña);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta');
        }
        const payload = { sub: user._id, username: user.usuario };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async register({ usuario, email, contraseña }) {
        const user = await this.usersService.findOneByUser(usuario);
        if (user) {
            throw new common_1.BadRequestException("Usuario ya existe");
        }
        const emailUser = await this.usersService.findOneByEmail(email);
        if (emailUser) {
            throw new common_1.BadRequestException("Un usuario ya tiene ese Email");
        }
        await this.usersService.create({
            usuario,
            email,
            contraseña: await bycriptjs.hash(contraseña, 10),
            isActive: false,
        });
        this.emailConfirmationService.sendVerificationLink(email);
        return {
            message: "Usuario registrado exitosamente. Por favor revise su correo electrónico para verificar su cuenta.",
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        email_confirmation_service_1.EmailConfirmationService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map