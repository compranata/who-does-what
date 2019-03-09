<template>
  <v-app class="grey lighten-4">

    <Navbar></Navbar>

    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>

    <v-footer flat app class="pa-3">
      <v-spacer></v-spacer>
      <div right class="grey--text">&copy; compranata</div>
    </v-footer>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: { Navbar },
};
</script>

<style lang="stylus">
@import './stylus/main'
</style>
