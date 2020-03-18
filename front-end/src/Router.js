import Vue from 'vue'
import VueRouter from 'vue-router'
import Playlist from './components/Playlist';

const routes = [
    { path: '/playlist/:id', component: Playlist}
]

Vue.use(VueRouter)

export default new VueRouter ({
    routes
})