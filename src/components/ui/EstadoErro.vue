<script setup lang="ts">
import { WifiOff, RotateCw } from '@lucide/vue'

defineProps<{ mensagem: string }>()
const emit = defineEmits<{ tentarNovamente: [] }>()
</script>

<template>
  <div class="flex min-h-[50vh] items-center justify-center">
    <div class="flex max-w-md flex-col items-center gap-4 shadow-xl rounded-3xl p-20 text-center">
      <div class="rounded-full bg-error/10 p-4 text-error">
        <WifiOff class="size-10 animate-pulse opacity-70" />
      </div>

      <h2 class="text-xl font-bold">Ops, algo deu errado</h2>
      <p class="opacity-70">{{ mensagem }}</p>

      <button
        class="btn p-5 rounded-xl shadow-sm group gap-2 hover:scale-105 transtion duration-700"
        @click="emit('tentarNovamente')"
      >
        <RotateCw class="size-4 transition-transform duration-1200 group-hover:rotate-360" />
        Tentar de novo
      </button>
    </div>
  </div>
</template>
