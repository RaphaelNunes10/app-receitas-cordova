import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';

import {
  Receita,
  Imagem,
  Ingrediente,
  Utensilio,
  Preparo,
} from '../models/receita';
import { ReceitaUpgradeStatements } from '../upgrades/receita.upgrade.statements';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private databaseName: string = '';
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;

  private receitaUpgradeStatements: ReceitaUpgradeStatements =
    new ReceitaUpgradeStatements();

  public receitaList: BehaviorSubject<Receita[]> = new BehaviorSubject<
    Receita[]
  >([]);
  public imagemList: BehaviorSubject<Imagem[]> = new BehaviorSubject<Imagem[]>(
    [],
  );
  public ingredienteList: BehaviorSubject<Ingrediente[]> = new BehaviorSubject<
    Ingrediente[]
  >([]);
  public utensilioList: BehaviorSubject<Utensilio[]> = new BehaviorSubject<
    Utensilio[]
  >([]);
  public preparoList: BehaviorSubject<Preparo[]> = new BehaviorSubject<
    Preparo[]
  >([]);

  private isReceitaReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isImagemReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isIngredienteReady: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  private isUtensilioReady: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  private isPreparoReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

  // Receita
  receitaState() {
    return this.isReceitaReady.asObservable();
  }

  fetchReceitas(): Observable<Receita[]> {
    return this.receitaList.asObservable();
  }

  // Imagem
  imagemState() {
    return this.isImagemReady.asObservable();
  }

  fetchImagem(): Observable<Imagem[]> {
    return this.imagemList.asObservable();
  }

  // Ingrediente
  ingredienteState() {
    return this.isIngredienteReady.asObservable();
  }

  fetchIngrediente(): Observable<Ingrediente[]> {
    return this.ingredienteList.asObservable();
  }

  // Utensilio
  utensilioState() {
    return this.isUtensilioReady.asObservable();
  }

  fetchUtensilio(): Observable<Utensilio[]> {
    return this.utensilioList.asObservable();
  }

  // Preparo
  preparoState() {
    return this.isPreparoReady.asObservable();
  }

  fetchPreparo(): Observable<Preparo[]> {
    return this.preparoList.asObservable();
  }

  // CRUD Operations

  // Receita
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

  // async updateReceitaById(id: string, receita: Receita) {}

  async deleteReceitaById(id: string) {
    const sql = `DELETE FROM receitas WHERE id=${id}`;
    await this.db.run(sql);
    await this.getReceitas();
  }

  // Imagem
  async getImagens() {
    const imagens: Imagem[] = (await this.db.query('SELECT * FROM imagens;'))
      .values as Imagem[];
    this.imagemList.next(imagens);
    this.isImagemReady.next(true);
  }

  async addImagem(imagem: Imagem) {
    const sql = 'INSERT INTO imagens VALUES (?);';
    await this.db.run(sql, [imagem.listIndex, imagem.url]);
    await this.getImagens();
  }

  // async updateImagemById(id: string, imagem: Imagem) {}

  async deleteImagemById(id: string) {
    const sql = `DELETE FROM imagens WHERE id=${id}`;
    await this.db.run(sql);
    await this.getImagens();
  }

  // Ingrediente
  async getIngredientes() {
    const ingredientes: Ingrediente[] = (
      await this.db.query('SELECT * FROM ingredientes;')
    ).values as Ingrediente[];
    this.ingredienteList.next(ingredientes);
    this.isIngredienteReady.next(true);
  }

  async addIngredientes(ingrediente: Ingrediente) {
    const sql = 'INSERT INTO ingredientes VALUES (?);';
    await this.db.run(sql, [
      ingrediente.listIndex,
      ingrediente.quantidade,
      ingrediente.medida,
      ingrediente.ingrediente,
    ]);
    await this.getIngredientes();
  }

  // async updateIngredienteById(id: string, ingrediente: Ingrediente) {}

  async deleteIngredienteById(id: string) {
    const sql = `DELETE FROM ingredientes WHERE id=${id}`;
    await this.db.run(sql);
    await this.getIngredientes();
  }

  // Utensilio
  async getUtensilios() {
    const utensilios: Utensilio[] = (
      await this.db.query('SELECT * FROM utensilio;')
    ).values as Utensilio[];
    this.utensilioList.next(utensilios);
    this.isUtensilioReady.next(true);
  }

  async addUtensilios(utensilio: Utensilio) {
    const sql = 'INSERT INTO utensilios VALUES (?);';
    await this.db.run(sql, [
      utensilio.listIndex,
      utensilio.quantidade,
      utensilio.utensilio,
    ]);
    await this.getUtensilios();
  }

  // async updateUtensilioById(id: string, utensilio: Utensilio) {}

  async deleteUtensilioById(id: string) {
    const sql = `DELETE FROM utensilios WHERE id=${id}`;
    await this.db.run(sql);
    await this.getUtensilios();
  }

  // Preparo
  async getPreparos() {
    const preparos: Preparo[] = (await this.db.query('SELECT * FROM preparo;'))
      .values as Preparo[];
    this.preparoList.next(preparos);
    this.isPreparoReady.next(true);
  }

  async addPreparos(preparo: Preparo) {
    const sql = 'INSERT INTO preparos VALUES (?);';
    await this.db.run(sql, [preparo.listIndex, preparo.passo]);
    await this.getPreparos();
  }

  // async updatePreparoById(id: string, preparo: Preparo) {}

  async deletePreparoById(id: string) {
    const sql = `DELETE FROM preparos WHERE id=${id}`;
    await this.db.run(sql);
    await this.getPreparos();
  }
}
