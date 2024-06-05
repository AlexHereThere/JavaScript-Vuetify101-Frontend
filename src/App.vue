<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-toolbar-title>MegaTarea</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-if="$route.path != '/BtnGoogleLogin'" expand-on-hover rail>
      <v-list>
        <v-list-item prepend-icon="mdi-account-cowboy-hat" title="Cosas que hacer" subtitle="y mas..."></v-list-item>
        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-home" title="Home" :to="{ path: '/index' }"></v-list-item>
        <v-list-item prepend-icon="mdi-mushroom" title="Diversion" :to="{ path: '/diversionP' }"></v-list-item>
        <v-list-item prepend-icon="mdi-list-box" title="To-Do" :to="{ path: '/listaP' }"></v-list-item>
        <v-list-item prepend-icon="mdi-comment-text-multiple-outline" title="Comentarios" :to="{ path: '/comP' }"></v-list-item>
        <v-list-item prepend-icon="mdi-fax" title="Activos" :to="{ path: '/activosP' }"></v-list-item>
        <v-list-item prepend-icon="mdi-tag-multiple-outline" title="Tags" :to="{ path: '/tagsP' }"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Responsables" :to="{ path: '/respP' }"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view/>
    </v-main>
  </v-layout>
</template>

<script setup>
import router from '@/router';
if(sessionStorage.getItem('backend_token')==null) router.push('/');//si no se ha auntenticado usuario, regresar a BtnGoogleLogin
</script>