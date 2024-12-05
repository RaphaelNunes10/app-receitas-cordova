export type MedidaIngrediente =
  | 'X'
  | 'Colher(es) de Café'
  | 'Colher(es) de Chá'
  | 'Colher(es) de Sobremesa'
  | 'Colher(es) de Sopa'
  | 'Xicara(s) de café'
  | 'Xicara(s) de chá'
  | 'Copo(s) americano'
  | 'Copo(s) de requeijão'
  | 'mg'
  | 'g'
  | 'Kg'
  | 'ml'
  | 'L';

export type MedidaPorcao =
  | 'Unidade(s)'
  | 'Pedaço(s)'
  | 'Fatia(s)'
  | 'g'
  | 'kg'
  | 'L'
  | 'Pessoa(s)';

export interface Imagem {
  listIndex: number;
  url: string;
}

export interface Ingrediente {
  listIndex: number;
  quantidade: number;
  medida: MedidaIngrediente;
  ingrediente: string;
}

export interface Utensilio {
  listIndex: number;
  quantidade: number;
  utensilio: string;
}

export interface Preparo {
  listIndex: number;
  passo: string;
}

export interface Porcao {
  quantidade: number;
  medida: MedidaPorcao;
}

export interface Receita {
  id: string;
  listIndex: number;
  titulo: string;
  imagens: Imagem[];
  descricao: string;
  ingredientes: Ingrediente[];
  utensilios: Utensilio[];
  preparo: Preparo[];
  tempoPreparo: string;
  porcao: Porcao;
  dataCriacao: Date;
}
