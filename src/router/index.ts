import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Login from '../views/Login.vue';
import Accueil from "@/views/Accueil.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Login,
  },
  {
    path : '/accueil',
    name : 'Accueil' ,
    component: Accueil,
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
