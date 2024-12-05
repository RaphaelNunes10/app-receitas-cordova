import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Camera } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform, ItemReorderEventDetail } from '@ionic/angular';

import {
  MedidaIngrediente,
  MedidaPorcao,
  Receita,
} from 'src/app/models/receita';
import { ReceitaService } from '../services/receita.service';
import { Capacitor } from '@capacitor/core';

import {
  MaskitoOptions,
  MaskitoElementPredicate,
  maskitoTransform,
} from '@maskito/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  @ViewChild('form', { static: false }) form!: NgForm;

  isDesktop: boolean;

  receita: Receita;
  medidasIngrediente: MedidaIngrediente[];
  medidasPorcao: MedidaPorcao[];
  errorMessage: string;

  readonly tempoPreparoMask: MaskitoOptions = {
    mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(
    private router: Router,
    private platform: Platform,
    private receitaService: ReceitaService,
  ) {
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

    this.medidasIngrediente = [
      'X',
      'Colher(es) de Café',
      'Colher(es) de Chá',
      'Colher(es) de Sobremesa',
      'Colher(es) de Sopa',
      'Xicara(s) de café',
      'Xicara(s) de chá',
      'Copo(s) americano',
      'Copo(s) de requeijão',
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

    this.errorMessage = '';
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
        const photo = imagem.photos[0];

        let imageUrl = '';
        if (Capacitor.getPlatform() === 'web') {
          // For web, use the webPath directly as base64
          const response = await fetch(photo.webPath!);
          const blob = await response.blob();
          imageUrl = await this.blobToBase64(blob);
        } else {
          // For native platforms, use Filesystem to read the file
          const file = await Filesystem.readFile({
            path: photo.path!,
          });
          imageUrl = `data:image/jpeg;base64,${file.data}`;
        }

        this.receita.imagens.push({
          listIndex: NaN,
          url: imageUrl,
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

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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

    this.errorMessage = '';
  }

  async addReceita() {
    if (this.receita.imagens.length == 0) {
      this.errorMessage = 'Cadastre pelo menos uma imagem.';
    } else if (this.form.valid) {
      this.receita.dataCriacao = new Date();
      try {
        await this.receitaService.createReceita(this.receita);
        this.clearReceita();
        // this.router.navigate(['/home']);
      } catch {
        this.errorMessage = 'Houve um erro interno ao cadastrar a receita.';
      }
    }
  }
}
