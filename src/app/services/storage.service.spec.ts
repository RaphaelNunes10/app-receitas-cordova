import { StorageService } from './storage.service';

import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';

describe('StorageService', () => {
  let sqliteService: SQLiteService;
  let dbVerService: DbnameVersionService;

  it('should create an instance', () => {
    expect(new StorageService(sqliteService, dbVerService)).toBeTruthy();
  });
});
