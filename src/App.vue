<template>
  <v-app>
    <Controls></Controls>
  </v-app>
</template>

<script>
import Controls from './components/Controls';

export default {
  name: 'App',

  components: {
    Controls,
  },

  data: () => ({
    //
  }),
};
</script>
