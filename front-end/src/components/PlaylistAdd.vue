<template>
  <v-card width="100%" height="100%" class="mx-auto">
    <v-col cols="12" sm="12">
      <v-text-field
        v-model="text"
        counter="25"
        maxlength="25"
        label="Playlist Name"
        outlined
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12">
      <v-text-field
        v-model="to"
        counter="200"
        maxlength="200"
        label="Youtube Playlist Link"
        outlined
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" align="right">
      <v-btn class="ma-2" depressed color="green" to="/" >Cancel</v-btn>
      <v-btn class="ma-2" depressed color="primary" @click="save(text, to)">Save</v-btn>
    </v-col>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      text: '',
      to: ''
    };
  },
  methods: {
    save: function (text, to) {
      let to_arr = to.split('list=');
      to = to_arr.length === 1 ? to_arr[0] : to_arr[1];

      axios.post('/youtube/api/playlists/', {
        icon: 'mdi-playlist-play',
        text: text,
        to: to
      })
      .then(res => {
        if (res.data === 'success') {
          this.$router.go();
        } else {
          alert('Error occured.');
        }
      })
    },
  }
}
</script>