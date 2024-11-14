import { InitializeAppService } from './initialize.app.service';

import { SQLiteService } from './sqlite.service';
import { StorageService } from './storage.service';

describe('InitializeAppService', () => {
  let sqliteService: SQLiteService;
  let storageService: StorageService;

  it('should create an instance', () => {
    expect(
      new InitializeAppService(sqliteService, storageService),
    ).toBeTruthy();
  });
});
