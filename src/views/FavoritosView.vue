<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { listarFilmes } from '@/services/filmesService'
import { useFavoritosStore } from '@/stores/favoritos'
import type { Filme } from '@/types/filmes'
import FilmeCard from '@/components/filmes/FilmeCard.vue'
import FilmeCardSkeleton from '@/components/filmes/FilmeCardSkeleton.vue'
import EstadoErro from '@/components/ui/EstadoErro.vue'
import EstadoVazio from '@/components/ui/EstadoVazio.vue'

const favoritos = useFavoritosStore()
const filmes = ref<Filme[]>([])
const carregando = ref(true)
const erro = ref('')

const favoritados = computed(() => filmes.value.filter((f) => favoritos.ehFavorito(f.id)))

async function carregar() {
  erro.value = ''
  carregando.value = true
  try {
    const [lista] = await Promise.all([listarFilmes(), favoritos.carregar()])
    filmes.value = lista
  } catch {
    erro.value = 'Não foi possível carregar seus favoritos!'
  } finally {
    carregando.value = false
  }
}

async function remover(filmeId: number) {
  await favoritos.alternar(filmeId)
}

onMounted(carregar)
</script>

<template>
  <div class="mx-auto max-w-6xl p-6">
    <h1 class="mb-6 text-3xl font-bold">Meus favoritos</h1>

    <EstadoErro v-if="erro" :mensagem="erro" @tentar-novamente="carregar" />

    <ul v-else-if="carregando" class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
      <FilmeCardSkeleton v-for="n in 4" :key="n" />
    </ul>

    <EstadoVazio
      v-else-if="favoritados.length === 0"
      mensagem="Você ainda não tem favoritos"
      dica="Abra um filme e clique em Favoritar."
    />

    <ul v-else class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
      <FilmeCard
        v-for="(f, i) in favoritados"
        :key="f.id"
        :filme="f"
        :indice="i"
        removivel
        @remover="remover"
      />
    </ul>
  </div>
</template>
