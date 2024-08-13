import { Module } from 'vuex';
import { watchEffect } from 'vue';
import { useFetchStops } from '@/composables/useFetchStops';

interface Stop {
  line: number;
  stop: string;
  order: number;
  time: string;
}

interface TimetableState {
  stops: Array<Stop>;
  selectedBusLine: number | null;
  selectedStop: string | null;
}

const timetable: Module<TimetableState, any> = {
  namespaced: true,
  state: {
    stops: [],
    selectedBusLine: null,
    selectedStop: null,
  },

  mutations: {
    SET_STOPS(state, stops: Array<Stop>) {
      state.stops = stops;
    },

    SET_SELECTED_BUS_LINE(state, busLine: number) {
      state.selectedBusLine = busLine;
      state.selectedStop = null;
    },

    SET_SELECTED_STOP(state, stop: string) {
      state.selectedStop = stop;
    },
  },

  actions: {
    fetchStops({ commit }) {
      const { data, error } = useFetchStops();
  
      watchEffect(() => {
        if (error.value) {
          commit('SET_ERROR', error.value);
        } else {
          commit('SET_STOPS', data.value);
        }
      });
    },

    selectBusLine({ commit }, busLine: number) {
      commit('SET_SELECTED_BUS_LINE', busLine);
    },

    selectStop({ commit }, stop: string) {
      commit('SET_SELECTED_STOP', stop);
    },
  },

  getters: {
    busLines: (state) => {
      return Array.from(new Set(state.stops.map(stop => stop.line)));
    },

    stopsByBusLine: (state) => (busLine: number) => {
      const uniqueStops = Array.from(
        new Set(
          state.stops
            .filter(({ line }) => line === busLine)
            .map(({ stop }) => stop)
        )
      );
    
      return uniqueStops.map(stop => ({
        stop,
        line: busLine
      }));
    },    

    selectedBusLineStops: (state) => {
      if (state.selectedBusLine === null) return [];

      return state.stops.filter(stop => stop.line === state.selectedBusLine);
    },

    timesForStopInBusLine: (state) => (busLine: number, stop: string) => {
      const uniqueTimes = Array.from(
        new Set(
          state.stops
            .filter(({ line, stop: s }) => line === busLine && s === stop)
            .map(({ time }) => time.toString())
        )
      );
    
      return uniqueTimes.sort((a, b) => {
        const [hoursA, minutesA] = a.split(':').map(Number);
        const [hoursB, minutesB] = b.split(':').map(Number);

        return (hoursA - hoursB) || (minutesA - minutesB);
      });
    }    
  },
};

export default timetable;
