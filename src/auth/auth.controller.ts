import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {AuthService} from "./auth.service";
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() signInDto: LoginDto) {
        return this.authService.login(signInDto.usuario, signInDto.contraseña);
    }
    
    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ) {
        // console.log(registerDto)
        return this.authService.register(registerDto);
    }
    
}
