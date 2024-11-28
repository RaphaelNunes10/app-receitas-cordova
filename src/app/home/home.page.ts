import { Component, OnInit } from '@angular/core';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { Receita } from 'src/app/models/receita';
import { ReceitaService } from '../services/receita.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  receitas: Receita[];

  constructor(private receitaService: ReceitaService) {
    this.receitas = [];
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  async ngOnInit(): Promise<void> {
    await this.receitaService.fetchReceita();
    this.receitas = this.receitaService.receitas.map((receita) => ({
      ...receita,
      dataCriacao: new Date(receita.dataCriacao),
    }));
  }
}
