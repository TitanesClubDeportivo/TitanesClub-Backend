import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  async findOne(id: number) {
    return await this.UsersRepository.findOneBy({_id:id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.UsersRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    return await `This action removes a #${id} user`;
  }
}
