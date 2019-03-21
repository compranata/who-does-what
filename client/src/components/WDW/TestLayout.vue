<template>
  <v-container >
    <v-layout row class="justify-space-around">
      <v-flex xs3 class="ma-2">
        <v-layout row wrap>
          <div d-block class="primary">Primary</div>
          <div class="secondary">Secondary</div>
          <div class="warning">Warn</div>
          <div class="error">Error</div>
        </v-layout>
      </v-flex>
      <v-flex xs3 class="ma-2">
        <div class="primary text-xs-right">Primary</div>
        <div class="secondary">Secondary</div>
        <div class="warning">Warn</div>
        <div class="error">Error</div>
      </v-flex>
      <v-flex xs3 class="ma-2">
        <div d-inline class="primary">Primary</div>
        <div class="secondary">Secondary</div>
        <div class="warning">Warn</div>
        <div class="error">Error</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
