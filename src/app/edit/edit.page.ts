import { Component } from '@angular/core';
import { Receita } from 'src/models/receita.interface';

import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  receita: Receita = {
    id: '',
    titulo: '',
    imagens: [],
    descricao: '',
    preparo: '',
    tempoPreparo: '',
    porcao: '',
    ingredientes: [],
    utensilios: [],
    notasAdicionais: '',
    dataCriacao: undefined
  };

  async addImagem() {
    try {
      const imagem = await Camera.pickImages({
        quality: 90,
        limit: 1,
      });

      if (imagem.photos[0]?.path) {
        this.receita.imagens.push(imagem.photos[0].path);
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }
}
