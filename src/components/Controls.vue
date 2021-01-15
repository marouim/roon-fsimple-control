<template>
  <v-container>
    <v-flex>
      <v-card>
        <v-btn
          class="mx-1"
          dark
          small
          color="primary"
        >
          <v-icon dark>
            mdi-play
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-1"
          dark
          small
          color="primary"
        >
          <v-icon dark>
            mdi-pause
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-1"
          dark
          small
          color="primary"
        >
          <v-icon dark>
            mdi-stop
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-1"
          dark
          small
          color="primary"
        >
          <v-icon dark>
            mdi-skip-previous
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-1"
          dark
          small
          color="primary"
        >
          <v-icon dark>
            mdi-skip-next
          </v-icon>
        </v-btn>
      </v-card>
      <v-card>
        <v-slider
          v-model="bpm"
          :color="color"
          track-color="grey"
          always-dirty
          min="40"
          max="218"
        >
          <template v-slot:prepend>
            <v-icon
              :color="color"
              @click="volume_down"
            >
              mdi-minus
            </v-icon>
          </template>

          <template v-slot:append>
            <v-icon
              :color="color"
              @click="volume_up"
            >
              mdi-plus
            </v-icon>
          </template>
        </v-slider>
      </v-card>
    </v-flex>


  </v-container>
</template>

<script>
  export default {
    name: 'Controls',

    data: () => ({

    }),

    methods: {

      volume_down() {

      },

      volume_up() {

      }
    }
  }
</script>
