<script setup lang="ts">
  import { defineProps, computed, withDefaults } from 'vue';

  interface Props {
    busLineNumber: number;
    isActive: boolean;
  }

  const props = withDefaults(defineProps<Props>(),
    {
      isActive: false
    }
  );

  const backgroundColor = computed(() => {
    return props.isActive ? '#2E3E6E' : '#1952E1';
  });
</script>

<template>
  <div 
    :style="{ backgroundColor: backgroundColor }"
    class="py-2 text-white rounded cursor-pointer"
    :class="
      { 
        'badge': true,
        'badge-light': !props.isActive,
        'badge-dark': props.isActive
      }"
    >
    <h5 class="mb-0">{{ props.busLineNumber }}</h5>
  </div>
</template>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>