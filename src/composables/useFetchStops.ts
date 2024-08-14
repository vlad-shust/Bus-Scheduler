import { ref, watchEffect } from 'vue';
import axios from 'axios';
import { Stop } from '@/types/stop';

export function useFetchStops() {
  const data = ref<Stop[]>([]);
  const error = ref<string | null>(null);
  const loading = ref(true);

  const fetchData = async () => {
    data.value = [];
    error.value = null;
    loading.value = true;

    try {
      const response = await axios.get<Stop[]>('http://localhost:3000/stops');
      data.value = response.data;
    } catch (err: any) {
      if (err.response) {
        error.value = `HTTP error! status: ${err.response.status} ${err.response.statusText}`;
      } else if (err.request) {
        error.value = 'No response received. Possible network error.';
      } else {
        error.value = 'An unknown error occurred.';
      }
    } finally {
      loading.value = false;
    }
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error, loading };
}
