import { ObjectId } from "typeorm";
export declare class User {
    _id: ObjectId;
    nombre: string;
    email: string;
    contraseña: string;
}
