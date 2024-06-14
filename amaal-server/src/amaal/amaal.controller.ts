import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AmaalService } from './amaal.service';
import { DayAmaalDto } from './dto/amaal.dto';

@Controller('amaal')
export class AmaalController {
  constructor(private readonly amaalService: AmaalService) {}  

  @UseGuards(JwtGuard)
  @Get('/')
  async amaalByDateRange(
    @Req() req,
    @Query() params: any,
  ): Promise<DayAmaalDto[]> {
    // TODO: Add query params validation using Validation Pipe.
    console.log(`Query Params: ${JSON.stringify(params)}`);
    //console.log(`Request User: ${JSON.stringify(req.user)}`);
    const user = await this.amaalService.findOrCreateUser(req.user);
    return this.amaalService.getDayAmaalByWeek(
      params.startOfWeek,
      params.endOfWeek,
      user,
    );
    // TODO: We we need to beautify the screen with user details on upper left corner.
    // return {"amaalsByDay": this.amaalService.getDayAmaalByWeek(params.startOfWeek,params.endOfWeek), "user": req.user};
  }

  @UseGuards(JwtGuard)
  @Post('/')
  async updateDayAmaal(@Body() dayAmaal: DayAmaalDto, @Req() req): Promise<any> {
    const userId = await this.amaalService.findOrCreateUser(req.user);    
    console.log(`DayAmaal Update: ${JSON.stringify(dayAmaal)} `);
    return await this.amaalService.createOrUpdateDayAmaal(dayAmaal, userId);
  }
}
