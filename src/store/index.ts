import { createStore } from 'vuex';
import timetable from '@/store/modules/timetable';

export default createStore({
  modules: {
    timetable,
  },
});
