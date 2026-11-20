<template>
  <div class="flex min-h-screen flex-col">
    <Navbar />
    <main class="flex-1 p-10">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footbar />
  </div>
</template>

<script setup lang="ts">
import Footbar from './components/layout/Footbar.vue'
import Navbar from './components/layout/Navbar.vue'
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
