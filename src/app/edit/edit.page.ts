import { Component } from '@angular/core';
import { MedidaIngrediente, MedidaPorcao, PeriodoPreparo, Receita } from 'src/models/receita.interface';

import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  receita: Receita
  medidasIngrediente: MedidaIngrediente[]
  periodosPreparo: PeriodoPreparo[]
  medidasPorcao: MedidaPorcao[]

  constructor() {
   this.receita = {
      id: '',
      titulo: '',
      imagens: [],
      descricao: '',
      preparo: [
        {
          passo: ''
        }
      ],
      ingredientes: [
        {
          quantidade: 0,
          medida: 'Colher de Café',
          ingrediente: '',
        }
      ],
      tempoPreparo: {
        valor: 0,
        periodo: 'Segundo(s)',
      },
      porcao: {
        quantidade: 0,
        medida: 'Unidade(s)'
      },
      utensilios: [
        {
          quantidade: 0,
          utensilio: ''
        }
      ],
      notasAdicionais: '',
      dataCriacao: undefined,
    }

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
    ]

    this.periodosPreparo = [
      'Segundo(s)',
      'Minuto(s)',
      'Hora(s)',
    ]

    this.medidasPorcao = [
      'Unidade(s)',
      'Pedaço(s)',
      'Fatia(s)',
      'g',
      'kg',
      'L',
      'Pessoa(s)',
    ]
  }

  async addImagem() {
    try {
      const imagem = await Camera.pickImages({
        quality: 90,
        limit: 1,
      })

      if (imagem.photos[0]) {
        this.receita.imagens.push(imagem.photos[0].webPath);
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }
}
