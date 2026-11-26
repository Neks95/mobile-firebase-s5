import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';

import { authReady } from '@/composable/useAuth';
import { auth } from '@/firebase';

import Login from '../views/Login.vue';
import Accueil from "@/views/Accueil.vue";
import {onAuthStateChanged} from "firebase/auth";
import Fiche from '@/views/Fiche.vue';

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
  },
  {
    path: '/jeux/:id',
    name: 'Fiche',
    component: Fiche,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const authPrete = new Promise<void>((resolve) => {
  const desabonner = onAuthStateChanged(auth, () => {
    desabonner();
    resolve();
  });
});

router.beforeEach(async (to) => {
  await authPrete;
  const estConnecte = !!auth.currentUser;

  if (to.path !== '/home' && !estConnecte) {
    return '/home';
  }
})

export default router;
