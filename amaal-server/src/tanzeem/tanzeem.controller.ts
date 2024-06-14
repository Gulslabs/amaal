import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Momin, Rehbar, RehbarType } from './dto/tanzeem.dto';
import { TanzeemService } from './tanzeem.serivce';
import { identity } from 'rxjs';

@Controller('tanzeem')
export class TanzeemController {
  constructor(private readonly tanzeemService: TanzeemService) {}

  // MOMINS
  @Post('/momins')
  async createMomins(@Body() momins: Momin[]): Promise<any> {
    await this.tanzeemService.createMomins(momins);
    return undefined;
  }

  @Delete('/momins')
  async deleteMomins() {
    await this.tanzeemService.deleteAllMomins();
  }

  // REHBAR
  /**
   * Create Rehbar to Rehbeer relationship.
   * @param rehbar
   */
  @Post('/momins/rehbar/')
  async associateRahbar(@Body() rehbar: Rehbar) {
    await this.tanzeemService.associateRahbar(
      rehbar.rehbarId,
      rehbar.rehbeerId,
      rehbar.rehbarType,
    );
  }
  @Get('/momins/rehbar/:rehbarId')
  async getRehbarAssociations(@Param('rehbarId') rebarId: string) {
    const records =  await this.tanzeemService.getRehbarAssociations(rebarId);
   // console.log(`Records: ${JSON.stringify(records)}`);
    records.map(record => {
      console.log(`RootNode:   ${JSON.stringify(record.get('n').properties)}`)
      console.log(`Momins: ${JSON.stringify(record.get('momins').map((m) => m.properties))}`)      
      console.log(`Relationships: ${JSON.stringify(record.get('relationships').flat().map(r => r.end.low))}`)
    });

    return records.map((record) => ({
      n: {
        identity: record.get('n').identity.low,
        ...record.get('n').properties},
      momins: record.get('momins').map((m) => ({
        identity:  m.identity.low,
        ...m.properties
      })),
      relationships: record.get('relationships').flat().map((r) => ({        
        start: r.start.low,
        end: r.end.low,
        type: r.type,
      })),
    }));
    // return records; 
  }
  /**
   * Delete All Rehbar, Rehbeer relationship.
   */
  @Delete('/momins/rehbar/')
  async disassociateAllRehbar() {
    return await this.tanzeemService.disassociateAllRehbar();
  }

  @Delete('/momins/rehbar/:rebarId')
  async disassociateRehbarOf(@Param('rebarId') rebarId: string) {
    return await this.tanzeemService.disassociateRahbarOf(rebarId);
  }
}
