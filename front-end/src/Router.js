import Vue from 'vue'
import VueRouter from 'vue-router'
import Playlist from './components/Playlist';
import PlaylistAdd from './components/PlaylistAdd';
import Entities from './components/Entities';
import EntityAdd from './components/EntityAdd';

const routes = [
    { path: '/playlist/:id', component: Playlist},
    { path: '/playlists/add', component: PlaylistAdd},
    { path: '/entities', component: Entities},
    { path: '/entities/add', component: EntityAdd}
]

Vue.use(VueRouter)

export default new VueRouter ({
    routes
})