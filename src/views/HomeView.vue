<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { listarFilmes } from '@/services/filmesService'
import type { Filme } from '@/types/filmes'
import FilmeCard from '@/components/filmes/FilmeCard.vue'
import FilmeCardSkeleton from '@/components/filmes/FilmeCardSkeleton.vue'
import EstadoErro from '@/components/ui/EstadoErro.vue'
import EstadoVazio from '@/components/ui/EstadoVazio.vue'

const route = useRoute()

const filmes = ref<Filme[]>([])
const carregando = ref(true)
const erro = ref('')

async function carregar() {
  erro.value = ''
  carregando.value = true
  try {
    filmes.value = await listarFilmes(route.query.busca as string)
  } catch {
    erro.value = 'Não foi possível carregar os filmes!'
  } finally {
    carregando.value = false
  }
}

onMounted(carregar)
watch(() => route.query.busca, carregar)
</script>

<template>
  <div class="mx-auto max-w-6xl p-6">
    <EstadoErro v-if="erro" :mensagem="erro" @tentar-novamente="carregar" />

    <EstadoVazio
      v-else-if="!carregando && filmes.length === 0"
      mensagem="Nenhum filme encontrado"
      dica="Tente buscar por outro título."
    />

    <ul v-else class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
      <template v-if="carregando">
        <FilmeCardSkeleton v-for="n in 8" :key="n" />
      </template>
      <template v-else>
        <FilmeCard v-for="(f, i) in filmes" :key="f.id" :filme="f" :indice="i" />
      </template>
    </ul>
  </div>
</template>
<style scoped>
.lista-enter-active,
.lista-leave-active,
.lista-move {
  transition: all 0.4s ease;
}
.lista-enter-from,
.lista-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
.lista-leave-active {
  position: absolute;
}
</style>
