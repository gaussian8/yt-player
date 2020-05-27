<template>
  <v-card width="100%" height="100%" class="mx-auto">
    <v-alert type="success" dismissible dense v-model="alert.success">
      Successfully completed
    </v-alert>
    <v-alert type="error" dismissible dense v-model="alert.error">
      Error occured while processing
    </v-alert>
    <v-list>
      <v-list-item v-for="entity in entities" :key="entity.value">
        <v-list-item-content>
          <v-list-item-title v-text="entity.text"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="delete_confirm(entity)">
            <v-icon color="red lighten-1">mdi-minus-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-col cols="12" sm="12" align="right">
      <v-btn class="ma-2" depressed color="primary" to="/entities/add">Add</v-btn>
    </v-col>

    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Are you sure to delete?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
          <v-btn color="green darken-1" text @click="delete_entity(entity)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      entities: [],
      entity: '',
      dialog: false,
      alert: {
        success: false,
        error: false
      }
    };
  },
  created: function () {
    this.initialize()
  },
  methods: {
    initialize: function () {
      axios.get('/api/entities')
      .then(res => {
        this.entities = res.data
      })
    },
    delete_confirm: function (entity) {
      this.entity = entity;
      this.dialog = true;
    },
    delete_entity: function (entity) {
      let del_index = this.entities.findIndex(e => e === entity);

      axios.post('/api/entities/' + del_index + '/delete')
      .then(res => {
        if (res.data === 'success') {
          this.entities.splice(del_index, 1);
          this.alert.success = true
        } else {
          this.alert.error = true
        }
      })
      .finally(() => {
        this.dialog = false;
      })
    }
  }
}
</script>