<template>
    <v-data-table
      :headers="headers"
      :items="activos"
      :sort-by="[{ key: 'id', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Tags</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                class="mb-2"
                color="primary"
                dark
                v-bind="props"
              >
                New Tag
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="550px">
            <v-card>
              <v-card-title class="text-h5">¿Estas seguro que quieres eliminar este Tag?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.acciones="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      itsEdit: false,
      headers: [
        {title: 'ID', key: 'id'},
        {title: 'Nombre', key: 'nombre'},
        { title: 'Creado En', key: 'createdAt'},
        { title: 'Actualizado En', key: 'updatedAt'},
        { title: 'Acciones', key: 'acciones', sortable: false },
      ],
      activos: [],
      editedIndex: -1,
      editedItem: {
        nombre:"",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      defaultItem: {
        nombre:"",
        createdAt:new Date(),
        updatedAt:new Date()
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Tag' : 'Edit Tag'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        const acts =  await fetch("https://localhost:4000/tag/all");
        this.activos = await acts.json();
      },

      async editItem (item) {
        this.itsEdit = 1 //1== its edit
        this.editedIndex = this.activos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.activos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
          this.res = await fetch("https://localhost:4000/tag/id/"+this.editedItem.id,
          {
            method:"DELETE",
            credentials: "include", //modificar base de datos con cambios
          });
        this.initialize()
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if(this.itsEdit) //si es edicion, se usa PATCH si no, se usa POST.
        {
          this.res = await fetch("https://localhost:4000/tag/id/"+this.editedItem.id,
          {
            method:"PATCH",
            credentials: "include", //modificar base de datos con cambios
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(this.editedItem)
          });
        }
        else
        {
          this.res = await fetch("https://localhost:4000/tag",
          {
            method:"POST",
            credentials: "include", //modificar base de datos con cambios
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(this.editedItem)
          });
        }
        this.itsEdit=false;
        this.initialize();
        this.close()
      },
    },
  }
</script>