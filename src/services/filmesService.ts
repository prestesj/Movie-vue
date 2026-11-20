import { api } from './api'
import type { Favorito, Filme } from '@/types/filmes'

export async function listarFilmes(busca = ''): Promise<Filme[]> {
  const response = await api.get<Filme[]>('/filmes', {
    params: { q: busca || undefined },
  })
  return response.data
}

export async function buscarFilme(id: number | string): Promise<Filme> {
  const response = await api.get<Filme>(`/filmes/${id}`)
  return response.data
}

export async function listarFavoritos(): Promise<Favorito[]> {
  const response = await api.get<Favorito[]>('/favoritos')
  return response.data
}

export async function adicionarFavorito(filmeId: number): Promise<Favorito> {
  const response = await api.post<Favorito>('/favoritos', { filmeId })
  return response.data
}

export async function removerFavorito(id: number): Promise<void> {
  await api.delete(`/favoritos/${id}`)
}
