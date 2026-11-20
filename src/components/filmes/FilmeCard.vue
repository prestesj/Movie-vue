<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { X } from '@lucide/vue'
import type { Filme } from '@/types/filmes'

defineProps<{ filme: Filme; indice?: number; removivel?: boolean }>()
const emit = defineEmits<{ remover: [filmeId: number] }>()

const el = ref<HTMLElement | null>(null)
const visivel = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entrada]) => {
      if (entrada?.isIntersecting) {
        visivel.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.15 },
  )

  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <li
    ref="el"
    class="transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
    :class="visivel ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    :style="{ transitionDelay: `${((indice ?? 0) % 4) * 100}ms` }"
  >
    <div
      class="group relative overflow-hidden rounded-lg bg-base-200 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <button
        v-if="removivel"
        type="button"
        class="btn btn-circle btn-error btn-xs absolute right-2 top-2 z-10 opacity-0 transition-opacity duration-300 focus:opacity-100 group-hover:opacity-100 max-md:opacity-100"
        aria-label="Remover dos favoritos"
        @click.stop.prevent="emit('remover', filme.id)"
      >
        <X class="size-3" />
      </button>

      <RouterLink :to="{ name: 'descricao', params: { id: filme.id } }">
        <div class="overflow-hidden">
          <img
            :src="filme.poster"
            :alt="filme.titulo"
            class="w-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <p class="p-4 text-base font-bold">{{ filme.titulo }}</p>
      </RouterLink>
    </div>
  </li>
</template>
