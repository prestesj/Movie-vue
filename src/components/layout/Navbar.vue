<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Sun, Moon, Heart } from '@lucide/vue'
import SearchBar from '../ui/SearchBar.vue'
import { useFavoritosStore } from '@/stores/favoritos'

const favoritos = useFavoritosStore()
const darkTheme = ref(true)

function aplicarTema() {
  document.documentElement.setAttribute('data-theme', darkTheme.value ? 'dark' : 'light')
}

function toggleTheme() {
  darkTheme.value = !darkTheme.value
  aplicarTema()
}

onMounted(() => {
  aplicarTema()
  favoritos.carregar()
})
</script>

<template>
  <header class="navbar bg-base-300/50 shadow-xl">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6">
      <RouterLink
        to="/"
        class="text-xl font-bold transition-all duration-500 ease-out hover:scale-110 active:scale-95"
      >
        VUE MOVIES
      </RouterLink>

      <SearchBar />

      <div class="flex items-center gap-2">
        <RouterLink
          to="/favoritos"
          class="btn btn-ghost btn-circle group indicator"
          aria-label="Favoritos"
        >
          <span v-if="favoritos.favoritos.length" class="indicator-item badge badge-error badge-xs">
            {{ favoritos.favoritos.length }}
          </span>
          <Heart
            class="size-5 transition-colors duration-1200 group-hover:fill-error group-hover:text-error group-hover:animate-[batida_1.2s_ease-in-out_infinite] motion-reduce:animate-none"
          />
        </RouterLink>

        <button
          class="btn btn-circle btn-ghost border-none transition-all duration-2000 hover:rotate-360 hover:bg-base-100"
          aria-label="Alternar tema"
          @click="toggleTheme"
        >
          <Sun v-if="darkTheme" />
          <Moon v-else />
        </button>
      </div>
    </div>
  </header>
</template>
