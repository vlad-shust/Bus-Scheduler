<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const selectedBusLine = computed(() => store.state.timetable.selectedBusLine);
  const selectedStop = computed(() => store.state.timetable.selectedStop);

  const isSortingStopsAsc = ref(true);
  const isSortingTimesAsc = ref(true);

  const toggleSortStops = () => isSortingStopsAsc.value = !isSortingStopsAsc.value;
  const toggleSortTimes = () => isSortingTimesAsc.value = !isSortingTimesAsc.value;

  const sortedStopsByBusLine = computed(() => {
    return [...stopsByBusLine.value].sort((a, b) => 
      isSortingStopsAsc.value
        ? a.stop.localeCompare(b.stop)
        : b.stop.localeCompare(a.stop)
    );
  });

  const sortedTimesForStopInBusLine = computed(() => {
    const timeToDate = (time: string): Date => {
      const [hours, minutes] = time.split(':').map(Number);
      return new Date(0, 0, 0, hours, minutes);
    };

    return [...timesForStopInBusLine.value].sort((a, b) => {
      const timeA = timeToDate(a);
      const timeB = timeToDate(b);

      return isSortingTimesAsc.value
        ? timeA.getTime() - timeB.getTime()
        : timeB.getTime() - timeA.getTime();
    });
  });

  const stopsByBusLine = computed(() => 
    store.getters['timetable/stopsByBusLine'](selectedBusLine.value)
  );

  const timesForStopInBusLine = computed(() => 
    selectedBusLine.value && selectedStop.value 
      ? store.getters['timetable/timesForStopInBusLine'](selectedBusLine.value, selectedStop.value)
      : []
  );

  const selectStop = (stop: string) => store.dispatch('timetable/selectStop', stop);
</script>

<template>
  <div class="bus-stops d-grid gap-3 bg-light py-3">
    <div :class="[
      'bg-white',
      'overflow-auto',
      'col',
      'scrollable-content',
      { 'inactive': !selectedBusLine }
    ]">
      <div v-if="selectedBusLine">
        <h5 class="block-title px-3 py-3">Bus Line: {{ selectedBusLine }}</h5>
        <p class="block-subtitle px-3 pl-3">
          Bus Stops
          <i :class="[
            'bi',
            'cursor-pointer',
            isSortingStopsAsc ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'
          ]" @click="toggleSortStops"></i>
        </p>
        <div class="list-group">
          <a
            v-for="stop in sortedStopsByBusLine"
            :key="stop.stop"
            @click="selectStop(stop.stop)"
            class="list-group-item stop-item list-group-item-action py-3"
            :class="{ 'selected': selectedStop === stop.stop }"
          >
            {{ stop.stop }}
          </a>
        </div>
      </div>
      <span v-else>Please select the bus line first</span>
    </div>
    <div :class="[
      'bg-white',
      'overflow-auto',
      'col',
      'scrollable-content',
      { 'inactive': !selectedStop }
    ]">
      <div v-if="selectedStop">
        <h5 class="block-title px-3 py-3">Bus Stop: {{ selectedStop }}</h5>
        <p class="block-subtitle px-3">
          Time
          <i :class="[
            'bi',
            'cursor-pointer',
            isSortingTimesAsc ? 'bi-sort-numeric-down' : 'bi-sort-numeric-up'
          ]" @click="toggleSortTimes"></i>
        </p>
        <div class="list-group">
          <a
            v-for="time in sortedTimesForStopInBusLine"
            :key="time"
            class="list-group-item stop-item py-3"
          >
            {{ time }}
          </a>
        </div>
      </div>
      <span v-else-if="selectedBusLine && !selectedStop">Please select the bus stop first</span>
      <span v-else>Please select the bus line first</span>
    </div>
  </div>
</template>

<style scoped>
.bus-stops {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.cursor-pointer {
  cursor: pointer;
}

.scrollable-content {
  max-height: 440px;
  overflow-y: auto;
}

.scrollable-content.inactive {
  border: 2px dashed #9A9DA4;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
