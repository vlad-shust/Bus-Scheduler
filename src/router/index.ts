import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PrimaryLayout from '@/layout/PrimaryLayout.vue'
import BusLinesPage from '@/views/BusLinesPage.vue'
import BusStopsPage from '@/views/BusStopsPage.vue'
import { RouteNames } from './routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.BusLines,
    meta: { layout: PrimaryLayout },
    component: BusLinesPage,
  },
  {
    path: '/stops',
    name: RouteNames.BusStops,
    meta: { layout: PrimaryLayout },
    component: BusStopsPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
