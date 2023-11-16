<template>
  <div class="main__episode">
    <h1 class="title">{{ episode.name }}</h1>
    <p class="descr">{{ episode.air_date }}</p>
    <div v-for="character in episode.characters" :key="character.split('/').pop()">
      <router-link :to="'/character/' + character.split('/').pop()">
        <img :src="characters[character].image" v-if="characters[character]">
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      episode: {},
      characters: {},
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const episodeResponse = await axios.get('https://rickandmortyapi.com/api/episode/' + id);
      this.episode = episodeResponse.data;
      for (let characterUrl of this.episode.characters) {
        const characterResponse = await axios.get(characterUrl);
        this.characters[characterUrl] = characterResponse.data;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
<style>
.main__episode { 
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>