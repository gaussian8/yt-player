<template>
  <v-card width="100%" height="100%" class="mx-auto">
    <v-toolbar color="blue-grey darken-2" dark extended extension-height="50" dense>
      <v-select
        v-model="entityValue"
        :items="entities"
        menu-props="auto"
        label="재생기기 선택"
        hide-details
        prepend-icon="mdi-disc-player"
        single-line
      ></v-select>
      <v-btn text @click="shuffle"> <v-icon left color="white">mdi-shuffle</v-icon>Shuffle </v-btn>
      <v-btn text @click="play(items.map((item) => item.snippet.resourceId.videoId))">
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

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import { Entity } from "./Entities.vue";

export interface PlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      (key: string): {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
    startAt: string;
    endAt: string;
    note: string;
  };
  status: {
    privacyStatus: string;
  };
}

class playingStatus {
  queued: number = 0;
  completed: number = 0;

  public set(playingStatus: playingStatus) {
    this.queued = playingStatus.queued;
    this.completed = playingStatus.completed;
  }
}

@Component
export default class Playlist extends Vue {
  items = [] as PlaylistItem[];
  entities = [] as Entity[];
  entityValue = "";
  playingStatus = new playingStatus();
  loading = {
    prev: false,
    next: false,
  };

  created() {
    this.initialize();
  }

  initialize(): void {
    axios.get("/api/entities").then((res: AxiosResponse<Entity[]>) => {
      this.entities = res.data;
      this.entityValue = res.data[0].value;
      axios.get("/api/entities/" + this.entityValue).then((res: AxiosResponse<playingStatus>) => {
        this.playingStatus.set(res.data);
      });
    });
    axios.get("/api/playlists/" + this.$route.params.id).then((res) => {
      this.items = res.data;
    });
  }
  play(videoId: string): void {
    axios.post("/api/entities/" + this.entityValue + "/play", videoId).then((res: AxiosResponse<playingStatus>) => {
      this.playingStatus.set(res.data);
    });
  }
  play_pause(): void {
    axios.post("/api/entities/" + this.entityValue + "/play_pause");
  }
  prev(): void {
    this.loading.prev = true;
    axios.post("/api/entities/" + this.entityValue + "/prev").then((res: AxiosResponse<playingStatus>) => {
      this.playingStatus.set(res.data);
      this.loading.prev = false;
    });
  }
  next(): void {
    this.loading.next = true;
    axios.post("/api/entities/" + this.entityValue + "/next").then((res: AxiosResponse<playingStatus>) => {
      this.playingStatus.set(res.data);
      this.loading.next = false;
    });
  }
  shuffle(): void {
    this.items.sort(() => 0.5 - Math.random());
  }
}
</script>
