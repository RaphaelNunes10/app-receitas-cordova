import { Component } from '@angular/core';

import { Camera } from '@capacitor/camera';
import { Platform, ItemReorderEventDetail } from '@ionic/angular';

import { StorageService } from '../services/storage.service';
import {
  MedidaIngrediente,
  MedidaPorcao,
  Receita,
} from 'src/app/models/receita';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  isDesktop: boolean;

  receita: Receita;
  medidasIngrediente: MedidaIngrediente[];
  medidasPorcao: MedidaPorcao[];

  constructor(private platform: Platform, private storage: StorageService) {
    this.isDesktop = this.platform.is('desktop');

    this.receita = {
      id: '',
      listIndex: NaN,
      titulo: '',
      imagens: [],
      descricao: '',
      ingredientes: [
        {
          listIndex: 0,
          quantidade: NaN,
          medida: 'Colher de Café',
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
      dataCriacao: undefined,
    };

    this.medidasIngrediente = [
      'Colher de Café',
      'Colher de Chá',
      'Colher de Sobremesa',
      'Colher de Sopa',
      'mg',
      'g',
      'Kg',
      'ml',
      'L',
    ];

    this.medidasPorcao = [
      'Unidade(s)',
      'Pedaço(s)',
      'Fatia(s)',
      'g',
      'kg',
      'L',
      'Pessoa(s)',
    ];
  }

  async addItem(object: any, list: any[]) {
    list.push(object);

    list.forEach((item: { listIndex: number }, i: number) => {
      item.listIndex = i;
    });
  }

  async removeItem(index: number, list: any[]) {
    list.splice(index, 1);

    list.forEach((item: { listIndex: number }, i: number) => {
      item.listIndex = i;
    });
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>, list: any[]) {
    const [movedItem] = list.splice(ev.detail.from, 1);
    list.splice(ev.detail.to, 0, movedItem);

    list.forEach((item: { listIndex: number }, i: number) => {
      item.listIndex = i;
    });

    ev.detail.complete();
  }

  async addImagem() {
    try {
      const imagem = await Camera.pickImages({
        quality: 90,
        limit: 1,
      });

      if (imagem.photos[0]) {
        this.receita.imagens.push({
          listIndex: NaN,
          url: imagem.photos[0].webPath,
        });

        this.receita.imagens.forEach(
          (imagem: { listIndex: number }, i: number) => {
            imagem.listIndex = i;
          },
        );
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }

  clearReceita() {
    this.receita = {
      id: '',
      listIndex: NaN,
      titulo: '',
      imagens: [],
      descricao: '',
      ingredientes: [
        {
          listIndex: 0,
          quantidade: NaN,
          medida: 'Colher de Café',
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
      dataCriacao: undefined,
    };
  }

  async createReceita() {
    await this.storage.addReceita(this.receita)
    this.clearReceita();
  }

  // updateReceita(receita: Receita) {
  // }

  deleteReceita(receita: Receita) {
      this.storage.deleteReceitaById(receita.id.toString())
  }
}
