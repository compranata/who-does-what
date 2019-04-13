<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <v-card dark color="purple">
          <v-card-text>test</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
      <v-flex xs8 offset-xs4 class="ma-2">
        <div class="primary">Primary</div>
        <div class="secondary">Secondary</div>
        <div class="warning">Warn</div>
        <div class="error">Error</div>
      </v-flex>
      <v-flex xs3 class="ma-2">
        <div class="primary">Primary</div>
        <div class="secondary">Secondary</div>
        <div class="warning">Warn</div>
        <div class="error">Error</div>
      </v-flex>
      <v-flex xs12 class="ma-2">
        <div class="primary">Primary</div>
        <div class="secondary">Secondary</div>
        <div class="warning">Warn</div>
        <div class="error">Error</div>
      </v-flex>
  </v-container>
</template>

<script>
export default {
  computed: {
    icons () {
      return this.$store.getters.icons;
    }
  }
}
</script>
