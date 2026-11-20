export interface Filme {
  id: number
  titulo: string
  ano: number
  genero: string[]
  nota: number
  poster: string
  sinopse: string
}
export interface Favorito {
  id: number
  filmeId: number
}
