import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UsersService } from "src/users/users.service";
import { EmailConfirmationService } from "src/email-confirmation/email-confirmation.service";
import * as bycriptjs from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private jwtService: JwtService
  ) { }

  async login(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUser(username);
    console.log('JwtService instance:', this.jwtService);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await bycriptjs.compare(pass, user.contraseña);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const payload = { sub: user._id, username: user.usuario };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
      contraseña: await bycriptjs.hash(contraseña, 10),
      isActive: false,
    });
    this.emailConfirmationService.sendVerificationLink(email);
    return {
      message:
        "Usuario registrado exitosamente. Por favor revise su correo electrónico para verificar su cuenta.",
    };
    // } catch (error) {
    //     throw new InternalServerErrorException("Error al registrar el usuario");
    // }
  }
  // Add more authentication methods as needed
}
