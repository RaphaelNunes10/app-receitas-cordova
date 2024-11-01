export type PeriodoPreparo = 'Segundo(s)' | 'Minuto(s)' | 'Hora(s)'
export type MedidaIngrediente = 'Colher de Café' | 'Colher de Chá' | 'Colher de Sobremesa' | 'Colher de Sopa' | 'mg' | 'g' | 'Kg' | 'ml' | 'L'
export type MedidaPorcao = 'Unidade(s)' | 'Pedaço(s)' | 'Fatia(s)' | 'g' | 'kg' | 'L' | 'Pessoa(s)'

interface Preparo {
  passo: string
}

interface Ingrediente {
  quantidade: number,
  medida: MedidaIngrediente,
  ingrediente: string,
}

interface TempoPreparo {
  valor: number,
  periodo: PeriodoPreparo,
}

interface Porcao {
  quantidade: number,
  medida: MedidaPorcao,
}

interface Utensilio {
  quantidade: number,
  utensilio: string
}

export interface Receita {
  id: string,
  titulo: string,
  imagens: string[],
  descricao: string,
  preparo: Preparo[],
  ingredientes: Ingrediente[],
  tempoPreparo: TempoPreparo,
  porcao: Porcao,
  utensilios: Utensilio[],
  notasAdicionais: string,
  dataCriacao: Date | undefined
}
