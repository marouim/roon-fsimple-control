<template>
  <v-app>
    <v-navigation-drawer
        permanent
        expand-on-hover
        app
      >

        <v-list
          nav
          dense
        >
          <v-list-item link to="/nowplaying">
            <v-list-item-icon>
              <v-icon>mdi-play</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Now Playing</v-list-item-title>
            
          </v-list-item>

          <v-list-item link to="/selectzone">
            <v-list-item-icon>
              <v-icon>mdi-speaker-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Zone</v-list-item-title>
            
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import Controls from './components/Controls';
import NowPlaying from './components/NowPlaying';
import { mapGetters, mapActions } from "vuex";

export default {
  
  name: 'App',

  components: {
    Controls,
    NowPlaying
  },

  mounted () {
    this.core_pair();
    // this.connect();

  },

  methods: {
    ...mapActions(["connect", "pause", "update_current_zone", "core_pair"]),

  },

  computed: {
    ...mapGetters(["status", "current_zone_id", "zones", "current_zone", "roon"])
  },

  data: () => ({
    tab: 0
  }),
};
</script>
