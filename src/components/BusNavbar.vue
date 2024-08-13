<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouteNames, routePaths } from '@/router/routes'
import { getActiveTabFromPath } from '@/utils/routeHelper'

const tabs = [
  { name: RouteNames.BusLines, label: 'Bus Lines' },
  { name: RouteNames.BusStops, label: 'Stops' }
]

const router = useRouter();
const route = useRoute();

const activeTab = ref(RouteNames.BusLines);

const switchTab = (tab: RouteNames) => {
  router.push(routePaths[tab]);
  activeTab.value = tab;
}

const isActive = (tab: RouteNames) => activeTab.value === tab;

watch(() => route.path, (newPath) => {
  const tab = getActiveTabFromPath(newPath);
  if (tab) {
    activeTab.value = tab;
  }
}, { immediate: true });
</script>

<template>
  <div class="d-flex bg-white p-4">
    <span
      v-for="tab in tabs"
      :key="tab.name"
      :class="[
        'tabs-title',
        'px-2',
        'pb-2',
        isActive(tab.name) ? 'active-tab' : 'inactive-tab'
      ]"
      @click="switchTab(tab.name)"
    >
      {{ tab.label }}
    </span>
  </div>
</template>

<style scoped>
  .active-tab {
    color: #33373c;
    border-bottom: 2px solid #1952e1;
  }

  .inactive-tab {
    opacity: 0.7;
    color: #9a9da4;
    border-bottom: none;
  }
</style>
