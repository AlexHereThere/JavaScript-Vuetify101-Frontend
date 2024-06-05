<template>
    <v-card
      class="mx-auto"
      max-width="300"
      position='relative'
    >
      <v-img
        class="align-end text-white"
        height="300"
        :src="urlImagen"
        cover
      >
        <v-card-title>Mi Imagen Aleatoria</v-card-title>
      </v-img>
  
      <v-card-subtitle class="pt-4">
        Mi Chiste Aleatorio
      </v-card-subtitle>
  
      <v-card-text>
        <div>{{chisteTexto}}</div>
      </v-card-text>
  
      <v-card-actions>
  
        <v-btn color="red" elevation="12" block @click=cambiarElementos>
          Cambiar
        </v-btn>
      </v-card-actions>
    </v-card>

</template>

    <script setup>
    import {ref} from "vue";
    let urlImagen = ref();
    let chisteTexto;

    cambiarElementos();
    async function cambiarElementos()
    {
      let respuesta = await fetch("https://picsum.photos/200/300");
      let broma = await fetch("https://api.chucknorris.io/jokes/random");
      let datos = await broma.json();
      chisteTexto = datos.value;
      urlImagen.value = respuesta.url;
    }
    </script>