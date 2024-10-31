export type PeriodoPreparo = `Segundos${'s' | ''}` | `Minuto${'s' | ''}` | `Hora${'s' | ''}`
export type MedidaPorcao = `Unidade${'s' | ''}` | `Pedaço${'s' | ''}` | `Fatia${'s' | ''}` | 'g' | 'kg' | 'L' | `Pessoa${'s' | ''}`
export type MedidaIngrediente = 'Colher de Café' | 'Colher de Chá' | 'Colher de Sobremesa' | 'Colher de Sopa' | 'mg' | 'g' | 'Kg' | 'ml' | 'L'

type UrlImagem = `http${'s' | ''}://${string}`
type ImagemBase64 = `data:image/${string};base64,${string}`
type TempoPreparo = `${number} ${PeriodoPreparo}`
type Porcao = `${number} ${MedidaPorcao}`
type Ingrediente = `${number} ${MedidaIngrediente} de ${string}`
type Utensilio = `${number}x ${string}`

export interface Receita {
  id: string,
  titulo: string,
  imagens: string[],
  descricao: string,
  preparo: string,
  tempoPreparo: TempoPreparo | '',
  porcao: Porcao | '',
  ingredientes: Ingrediente[],
  utensilios: Utensilio[],
  notasAdicionais: string,
  dataCriacao: Date | undefined
}
