<script setup lang="ts">
</script>

<template>
  <div id="app">
    <main class="bg-light">
      <component :is="$route.meta.layout || 'div'">      
        <router-view></router-view>
      </component>
    </main>
  </div>
</template>
