import { Injectable } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Audha, Momin, RehbarType, RelationType } from './dto/tanzeem.dto';
import { initials } from 'src/utils/utils';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TanzeemService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async createMomins(momins: Momin[]) {
    await Promise.all(
      momins.map((momin) => {
        momin.id = uuidv4();
        this.createMomin(momin);
      }),
    );
  }

  async createMomin(momin: Momin): Promise<any> {
    return await this.neo4jService.run(
      `CREATE(m: Momin {id: $id,  firstName: $firstName, lastName: $lastName, initials: $initials, audha: $audha})`,
      {
        id: momin.id,
        firstName: momin.firstName,
        lastName: momin.lastName,
        initials: initials(momin.firstName, momin.lastName),
        audha: momin.audha.toString(),
      },
    );
  }

  async associateRahbar(
    rehbarId: string,
    rehbeerId: string,
    rehbarType: RehbarType = RehbarType.DIRECT,
  ) {
    return await this.neo4jService.run(
      `MATCH(m1:Momin{id:$rehbarId}) MATCH(m2: Momin{id: $rehbeerId}) CREATE (m1)-[:REHBAR_OF{type:$rehbarType}]->(m2)`,
      {
        rehbarId: rehbarId,
        rehbeerId: rehbeerId,
        rehbarType: rehbarType.toString(),
      },
    );
  }

  async getRehbarAssociations(rehbarId: string, type?: RelationType) {
    if (!type) {
      const results = await this.neo4jService.run(
        `MATCH (n:Momin{id:$rehbarId}) OPTIONAL MATCH (n)-[r:REHBAR_OF*]->(m) RETURN n, collect(m) AS momins, collect(r) AS relationships`,
        {
          rehbarId: rehbarId,
        },
      );
      return results.records;
    }
  }

  async disassociateRahbarOf(rehbarId: string) {
    return await this.neo4jService.run(
      `MATCH(m1:Momin{id:$rehbarId})-[r:REHBAR_OF]->() DELETE r`,
      { rehbarId: rehbarId },
    );
  }

  async disassociateAllRehbar() {
    return await this.neo4jService.run(`MATCH ()-[r:REHBAR_OF]->() DELETE r`);
  }

  async deleteAllMomins() {
    return await this.neo4jService.run(`MATCH (n:Momin) DETACH DELETE n`);
  }
}
