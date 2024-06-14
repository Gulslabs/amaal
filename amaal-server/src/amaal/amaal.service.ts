import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { AbstractService } from 'src/shared/abstract.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import {
  formatDate,
  getAllDatesBetweenInclusive,
  isActiveWeek,
  parseDateString,
} from 'src/utils/utils';
import { Repository } from 'typeorm';
import {
  AmaalCategory,
  AmaalDto,
  AmaalKind,
  DayAmaalDto,
} from './dto/amaal.dto';
import { DayAmaal } from './entities/day.amaal.entity';

@Injectable()
export class AmaalService extends AbstractService {
  constructor(
    @InjectRepository(DayAmaal)
    private readonly dayAmaalRepo: Repository<DayAmaal>,
    private readonly userService: UserService,
  ) {
    super(dayAmaalRepo);
  }

  private amaals: AmaalDto[] = [
    new AmaalDto(AmaalCategory.ZIKR, AmaalKind.TIME_BASED, 0),
    new AmaalDto(AmaalCategory.TAHAJJUD, AmaalKind.TIME_BASED, 0),
    new AmaalDto(AmaalCategory.ASTAGFAR, AmaalKind.TIME_BASED, 0),
    new AmaalDto(AmaalCategory.SADAQAH, AmaalKind.BOOL_BASED),
    new AmaalDto(AmaalCategory.ROZA, AmaalKind.BOOL_BASED),
    new AmaalDto(AmaalCategory.FAJR, AmaalKind.BOOL_BASED),
  ];

  private generateAmaal(amaalDate: Date, isEditable: boolean = true) {
    const dayAmaal = new DayAmaalDto();
    dayAmaal.date = amaalDate;
    dayAmaal.isEditable = isEditable;
    dayAmaal.amaals = this.amaals;
    return dayAmaal;
  }

  async getDayAmaalByWeek(
    startOfWeek: string,
    endOfWeek: string,
    user: User,
  ): Promise<DayAmaalDto[]> {
    const dates = getAllDatesBetweenInclusive(startOfWeek, endOfWeek);
    const isEditable = isActiveWeek(startOfWeek, 3);
    const dayAmaals: DayAmaalDto[] = await Promise.all(
      dates.map(async (date) => {
        
        const dayAmaal: DayAmaal = await this.findAmaal(date, user);
        if (dayAmaal) {
          return this.dayAmaalEntityToDto(dayAmaal, isEditable);
        } else {
          return this.generateAmaal(date, isEditable);
        }
      }),
    );

    return dayAmaals;
  }

  async findOrCreateUser(payload: any): Promise<User> {
    return await this.userService.findOrCreateUser(payload);
  }

  /**
   *
   * @param dayAmaal
   * @param user
   * @returns
   */
  async createOrUpdateDayAmaal(dayAmaal: DayAmaalDto, user: User) {
    // TODO: Add validation
    if (dayAmaal) {
      // Find existing entity.
      let dayAmaalEntity: DayAmaal = await this.findAmaal(dayAmaal.date, user);
      if (dayAmaalEntity) {
        console.log(`DayAmaal updated for Date: ${dayAmaal.date}`);
        dayAmaalEntity.amaals = plainToInstance(DayAmaal, dayAmaal).amaals;
        return await this.dayAmaalRepo.save(dayAmaalEntity);
      }
      console.log(
        `DayAmaal created for Date: ${dayAmaal.date}, User: ${user.email}`,
      );
      dayAmaalEntity = plainToInstance(DayAmaal, dayAmaal);
      dayAmaalEntity.user = user;
      dayAmaalEntity.date = formatDate(dayAmaal.date);
      return await this.dayAmaalRepo.save(dayAmaalEntity);
    }
  }

  /**
   *
   * @param date
   * @param user
   * @returns
   */
  async findAmaal(date: Date, user: User): Promise<DayAmaal> {
    return await this.dayAmaalRepo.findOne({
      where: {
        date: formatDate(date),
        user: {
          id: user.id,
        },
      },
    });
  }

  private dayAmaalEntityToDto(entity: DayAmaal, isEditable: boolean): DayAmaalDto {
    const dto: DayAmaalDto = new DayAmaalDto();
    //console.log(`Day Amaal Entity Found Date: ${entity.date}`);
    dto.date = parseDateString(entity.date);
    dto.isEditable = isEditable;
    //console.log(`Day Amaal Entity Parsed Date: ${dto.date}`);
    entity.amaals.map((amaal) => {
      dto.addAmaal(
        new AmaalDto(
          AmaalCategory[amaal.category],
          AmaalKind[amaal.kind],
          amaal.duration,
          amaal.perfomed,
        ),
      );
    });
    return dto;
  }
}
