import Vue from "vue";
import VueRouter from "vue-router";
import Playlist from "./components/Playlist.vue";
import PlaylistAdd from "./components/PlaylistAdd.vue";
import Entities from "./components/Entities.vue";
import EntityAdd from "./components/EntityAdd.vue";

const routes = [
  { path: "/playlist/:id", component: Playlist },
  { path: "/playlists/add", component: PlaylistAdd },
  { path: "/entities", component: Entities },
  { path: "/entities/add", component: EntityAdd },
];

Vue.use(VueRouter);

export default new VueRouter({
  routes,
});
