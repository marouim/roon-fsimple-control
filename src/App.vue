<template>
  <v-app>
    <Controls></Controls>
  </v-app>
</template>

<script>
import Controls from './components/Controls';
import { mapGetters, mapActions } from "vuex";

export default {
  
  name: 'App',

  components: {
    Controls,
  },

  mounted () {
    this.connect();
  },

  methods: {
    ...mapActions(["connect", "pause", "update_current_zone"]),

  },

  computed: {
    ...mapGetters(["status", "current_zone_id", "zones"])
  },

  data: () => ({
    //
  }),
};
</script>
