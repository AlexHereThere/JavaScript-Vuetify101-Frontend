<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="MegaTarea"></v-app-bar>

  <v-navigation-drawer  expand-on-hover rail>
    <v-list-item prepend-icon="mdi-account-cowboy-hat" title="Cosas que hacer" subtitle="y mas..."></v-list-item>
    <v-divider></v-divider>
    <v-list-item prepend-icon="mdi-home" title="Home" link to="/"></v-list-item>
    <v-list-item prepend-icon="mdi-mushroom" title="Diversion" link to="/diversionP"></v-list-item>
    <v-list-item prepend-icon="mdi-list-box" title="To-Do" link to="/listaP"></v-list-item>
    <v-list-item prepend-icon="mdi-comment-text-multiple-outline" title="Comentarios" link to="/comP"></v-list-item>
    <v-list-item prepend-icon="mdi-fax" title="Activos" link to="/activosP"></v-list-item>
    <v-list-item prepend-icon="mdi-tag-multiple-outline" title="Tags" link to="/tagsP"></v-list-item>
    <v-list-item prepend-icon="mdi-account" title="Responsables" link to="/respP"></v-list-item>
  </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view/>
    </v-main>
  </v-layout>
</template>

<script setup>
//
</script>
