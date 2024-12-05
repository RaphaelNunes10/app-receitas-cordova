import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Receita } from '../models/receita';
import { ReceitaService } from '../services/receita.service';

import { Platform, IonicSlides } from '@ionic/angular';

import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper';

register();

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  receitaId!: string;
  receitaTitulo!: string;
  receita!: Receita;

  swiperModules = [IonicSlides];
  swiper!: Swiper

  isDesktop: boolean;

  constructor(
    private route: ActivatedRoute,
    private receitaService: ReceitaService,
    private platform: Platform,
  ) {
    this.isDesktop = this.platform.is('desktop');
  }

  async getReceita() {
    await this.receitaService.fetchReceita();

    this.receita =
      this.receitaService.receitas.find((item) => item.id == this.receitaId) ||
      {
        id: '',
        listIndex: NaN,
        titulo: '',
        imagens: [],
        descricao: '',
        ingredientes: [
          {
            listIndex: 0,
            quantidade: NaN,
            medida: 'X',
            ingrediente: '',
          },
        ],
        utensilios: [],
        preparo: [
          {
            listIndex: 0,
            passo: '',
          },
        ],
        tempoPreparo: '',
        porcao: {
          quantidade: NaN,
          medida: 'Unidade(s)',
        },
        dataCriacao: new Date(),
      };
  }

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.receitaId = params.get('receitaId') || '';
      this.receitaTitulo = params.get('receitaTitulo') || '';
    });

    this.getReceita();
  }
}
