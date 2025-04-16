import { CreateUserDto } from '../TitanesClub-Backend/src/users/dto/create-user.dto';
import { UpdateUserDto } from '../TitanesClub-Backend/src/users/dto/update-user.dto';
import { User } from '../TitanesClub-Backend/src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
export declare class UsersService {
    private UsersRepository;
    constructor(UsersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    findAll(): Promise<User[]>;
    findOne(id: ObjectId): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<string>;
}
