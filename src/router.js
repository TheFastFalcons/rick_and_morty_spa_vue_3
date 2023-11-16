import { createRouter, createWebHistory } from 'vue-router'
import Characters from './components/Characters.vue'
import Character from './components/Character.vue'
import Episode from './components/Episode.vue'

const routes = [
  { path: '/', component: Characters },
  { path: '/character/:id', component: Character },
  { path: '/episode/:id', component: Episode }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
