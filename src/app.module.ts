import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { AuthModule } from './auth/auth.module';
configDotenv();

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://'+process.env.DATABASEUSER+':'+process.env.DATABASEPASSWORD+'@cluster0.bcoln4e.mongodb.net/Titanes?retryWrites=true&w=majority&appName=Cluster0',
      synchronize: true,
      database: 'Titanes',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
