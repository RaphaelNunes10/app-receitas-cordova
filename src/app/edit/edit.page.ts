import { Component } from '@angular/core'
import { MedidaIngrediente, MedidaPorcao, PeriodoPreparo, Receita } from 'src/models/receita.interface'

import { Camera } from '@capacitor/camera'
import { Platform, ItemReorderEventDetail } from '@ionic/angular'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  isDesktop: boolean

  receita: Receita
  medidasIngrediente: MedidaIngrediente[]
  periodosPreparo: PeriodoPreparo[]
  medidasPorcao: MedidaPorcao[]

  constructor(private platform: Platform) {
  this.isDesktop = this.platform.is('desktop')

   this.receita = {
      id: '',
      titulo: '',
      imagens: [],
      descricao: '',
      preparo: [
        {
          listIndex: 0,
          passo: '',
        }
      ],
      ingredientes: [
        {
          listIndex: 0,
          quantidade: NaN,
          medida: 'Colher de Café',
          ingrediente: '',
        }
      ],
      tempoPreparo: {
        valor: NaN,
        periodo: 'Segundo(s)',
      },
      porcao: {
        quantidade: NaN,
        medida: 'Unidade(s)',
      },
      utensilios: [],
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

  async addItem(object: any, list: any[]) {
    list.push(object)

    list.forEach((item: { listIndex: number }, i: number) => {
        item.listIndex = i
    })
  }

  async removeItem(index: number, list: any[]) {
    list.splice(index, 1)

    list.forEach((item: { listIndex: number }, i: number) => {
      item.listIndex = i
    })
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>, list: any[]) {
    const [movedItem] = list.splice(ev.detail.from, 1)
    list.splice(ev.detail.to, 0, movedItem)

    list.forEach((item: { listIndex: number }, i: number) => {
      item.listIndex = i
    })

    ev.detail.complete()
  }

  async addImagem() {
    try {
      const imagem = await Camera.pickImages({
        quality: 90,
        limit: 1,
      })

      if (imagem.photos[0]) {
        this.receita.imagens.push(imagem.photos[0].webPath)
      }
    } catch (error) {
      console.error('Error capturing image:', error)
    }
  }
}
