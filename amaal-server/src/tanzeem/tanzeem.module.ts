import { Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { TanzeemController } from './tanzeem.controller';
import { TanzeemService } from './tanzeem.serivce';

@Module({  
  providers: [Neo4jService, TanzeemService],
  exports: [Neo4jService, TanzeemService],
  controllers: [TanzeemController]
})
export class TanzeemModule {}
