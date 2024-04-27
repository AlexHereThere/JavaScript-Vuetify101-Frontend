<template>
    <div>
     <v-data-table fixed-footer=true :items="items"></v-data-table>
    </div>
</template>

<script setup>
import {ref} from "vue";
let items=ref([])
async function llenarLista()
{
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos");
  const datos = await respuesta.json();
  items.value=datos;
}
llenarLista();
</script>