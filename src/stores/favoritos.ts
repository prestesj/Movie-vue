import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Favorito } from '@/types/filmes'
import { adicionarFavorito, listarFavoritos, removerFavorito } from '@/services/filmesService'

export const useFavoritosStore = defineStore('favoritos', () => {
  const favoritos = ref<Favorito[]>([])

  async function carregar() {
    favoritos.value = await listarFavoritos()
  }

  function ehFavorito(filmeId: number) {
    return favoritos.value.some((f) => f.filmeId === filmeId)
  }

  async function alternar(filmeId: number) {
    const existente = favoritos.value.find((f) => f.filmeId === filmeId)
    if (existente) {
      await removerFavorito(existente.id)
      favoritos.value = favoritos.value.filter((f) => f.id !== existente.id)
    } else {
      favoritos.value.push(await adicionarFavorito(filmeId))
    }
  }

  return { favoritos, carregar, ehFavorito, alternar }
})
