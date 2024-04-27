<template>
    <v-data-table
      :headers="headers"
      :items="posts"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Comentarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ props }">
              <v-btn class="mb-2" color="primary" dark v-bind="props">
                Nuevo Comentario
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        v-model="editedItem.autor"
                        label="Autor"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8" sm="6">
                      <v-text-field
                        v-model="editedItem.titulo"
                        label="Titulo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="6" >
                      <v-text-field 
                        v-model="editedItem.post"
                        label="Post"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card class="mx-auto">
              <v-card-title class="text-h5 py-2"
                >¿Estas seguro que quieres eliminar esta publicacion?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                  >Acepto</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.acciones="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </template>
  
  <script> 
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            title: 'Autor',
            align: 'start',
            sortable: false,
            key: 'autor',
          },
          { title: 'Titulo', key: 'titulo' },
          { title: 'Post', key: 'post' },
          { title: 'Acciones', key: 'acciones', sortable: false },
        ],
        posts: [],
        editedIndex: -1,
        editedItem: {
          autor: "",
          titulo: "",
          post: "",
        },
        defaultItem: {
          autor: "",
          titulo: "",
          post: "",
        },
      }),
  
      computed: {
        formTitle() {
          return this.editedIndex === -1 ? 'Nuevo Comentario' : 'Editar Comentario'
        },
      },
  
      watch: {
        dialog(val) {
          val || this.close()
        },
        dialogDelete(val) {
          val || this.closeDelete()
        },
      },
  
      created() {
        this.initialize()
      },

      mounted(){
        this.loadFromLocal();
      },

      beforeUnmount(){
        this.saveToLocal();
      },

      methods: {
        saveToLocal(){
            localStorage.setItem('postsData',JSON.stringify(this.posts));
        },

        loadFromLocal(){
        const savedData = localStorage.getItem('postsData');
            if (savedData) this.posts = JSON.parse(savedData);
        },

        initialize() {
          llenarLista(this.posts)
        },
  
        editItem(item) {
          this.editedIndex = this.posts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem(item) {
          this.editedIndex = this.posts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm() {
          this.posts.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close() {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete() {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save() {
          if (this.editedIndex > -1) {
            Object.assign(this.posts[this.editedIndex], this.editedItem)
          } else {
            this.posts.push(this.editedItem)
          }
          this.close()
        },


      },
    }

    async function llenarLista(lista)
    {
        let post;
        const respuestaU = await fetch("https://jsonplaceholder.typicode.com/users");
        const datosU = await respuestaU.json();
        const respuestaP = await fetch("https://jsonplaceholder.typicode.com/posts");
        const datosP = await respuestaP.json();
        datosU.forEach(itemU => {
            datosP.forEach(itemP => {
                if(itemU.id==itemP.userId)
                {
                  post={autor:itemU.name,
                        titulo:itemP.title,
                        post:itemP.body};  
                  lista.push(post);      
                }
            });
        });
    }

  </script>