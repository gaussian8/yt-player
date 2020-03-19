<template>
  <v-card width="100%" height="100%" class="mx-auto">
    <v-toolbar color="blue-grey darken-2" dark extended extension-height="50" dense>
      <v-select
        v-model="entity"
        :items="entities"
        menu-props="auto"
        label="재생기기 선택"
        hide-details
        prepend-icon="mdi-disc-player"
        single-line
      ></v-select>
      <v-btn text @click="shuffle">
        <v-icon left color="white">mdi-shuffle</v-icon>Shuffle
      </v-btn>
      <v-btn text @click="play(items.map(item => item.snippet.resourceId.videoId))">
        <v-icon left color="white">mdi-playlist-play</v-icon>Play all
      </v-btn>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-col align="center">
        <v-btn icon :disabled="played_list_count < 2" @click="prev" :loading="loading.prev">
          <v-icon color="white">mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn fab small color="deep-orange" :disabled="played_list_count < 1" @click="play_pause">
          <v-icon color="white">mdi-pause</v-icon>
        </v-btn>
        <v-btn icon :disabled="play_list_count < 1" @click="next" :loading="loading.next">
          <v-icon color="white">mdi-skip-next</v-icon>
        </v-btn>
        </v-col>
      </template>
    </v-toolbar>
    <v-list>
      <v-list-item v-for="item in items" :key="item.snippet.title">
        <v-list-item-avatar>
          <v-img :src="item.snippet.thumbnails.default.url"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.snippet.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="play([item.snippet.resourceId.videoId])">
            <v-icon color="pink">mdi-play</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: [],
      entities: [],
      entity: '',
      play_list_count: 0,
      played_list_count: 0,
      loading: {
        prev: false,
        next: false,
      }
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
        this.entity = res.data[0].value
        axios.get('/youtube/api/entities/' + this.entity)
        .then(res => {
          this.play_list_count = res.data.play_list_count
          this.played_list_count = res.data.played_list_count
        })
      })
      axios.get('/youtube/api/playlists/' + this.$route.params.id)
      .then(res => {
        this.items = res.data
      })
    },
    play: function (play_list) {
      axios.post('/youtube/api/entities/' + this.entity + '/play', play_list)
      .then(res => {
        this.play_list_count = res.data.play_list_count
        this.played_list_count = res.data.played_list_count
      })
    },
    play_pause: function () {
      axios.post('/youtube/api/entities/' + this.entity + '/play_pause')
    },
    prev: function () {
      this.loading.prev = true
      axios.post('/youtube/api/entities/' + this.entity + '/prev')
      .then(res => {
        this.play_list_count = res.data.play_list_count
        this.played_list_count = res.data.played_list_count
        this.loading.prev = false
      })
    },
    next: function () {
      this.loading.next = true
      axios.post('/youtube/api/entities/' + this.entity + '/next')
      .then(res => {
        this.play_list_count = res.data.play_list_count
        this.played_list_count = res.data.played_list_count
        this.loading.next = false
      })
    },
    shuffle: function () {
      this.items.sort(() => 0.5-Math.random());
    }
  }
};
</script>