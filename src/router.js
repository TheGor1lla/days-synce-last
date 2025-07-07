import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Board from '@/views/BoardView.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/board/:id', component: Board, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
