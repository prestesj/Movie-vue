<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Heart } from '@lucide/vue'
import { buscarFilme } from '@/services/filmesService'
import { useFavoritosStore } from '@/stores/favoritos'
import type { Filme } from '@/types/filmes'
import NotasEstrelas from '@/components/filmes/NotasEstrelas.vue'
import DescCardSkeleton from '@/components/filmes/DescCardSkeleton.vue'

const route = useRoute()
const favoritos = useFavoritosStore()
const filme = ref<Filme | null>(null)
const salvando = ref(false)

const favorito = computed(() => (filme.value ? favoritos.ehFavorito(filme.value.id) : false))

async function alternarFavorito() {
  if (!filme.value || salvando.value) return
  salvando.value = true
  try {
    await favoritos.alternar(filme.value.id)
  } finally {
    salvando.value = false
  }
}

onMounted(async () => {
  filme.value = await buscarFilme(route.params.id as string)
  await favoritos.carregar()
})
</script>

<template>
  <div v-if="filme" class="mx-auto flex max-w-6xl flex-col gap-8 p-6 md:flex-row">
    <div class="md:w-2/5">
      <img
        :src="filme.poster"
        :alt="filme.titulo"
        class="w-full rounded-lg bg-base-200 shadow-lg transition duration-500 hover:scale-102"
      />
    </div>

    <section class="flex-1 space-y-4">
      <RouterLink to="/" class="btn btn-ghost btn-sm transition duration-500 hover:scale-105">
        ← Voltar
      </RouterLink>

      <h1 class="text-4xl font-bold">{{ filme.titulo }}</h1>

      <p class="opacity-70">Lançamento: {{ filme.ano }}</p>

      <div class="flex items-center gap-2">
        <span class="opacity-70">Nota:</span>
        <NotasEstrelas :nota="filme.nota" />
      </div>

      <div class="flex flex-wrap gap-2">
        <span v-for="g in filme.genero" :key="g" class="badge badge-primary capitalize">
          {{ g }}
        </span>
      </div>

      <p class="leading-relaxed">{{ filme.sinopse }}</p>

      <button
        class="btn group gap-2 rounded-xl transition-all duration-300 active:scale-95"
        :class="favorito ? 'btn-error shadow-lg' : 'btn-outline hover:btn-error'"
        :disabled="salvando"
        :aria-pressed="favorito"
        @click="alternarFavorito"
      >
        <span v-if="salvando" class="loading loading-spinner loading-sm"></span>
        <Heart
          v-else
          class="size-5 transition-transform duration-300 group-hover:scale-125"
          :class="{ 'fill-current': favorito }"
        />
        {{ favorito ? 'Remover dos favoritos' : 'Favoritar' }}
      </button>
    </section>
  </div>
  <DescCardSkeleton v-else />
</template>
