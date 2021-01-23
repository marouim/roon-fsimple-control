import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from "./store";
import NowPlaying from "./components/NowPlaying.vue"
import SelectZone from "./components/SelectZone.vue"

Vue.config.productionTip = false

const routes = [
  { path: '/nowplaying', component: NowPlaying },
  { path: '/selectzone', component: SelectZone }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
