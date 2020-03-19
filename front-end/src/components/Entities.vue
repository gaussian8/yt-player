<template>
  <v-card width="100%" height="100%" class="mx-auto">
    <v-list>
      <v-list-item v-for="entity in entities" :key="entity.value">
        <v-list-item-content>
          <v-list-item-title v-text="entity.text"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="delete_entity(entity)">
            <v-icon color="red lighten-1">mdi-minus-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-col cols="12" sm="12" align="right">
      <v-btn class="ma-2" depressed color="primary" to="/entities/add">Add</v-btn>
    </v-col>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      entities: []
    };
  },
  created: function () {
    this.initialize()
  },
  methods: {
    initialize: function () {
      axios.get('/youtube/api/entities')
      .then(res => {
        this.entities = res.data
      })
    },
    delete_entity: function (entity) {
      if (!confirm('Are you sure to delete?')) {
        return;
      }
      let del_index = this.entities.findIndex(e => e === entity);

      axios.post('/youtube/api/entities/' + del_index + '/delete')
      .then(res => {
        if (res.data === 'success') {
          this.$router.go();
        } else {
          alert('Error occured.');
        }
      })
    }
  }
}
</script>