<template>
  <v-container fluid>
    <v-col >
      <v-row>
        <v-select
          v-model="current_zone_id"
          :items="zones"
          item-text="display_name"
          item-value="zone_id"
        ></v-select>
      </v-row>
      <v-row>
        <v-btn
          style="height: 100px;"
          class="flex-grow-1 mx-1"
          color="primary"
        >
          <v-icon dark>
            mdi-play
          </v-icon>
        </v-btn>

        <v-btn
          class="flex-grow-1 mx-1"
          style="height: 100px;"
          color="primary"
          @click="pause"
        >
          <v-icon dark>
            mdi-pause
          </v-icon>
        </v-btn>

        <v-btn
          class="flex-grow-1 mx-1"
          style="height: 100px;"
          color="primary"
        >
          <v-icon dark>
            mdi-stop
          </v-icon>
        </v-btn>
      </v-row>
      <v-row class="mt-6">


        

        <v-btn
          class="flex-grow-1 mx-1 grey darken-3"
          style="height: 70px;"
          color="primary"
        >
          <v-icon dark>
            mdi-skip-previous
          </v-icon>
        </v-btn>
        <v-btn
          class="flex-grow-1 mx-1 grey darken-3"
          style="height: 70px;"
          color="primary"
        >
          <v-icon dark>
            mdi-skip-next
          </v-icon>
        </v-btn>
      </v-row>

      <v-row class="mt-10">
        <v-slider
          v-model="volume"
          track-color="grey"
          always-dirty
          min="0"
          max="100"
          :thumb-size="24"
          thumb-label="always"
        >
          <template v-slot:prepend>

            <v-btn
              class="flex-grow-1 mx-1 grey darken-3"

              color="primary"
              @click="volume_down"
            >
              <v-icon dark>
                mdi-minus
              </v-icon>
            </v-btn>


          </template>

          <template v-slot:append>

            <v-btn
              class="flex-grow-1 mx-1 grey darken-3"

              color="primary"
              @click="volume_up"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>

          </template>
        </v-slider>

      </v-row>
    </v-col>
    


  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: 'Controls',

    data: () => ({
      volume: 0,
      current_zone_id: null
    }),

    watch: {
      current_zone_id() {
        this.update_current_zone(this.current_zone_id);
      }
    },

    methods: {

      ...mapActions(["pause", "update_current_zone"]),

      volume_down() {
        this.volume -= 1;
      },

      volume_up() {
        this.volume += 1;
      }
    },

    computed: {
      ...mapGetters(["status", "current_zone_id", "zones"])
    },
  }
</script>

<style>

</style>