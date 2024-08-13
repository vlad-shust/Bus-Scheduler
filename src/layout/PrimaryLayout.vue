<script setup lang="ts">
	import BusNavbar from '@/components/BusNavbar.vue'
</script>

<template>
  <div class="bg-light vh-100 layout">
      <h3 class="mb-4">Timetable</h3>
      <bus-navbar class="mb-4"/>
      <slot />
  </div>
</template>

<style>
  .layout {
    padding: 40px 32px;
    overflow: hidden;;
  }
</style>