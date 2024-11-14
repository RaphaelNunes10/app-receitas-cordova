import { Component } from '@angular/core';
import { of, switchMap } from 'rxjs';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { StorageService } from '../services/storage.service';
import { Receita } from 'src/app/models/receita';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  receitas: Receita[];

  constructor(private storage: StorageService) {
    this.receitas = [];
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  ngOnInit() {
    try {
      this.storage.receitaState().pipe(
          switchMap(res => {
          if (res) {
              return this.storage.fetchReceitas();
          } else {
              return of([]); // Return an empty array when res is false
          }
          })
      ).subscribe(data => {
          this.receitas = data; // Update the receita list when the data changes
      });

      } catch(err) {
      throw new Error(`Error: ${err}`);
      }
  }
}
