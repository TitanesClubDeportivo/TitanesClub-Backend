import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    _id:ObjectId;

    @Column()
    usuario:string;
    
    @Column()
    nombre:string;

    @Column({ unique: true })
    email:string;

    @Column({ default: false })
    isActive: boolean;

    @Column()
    contraseña:string;
}
