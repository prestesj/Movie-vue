<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search, X } from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const texto = ref((route.query.busca as string) ?? '')

let timer: ReturnType<typeof setTimeout>

function buscar() {
  router.replace({
    name: 'home',
    query: { busca: texto.value.trim() || undefined },
  })
}

function aoDigitar() {
  clearTimeout(timer)
  timer = setTimeout(buscar, 400)
}

function limpar() {
  texto.value = ''
  clearTimeout(timer)
  buscar()
}
</script>

<template>
  <label
    class="input input-bordered flex w-40 items-center gap-2 rounded-full transition-all duration-300 focus-within:w-72 focus-within:border-content focus-within:outline-none sm:w-48 sm:focus-within:w-80"
  >
    <Search class="size-4 shrink-0 opacity-60" />

    <input
      v-model="texto"
      type="text"
      placeholder="Buscar filme..."
      class="grow outline-none"
      aria-label="Buscar filme"
      @input="aoDigitar"
      @keydown.enter="buscar"
    />

    <button
      v-if="texto"
      type="button"
      class="btn btn-ghost btn-circle btn-xs"
      aria-label="Limpar busca"
      @click="limpar"
    >
      <X class="size-3" />
    </button>
  </label>
</template>
