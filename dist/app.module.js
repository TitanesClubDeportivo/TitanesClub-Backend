"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./src/app.controller");
const app_service_1 = require("./src/app.service");
const users_module_1 = require("./src/users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: 'mongodb+srv://' + process.env.DATABASEUSER + ':' + process.env.DATABASEPASSWORD + '@cluster0.bcoln4e.mongodb.net/Titanes?retryWrites=true&w=majority&appName=Cluster0',
                synchronize: true,
                database: 'Titanes',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map