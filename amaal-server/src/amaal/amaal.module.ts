import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AmaalController } from './amaal.controller';
import { AmaalService } from './amaal.service';
import { DayAmaal } from './entities/day.amaal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DayAmaal]), UserModule],
  providers: [AmaalService],
  controllers: [AmaalController],
})
export class AmaalModule {}
