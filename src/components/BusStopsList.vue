<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
	import { Stop } from '@/types/stop';

  const store = useStore();
  const searchQuery = ref('');
  const isSortingAsc = ref(true);

  const stops = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();

    const uniqueStops = Array.from(
      new Set(
        store.state.timetable.stops
          .filter((stop: Stop) => stop.stop.toLowerCase().includes(query))
          .map((stop: Stop) => stop.stop.toLowerCase())
      )
    ).map((stopName) =>
      store.state.timetable.stops.find(
        (stop: Stop) => stop.stop.toLowerCase() === stopName
      )!
    );

    return uniqueStops.sort((a, b) =>
      isSortingAsc.value
        ? a.stop.localeCompare(b.stop)
        : b.stop.localeCompare(a.stop)
    );
  });

  const toggleSortStops = () => {
    isSortingAsc.value = !isSortingAsc.value;
  };

  onMounted(() => {
    store.dispatch('timetable/fetchStops');
  });
</script>

<template>
  <div class="bg-white d-flex flex-column">
    <input 
      class="my-2 mx-2 search-filter"
      v-model="searchQuery" 
      type="text"
      placeholder="Search..." 
      aria-label="Search stops"
    />
    <p class="block-subtitle px-3 pl-3 mt-4">
      Bus Stops
      <i 
        :class="[
          'bi',
          'cursor-pointer',
          isSortingAsc ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'
        ]" 
        @click="toggleSortStops"
      ></i>
    </p>
    <div class="list-group flex-grow-1 overflow-auto vh-100 mt-2">
      <p 
        v-for="(stop, index) in stops" 
        :key="index" 
        class="stop-item px-4 list-group-item"
      >
        {{ stop.stop }}
      </p>
    </div>
  </div>
</template>

<style>
  .search-filter {
    width: 280px;
    border: 1px solid #E2E4EA;
    height: 40px;
    outline: none;
  }
</style>
