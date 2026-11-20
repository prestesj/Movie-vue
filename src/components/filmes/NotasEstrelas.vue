<script setup lang="ts">
import { computed } from 'vue'
import { Star, StarHalf } from '@lucide/vue'

const props = defineProps<{ nota: number }>()

const estrelas = computed(() => {
  return Math.floor(props.nota) / 2
})
</script>

<template>
  <div class="flex gap-0.5">
    <template v-for="i in 5" :key="i">
      <Star v-if="estrelas >= i" class="fill-current text-orange-400 size-5"></Star>
      <StarHalf
        v-else-if="estrelas >= i - 0.5"
        class="fill-current text-orange-400 size-5"
      ></StarHalf>
      <Star v-else class="size-5"></Star>
    </template>
  </div>
</template>
