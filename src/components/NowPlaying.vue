<template>
  <v-container fluid>
    <v-card v-if="current_zone != undefined">

      <v-img
        max-height="160"
        :src="now_playing_image_url"
        position="top"
        
      >
        <v-card-title class="title white--black">
          <v-row
            class="fill-height flex-column"
            justify="space-between"
          >

            <p class="mt-4 subheading text-left">
              {{ current_zone.now_playing.three_line.line1  }}
            </p>

            <div>
              <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                {{ current_zone.now_playing.three_line.line2 }} 
              </p>
              <p class="caption font-weight-medium font-italic text-left">
                {{ current_zone.now_playing.three_line.line3 }}
              </p>
            </div>
          </v-row>
        </v-card-title>

      </v-img>

      
      

      <v-slider
        :max="current_zone.now_playing.length"
        min="1"
        :value="current_zone.now_playing.seek_position"
        @change="user_seek_changed"
      >
      
              <template v-slot:prepend>
                <v-text-field
                  :value="now_playing_seek_time"
                  flat
                  dense
                  solo
                  readonly
                  class="mt-0 pt-0"
                  style="width: 60px"
                ></v-text-field>
              </template>
      
              <template v-slot:append>
                <v-text-field
                  :value="now_playing_length_time"
                  flat
                  dense
                  solo
                  readonly
                  class="mt-0 pt-0"
                  style="width: 60px"
                ></v-text-field>
              </template>
      </v-slider>

       
        <v-btn @click="previous" :disabled="is_loading" >
          <v-icon>mdi-skip-previous</v-icon>
        </v-btn>

        <v-btn @click="playpause" :disabled="is_loading">
          <v-icon v-if="is_paused">mdi-play</v-icon>
          <v-icon v-if="is_playing">mdi-pause</v-icon>
          <v-progress-circular
          v-if="is_loading"
          color="primary"
          indeterminate
        ></v-progress-circular>
        </v-btn>

        <v-btn @click="next" :disabled="is_loading">
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>

      

    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import SelectZone from './SelectZone.vue';


  export default {
  components: { SelectZone },
    name: 'NowPlaying',

    data: () => ({
      seek_position: 0
    }),

    mounted: () => {
      console.log("Mounted")
      console.log(this.current_zone)
      if (this.current_zone == null) {
        console.log("Selectzone")
        $router.push('selectzone')
      }

    },

    methods: {

      ...mapActions(["pause", "update_current_zone", "update_seek", "playpause", "next", "previous"]),

      user_seek_changed(new_seek) {
        this.update_seek(new_seek)
      }
    },

    computed: {
      ...mapGetters([
        "current_zone", 
        "now_playing_seek_time", 
        "now_playing_length_time", 
        "now_playing_image_url", 
        "is_paused",
        "is_playing",
        "is_loading"])
    },
  }

</script>
