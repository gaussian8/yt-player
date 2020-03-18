<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="'/playlist/' + item.to"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="red"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Youtube Player</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
       <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [],
    }),
    created () {
      this.$vuetify.theme.dark = true
      this.initialize()
    },
    methods: {
      initialize: function () {
        axios.get('/yt/api/playlists')
        .then(res => {
          this.items = res.data
        })
      }
    }
  }
</script>