import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private UsersRepository:Repository<User>
  ){

  }

  async create(createUserDto: CreateUserDto) {
    return await this.UsersRepository.save(createUserDto);
  }

  async findAll() {
    return await this.UsersRepository.find();
  }

  async findOne(id: string) {
    const _id = this.DocumentId(id);
    return await this.UsersRepository.findOneBy({_id});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const _id = this.DocumentId(id);
    return await this.UsersRepository.update(_id,updateUserDto);
  }

  async remove(id: string) {
    const _id = this.DocumentId(id);
    return await this.UsersRepository.delete(_id);
  }

  DocumentId(id: string){
    try {
      return new ObjectId(id);
    } catch (error) {
      return error;
    }
  }
}
