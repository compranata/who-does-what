<template>
  <v-layout row wrap justify-space-around>
    <v-flex xs10>
      <div v-for="label in tagLabels" class="mb-3">
        <div class="title grey--text">{{ label }}</div>
        <Grouping :label="label"></Grouping>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Grouping from './Grouping';

export default {
  components: { Grouping },
  computed: {
    tagLabels () {
      const labels = new Set();
      const obj = this.$store.state.tags;
      for (let key in obj) {
        labels.add(obj[key].label);
      }
      return labels;
    },
  }
}
</script>
