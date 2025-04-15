import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    _id:number;

    @Column()
    nombre:string;

    @Column()
    email:string;

    @Column()
    contraseña:string;
}
