import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AmaalModule } from './amaal/amaal.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import configuration from './configuration/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { DayAmaal } from './amaal/entities/day.amaal.entity';
import { TanzeemModule } from './tanzeem/tanzeem.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'amaal.db',
      entities: [User, DayAmaal], 
      synchronize: true,
      //logging: true,
    }),
    AuthModule,
    AmaalModule,
    UserModule,
    TanzeemModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
