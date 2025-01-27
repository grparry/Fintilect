import { Database } from '@cbp-config-api/config/db';

export abstract class BaseRepository {
  protected db: Database;
  protected readonly tableName: string;

  constructor(tableName: string, db: Database) {
    this.tableName = tableName;
    this.db = db;
  }
}
