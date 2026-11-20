<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { Clapperboard, Home, ArrowLeft } from '@lucide/vue'

const router = useRouter()
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center p-6">
    <div class="flex max-w-md flex-col items-center gap-4 text-center">
      <div class="rounded-full bg-base-200 p-5">
        <Clapperboard class="size-12 animate-pulse motion-reduce:animate-none" />
      </div>

      <p class="text-7xl font-black text-base-content">404</p>
      <h1 class="text-2xl font-bold">Cena cortada</h1>
      <p class="opacity-70">A página que você procura não existe ou foi movida.</p>

      <div class="mt-2 flex flex-wrap justify-center gap-3">
        <RouterLink
          to="/"
          class="btn btn-base-content group gap-2 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
        >
          <Home class="size-4 transition-transform duration-300 group-hover:scale-125" />
          Voltar ao início
        </RouterLink>

        <button
          type="button"
          class="btn btn-ghost group gap-2 rounded-xl transition-all duration-300 active:scale-95"
          @click="router.back()"
        >
          <ArrowLeft class="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Página anterior
        </button>
      </div>
    </div>
  </div>
</template>
