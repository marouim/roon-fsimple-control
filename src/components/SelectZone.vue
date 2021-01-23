<template>
    <v-card fluid>
      <v-card-title>Select zone</v-card-title>

      <v-list-item-group
        v-model="selectedZone"
        color="primary"
        mandatory
        
      >
        <v-list-item
          v-for="zone in zones"
          :key="zone.zone_id"
          link
          
        >
          <v-list-item-icon>
            <v-icon>
              mdi-speaker
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ zone.display_name }}</v-list-item-title>
        </v-list-item>

      </v-list-item-group>

    </v-card>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: 'SelectZone',

    data: () => ({
      selectedZone: undefined
    }),

    watch: {
      selectedZone: function (newValue) {
        this.update_current_zone(this.zones[newValue].zone_id)
      }
    },

    mounted: function () {
      console.log("MOUNTED: CURRENT ZONE ID is " + this.current_zone_id)
      if (this.current_zone_id != "") {
        this.selectedZone = this.zones.findIndex(z => z.zone_id == this.current_zone_id)
      }
    },

    methods: {

      ...mapActions(["pause", "update_current_zone"]),


    },

    computed: {
      ...mapGetters(["zones", "current_zone_id"])
    },
  }

</script>
