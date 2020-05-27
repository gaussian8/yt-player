<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="playlist in playlists" :key="playlist.text" :to="'/playlist/' + playlist.to" link>
          <v-list-item-action>
            <v-icon>{{ playlist.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ playlist.text }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="delete_confirm(playlist)">
              <v-icon color="red lighten-1">mdi-minus-circle-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="#03a9f4" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Playlists</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn color="white" tile icon to="/entities">
        <v-icon>mdi-disc-player</v-icon>
      </v-btn>
      <v-btn color="white" tile icon to="/playlists/add">
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-dialog v-model="dialog" max-width="300">
        <v-card>
          <v-card-title class="headline">Are you sure to delete?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
            <v-btn color="green darken-1" text @click="delete_playlist(item)">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-alert type="success" dismissible dense v-model="alert.success">
        Successfully completed
      </v-alert>
      <v-alert type="error" dismissible dense v-model="alert.error">
        Error occured while processing
      </v-alert>
      <v-container class="fill-height">
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import { Playlist } from "./components/PlaylistAdd.vue";

@Component
export default class App extends Vue {
  drawer = false;
  playlists = [] as Playlist[];
  targetPlaylist = new Playlist();
  dialog = false;
  alert = {
    success: false,
    error: false,
  };

  created() {
    this.$vuetify.theme.dark = true;
    this.initialize();
  }
  initialize(): void {
    axios.get("/api/playlists").then((res: AxiosResponse<Playlist[]>) => {
      this.playlists = res.data;
    });
  }
  delete_confirm(targetPlaylist: Playlist): void {
    this.targetPlaylist = targetPlaylist;
    this.dialog = true;
  }
  delete_playlist(targetPlaylist: Playlist): void {
    let del_index = this.playlists.findIndex((e) => e === targetPlaylist);

    axios
      .post("/api/playlists/" + del_index + "/delete")
      .then((res) => {
        if (res.data === "success") {
          this.playlists.splice(del_index, 1);
          this.alert.success = true;
        } else {
          this.alert.error = true;
        }
      })
      .finally(() => {
        this.dialog = false;
      });
  }
}
</script>
