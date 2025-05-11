import {IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsString()
    @MinLength(1)
    usuario:string;

    @IsString()
    @MinLength(6)
    contraseña:string;
}
