"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
let UsersService = class UsersService {
    UsersRepository;
    constructor(UsersRepository) {
        this.UsersRepository = UsersRepository;
    }
    async create(createUserDto) {
        return await this.UsersRepository.save(createUserDto);
    }
    async findAll() {
        return await this.UsersRepository.find();
    }
    async findOne(id) {
        const _id = this.DocumentId(id);
        return await this.UsersRepository.findOneBy({ _id });
    }
    async update(id, updateUserDto) {
        const _id = this.DocumentId(id);
        return await this.UsersRepository.update(_id, updateUserDto);
    }
    async remove(id) {
        const _id = this.DocumentId(id);
        return await this.UsersRepository.delete(_id);
    }
    async findOneByEmail(email) {
        return await this.UsersRepository.findOneBy({ email });
    }
    async findOneByUser(usuario) {
        return await this.UsersRepository.findOneBy({ usuario });
    }
    DocumentId(id) {
        try {
            return new mongodb_1.ObjectId(id);
        }
        catch (error) {
            throw new common_1.BadRequestException("id del usuario incorrecta");
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map