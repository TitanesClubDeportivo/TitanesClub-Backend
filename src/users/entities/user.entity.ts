import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    _id:ObjectId;

    @Column()
    usuario:string;
    
    @Column()
    nombre:string;

    @Column()
    email:string;

    @Column()
    contraseña:string;
}
