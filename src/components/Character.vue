<template>
  <div class="main__character" v-if="character.name">
    <h1 class="title">{{ character.name }}</h1>
    <img :src="character.image">
    <p class="descr">{{ character.species }}</p>
    <p class="descr">Location: {{ character.location.name }}</p>
    <ul class="list">
      <li class="list__item" v-for="episode in character.episode.slice(0,5)" :key="episode">
        <router-link :to="'/episode/' + episode.split('/').pop()">
          {{ episode.split('episode/').pop() }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      character: {},
    };
  },
  async created() {  
    const id = this.$route.params.id;
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character/' + id);
      this.character = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style> 

.main__character {  
  background-color: rgb(231, 231, 231);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.title  { 
  text-align: center;
  margin-bottom: 20px;
  color: rgb(54, 50, 50);
}

.descr  { 
  display: flex;
  font-size: 18px;
}

.list { 
  list-style: none;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.list__item { 
  display: flex;
  margin-right: 16px;
}

</style>