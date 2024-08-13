<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import BusLineItem from '@/components/BusLineItem.vue';
  import BusStops from '@/components/BusStops.vue';

  const store = useStore();

  const busLines = computed(() => store.getters['timetable/busLines']);
  const selectedBusLine = computed(() => store.state.timetable.selectedBusLine);
  const selectBusLine = (busLine: string) => store.dispatch('timetable/selectBusLine', busLine);

  onMounted(() => {
    store.dispatch('timetable/fetchStops');
  });
</script>

<template>
  <div>
    <div class="bg-white p-3">
      <span class="block-title">Select Bus Line</span>
      <div class="bus-line-grid pt-3">
        <bus-line-item 
          v-for="busLine in busLines"
          :bus-line-number="busLine"
          :is-active="selectedBusLine === busLine"
          :key="busLine"
          @click="selectBusLine(busLine)" 
        />
      </div>
    </div>

    <div>
      <bus-stops />
    </div>
  </div>
</template>

<style scoped>
  .bus-line-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
  }
</style>