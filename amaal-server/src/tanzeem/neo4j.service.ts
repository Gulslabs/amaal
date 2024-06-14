import { Injectable, OnModuleInit } from '@nestjs/common';
import { Driver, auth, driver } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit {
  private driver: Driver;

  onModuleInit() {
    this.driver = driver(
      'bolt://localhost:7687',
      auth.basic('neo4j', 'test12345'),
    );
  }

  getSession() {
    return this.driver.session();
  }
  async close() {
    await this.driver.close();
  }

  async clearDatabase() {
    const session = this.getSession();
    try {
      await session.run(`MATCH (n) DETACH DELETE n;`);
    } finally {
      await session.close();
    }
  }

  async run(query: string, parameters?: any): Promise<any> {
    const session = this.getSession();
    try {
      if (parameters) {
        return await session.run(query, parameters);
      }
      return await session.run(query);
    } catch (error) {
      console.error(`Error Executing Cypher Query: ${error}`);
    } finally {
      await session.close();
    }
  }
}
