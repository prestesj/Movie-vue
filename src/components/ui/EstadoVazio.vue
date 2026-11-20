<script setup lang="ts">
import { SearchX } from '@lucide/vue'

defineProps<{ mensagem: string; dica?: string }>()
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center">
    <div class="flex max-w-md flex-col items-center gap-4 rounded-2xl p-10 text-center">
      <div class="rounded-full p-4">
        <SearchX class="size-10 animate-pulse" />
      </div>

      <h2 class="text-xl font-bold">{{ mensagem }}</h2>
      <p v-if="dica" class="opacity-70">{{ dica }}</p>
    </div>
  </div>
</template>
