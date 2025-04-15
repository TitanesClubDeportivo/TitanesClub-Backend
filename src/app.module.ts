import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://<usuario>:<contraseña>@cluster0.bcoln4e.mongodb.net/Titanes?retryWrites=true&w=majority&appName=Cluster0',
      synchronize: true,
      database: 'Titanes',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    MongooseModule.forRoot('mongodb+srv://<usuario>:<contraseña>@cluster0.bcoln4e.mongodb.net/Titanes?retryWrites=true&w=majority&appName=Cluster0'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
