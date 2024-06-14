import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './startegies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './startegies/jwt.strategy';
import configuration from 'src/configuration/configuration';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: configuration().jwt.secret,
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
