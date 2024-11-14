import { Component } from '@angular/core';
import { Receita } from 'src/app/models/receita';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  receitas: Receita[];

  constructor() {
    this.receitas = [];
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
