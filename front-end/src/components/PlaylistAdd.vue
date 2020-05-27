<template>
  <v-card width="100%" height="100%" class="mx-auto">
    <v-col cols="12" sm="12">
      <v-text-field v-model="playlist.text" counter="25" maxlength="25" label="Playlist Name" outlined clearable></v-text-field>
    </v-col>
    <v-col cols="12" sm="12">
      <v-text-field
        v-model="playlist.to"
        counter="200"
        maxlength="200"
        label="Youtube Playlist Link"
        outlined
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" align="right">
      <v-btn class="ma-2" depressed color="green" to="/">Cancel</v-btn>
      <v-btn class="ma-2" depressed color="primary" @click="save(text, to)">Save</v-btn>
    </v-col>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

export class Playlist {
  icon: string = "mdi-playlist-play";
  text: string = "";
  to: string = "";
}

@Component
export default class PlaylistAdd extends Vue {
  playlist = new Playlist();

  save(playlist: Playlist): void {
    let to_arr = playlist.to.split("list=");
    playlist.to = to_arr.length === 1 ? to_arr[0] : to_arr[1];

    axios.post("/api/playlists/", playlist).then((res) => {
      if (res.data === "success") {
        this.$router.go(0);
      } else {
        alert("Error occured.");
      }
    });
  }
}
</script>
