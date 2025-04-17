import { ObjectId } from "typeorm";
export declare class User {
    _id: ObjectId;
    usuario: string;
    nombre: string;
    email: string;
    isActive: boolean;
    contraseña: string;
}
