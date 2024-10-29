export interface Receita {
  id: string,
  titulo: string,
  imagem: `http${'s' | ''}://${string}` | `data:image/${string};base64,${string}`,
  info: string,
  preparo: string,
  tempoPreparo: `${number} ${`Segundos${'s' | ''}` | `Minuto${'s' | ''}` | `Hora${'s' | ''}`}`,
  porcao: `${number} ${`Unidade${'s' | ''}` | `Pedaço${'s' | ''}` | `Fatia${'s' | ''}` | 'g' | 'kg' | 'L' | `Pessoa${'s' | ''}`}`,
  utensilhos: `${number}x ${string}`[],
  dataCriacao: Date
}
