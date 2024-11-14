import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';

import { Receita } from '../models/receita';
import { ReceitaUpgradeStatements } from '../upgrades/receita.upgrade.statements';

@Injectable()
export class StorageService {
  public receitaList: BehaviorSubject<Receita[]> = new BehaviorSubject<
    Receita[]
  >([]);

  private databaseName: string = '';
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;

  private receitaUpgradeStatements: ReceitaUpgradeStatements =
    new ReceitaUpgradeStatements();
  private isReceitaReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqliteService: SQLiteService,
    private dbVerService: DbnameVersionService,
  ) {
    this.versionUpgrades = this.receitaUpgradeStatements.receitaUpgrades;
    this.loadToVersion =
      this.versionUpgrades[this.versionUpgrades.length - 1].toVersion;
  }

  async initializeDatabase(dbName: string) {
    this.databaseName = dbName;

    // create upgrade statements
    await this.sqliteService.addUpgradeStatement({
      database: this.databaseName,
      upgrade: this.versionUpgrades,
    });

    // create and/or open the database
    this.db = await this.sqliteService.openDatabase(
      this.databaseName,
      false,
      'no-encryption',
      this.loadToVersion,
      false,
    );
    this.dbVerService.set(this.databaseName, this.loadToVersion);

    await this.getReceitas();
  }

  // Current database state
  receitaState() {
    return this.isReceitaReady.asObservable();
  }

  fetchReceitas(): Observable<Receita[]> {
    return this.receitaList.asObservable();
  }

  // CRUD Operations
  async getReceitas() {
    const receitas: Receita[] = (await this.db.query('SELECT * FROM receitas;'))
      .values as Receita[];
    this.receitaList.next(receitas);
    this.isReceitaReady.next(true);
  }

  async addReceita(receita: Receita) {
    const sql = 'INSERT INTO receitas VALUES (?);';
    await this.db.run(sql, [
      receita.listIndex,
      receita.titulo,
      receita.descricao,
      receita.tempoPreparo,
      receita.porcao.quantidade,
      receita.porcao.medida,
      receita.dataCriacao,
    ]);
    await this.getReceitas();
  }

  async updateReceitaById(id: string, active: number) {
    const sql = `UPDATE receitas SET active=${active} WHERE id=${id}`;
    await this.db.run(sql);
    await this.getReceitas();
  }

  async deleteReceitaById(id: string) {
    const sql = `DELETE FROM receitas WHERE id=${id}`;
    await this.db.run(sql);
    await this.getReceitas();
  }
}
