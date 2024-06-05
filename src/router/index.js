/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// src/router/index.js or src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import BtnGoogleLogin from '@/pages/BtnGoogleLogin.vue';
import Diversion from '@/pages/diversionP.vue';
import Lista from '@/pages/listaP.vue';
import Comentarios from '@/pages/comP.vue';
import Activos from '@/pages/activosP.vue';
import Tags from '@/pages/tagsP.vue';
import Responsables from '@/pages/respP.vue';
import Home from '@/pages/index.vue';
const routes = [
  {
    path: '/',
    redirect: '/BtnGoogleLogin'
  },
  {
    path: '/BtnGoogleLogin',
    name: 'BtnGoogleLogin',
    component: BtnGoogleLogin
  },
  {
    path: '/diversionP',
    name: 'Diversion',
    component: Diversion
  },
  {
    path: '/listaP',
    name: 'Lista',
    component: Lista
  },
  {
    path: '/comP',
    name: 'Comentarios',
    component: Comentarios
  },
  {
    path: '/activosP',
    name: 'Activos',
    component: Activos
  },
  {
    path: '/tagsP',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/respP',
    name: 'Responsables',
    component: Responsables
  },
  {
    path: '/index',
    name: 'Home',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;