import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { Receita } from 'src/app/models/receita';
import { ReceitaService } from '../services/receita.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  receitas!: Receita[];

  constructor(
    private router: Router,
    private receitaService: ReceitaService,
  ) {}

  private async loadReceitas(): Promise<void> {
    await this.receitaService.fetchReceita();
    this.receitas = this.receitaService.receitas.map((receita) => ({
      ...receita,
      dataCriacao: new Date(receita.dataCriacao),
    }));
  }

  async removeReceita(id: string) {
    await this.receitaService.deleteReceita(id);
    this.receitas = this.receitaService.receitas;
  }

  async ngOnInit(): Promise<void> {
    this.loadReceitas();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe(async (event) => {
        if (event.url === '/home') {
          await this.loadReceitas();
        }
      });
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
