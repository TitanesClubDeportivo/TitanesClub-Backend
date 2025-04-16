import { Module } from '@nestjs/common';
import { AppController } from './src/app.controller';
import { AppService } from './src/app.service';
import { UsersModule } from './src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { configDotenv } from 'dotenv';
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
    
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  
}
