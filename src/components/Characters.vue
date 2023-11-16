<template>
  <div class="main__page">
    <h1 class="title">Characters</h1>
    <div class="form">
      <input class="input" v-model="search" placeholder="Введите имя" />
      <select class="select" v-model="status">
        <option>All</option>
        <option>Alive</option>
        <option>Dead</option>
        <option>unknown</option>
      </select>
      <button class="btn" @click="loadCharacters">Поиск</button>
    </div>
    <div class="characters-container">
      <div class="character-card" v-for="character in characters" :key="character.id">
        <router-link :to="'/character/' + character.id">
          <img class="character-image" :src="character.image">
          <p>Name: {{ character.name }}</p>
          <p>{{ character.species }}</p>
        </router-link>
      </div>
    </div>
    <button class="btn btn_load" @click="loadMore">Загрузить ещё</button>
  </div>
</template>

<script>
import { getCharacters, loadMorePromise, status as statusRef, search as searchRef, characters as charactersRef } from '../main';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const status = ref('All');
    const search = ref('');
    const characters = ref([]);

    const loadCharacters = async () => {
      try {
        characters.value = await getCharacters(search.value, status.value);
      } catch (error) {
        console.error(error);
      }
    }

    const loadMore = async () => {
      try {
        const response = await loadMorePromise();
        if (response && response.data.results) {
          response.data.results.forEach(result => {
            if (!characters.value.find(char => char.id === result.id)) {
              characters.value.push(result);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => loadCharacters());

    return { characters, status, search, loadCharacters, loadMore };
  },
};
</script>

<style>


.title {
  text-align: center;
  margin-bottom: 20px;
  color: rgb(54, 50, 50);
}

a {
  text-decoration: none;
  color: rgb(54, 50, 50);
}

.form {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
}

.input  { 
  padding: 5px 7px;
  background-color: #f9f6f6;
}

.select { 
  padding: 5px 7px;
  background-color: #f9f6f6;
}

.characters-container { 
  display: flex;
  align-items: center;
  padding: 15px;
  flex-wrap: wrap;
}

.character-card {
  width: 200px;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  text-align: center;
}

.character-image {
  width: 100%;
  height: auto;
}

.btn  { 
  margin-right: 10px;
  padding: 5px 7px;
  background-color: #ececec;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #333;
}

.btn_load { 
  margin-bottom: 15px;
  text-align: center;
}
</style>