export type PeriodoPreparo = 'Segundo(s)' | 'Minuto(s)' | 'Hora(s)'
export type MedidaIngrediente = 'Colher de Café' | 'Colher de Chá' | 'Colher de Sobremesa' | 'Colher de Sopa' | 'mg' | 'g' | 'Kg' | 'ml' | 'L'
export type MedidaPorcao = 'Unidade(s)' | 'Pedaço(s)' | 'Fatia(s)' | 'g' | 'kg' | 'L' | 'Pessoa(s)'

// type UrlImagem = `http${'s' | ''}://${string}`
// type ImagemBase64 = `data:image/${string};base64,${string}`
type Passo = `• ${string}`
type Ingrediente = `${number} ${MedidaIngrediente} de ${string}`
type TempoPreparo = `${number} ${PeriodoPreparo}`
type Porcao = `${number} ${MedidaPorcao}`
type Utensilio = `${number}x ${string}`

export interface Receita {
  id: string,
  titulo: string,
  imagens: string[],
  descricao: string,
  preparo: Passo[],
  ingredientes: Ingrediente[],
  tempoPreparo: TempoPreparo | '',
  porcao: Porcao | '',
  utensilios: Utensilio[],
  notasAdicionais: string,
  dataCriacao: Date | undefined
}
