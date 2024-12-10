import { Injectable } from '@angular/core';

import { Preferences } from '@capacitor/preferences';

import { Receita } from '../models/receita';

@Injectable({
  providedIn: 'root',
})
export class ReceitaService {
  public receitas: Receita[];

  constructor() {
    this.receitas = [];
  }

  public async fetchReceita() {
    const { value } = await Preferences.get({ key: 'receitas' });

    value ? (this.receitas = JSON.parse(value)) : (this.receitas = []);
  }

  public async createReceita(receita: Receita) {
    this.receitas.push(receita);

    await Preferences.set({
      key: 'receitas',
      value: JSON.stringify(this.receitas),
    });

    await this.fetchReceita();
  }

  public async updateReceita(index: number, receita: Receita) {
    this.receitas[index] = receita;

    await Preferences.set({
      key: 'receitas',
      value: JSON.stringify(this.receitas),
    });

    await this.fetchReceita();
  }

  public async deleteReceita(id: string) {
    const index = this.receitas.findIndex((receita) => receita.id === id);
    this.receitas.splice(index, 1);

    await Preferences.set({
      key: 'receitas',
      value: JSON.stringify(this.receitas),
    });

    await this.fetchReceita();
  }
}
