import { createApp, ref } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { createPinia } from 'pinia';
import piniaPersistedstate from 'pinia-plugin-persistedstate';
import { createRouter, createWebHistory } from 'vue-router';
import Characters from './components/Characters.vue';
import Character from './components/Character.vue';
import Episode from './components/Episode.vue';

const pinia = createPinia();
pinia.use(piniaPersistedstate);

let characters = ref([]);
let status = ref('All');
let search = ref('');
let next = ref('https://rickandmortyapi.com/api/character');

const getCharacters = async (searchValue = '', statusValue = 'All') => {
  const url = `https://rickandmortyapi.com/api/character/?name=${searchValue}&status=${statusValue !== 'All' ? statusValue : ''}`;
  try {
    const response = await axios.get(url);
    next.value = response.data.info.next;
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

const loadMorePromise = () => {
  if (next.value) {
    return axios.get(next.value);
  } else {
    console.log('No more characters to load');
  }
};

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Characters },
    { path: '/character/:id', component: Character },
    { path: '/episode/:id', component: Episode },
  ],
});

app.use(router);
app.config.globalProperties.$http = axios;
app.use(pinia);
app.mount('#app');

export { characters, getCharacters, loadMorePromise, status, search };
