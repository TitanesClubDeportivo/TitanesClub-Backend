import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

import * as bycriptjs from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService){}

    login() {
        return { message: 'Login successful' };
    }

    async register({usuario,email,contraseña}: RegisterDto){

        const user = await this.usersService.findOneByUser(usuario);
        if(user){
            throw new BadRequestException("Usuario ya existe");
        }
        return this.usersService.create({
            usuario,
            email,
            contraseña: await bycriptjs.hash(contraseña,10)
        });
    }
    // Add more authentication methods as needed
}
