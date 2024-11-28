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

  public async createReceita(receita: Receita) {
    this.receitas.push(receita);

    await Preferences.set({
      key: 'receitas',
      value: JSON.stringify(this.receitas),
    });
  }

  public async fetchReceita() {
    const { value } = await Preferences.get({ key: 'receitas' });

    value ? (this.receitas = JSON.parse(value)) : (this.receitas = []);
  }
}
