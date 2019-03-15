<template>
  <v-layout row wrap justify-space-around>
    <v-flex xs12>
      <v-expansion-panel v-model="panel" expand>
        <v-expansion-panel-content v-for="label in tagLabels" class="mb-3" :key="label">
          <template v-slot:header>
              <span class="subheading font-weight-medium grey--text">{{ label }} ({{ countTags(`${ label }`) }})</span>
          </template>
          <Grouping :label="label"></Grouping>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Grouping from './Grouping';

export default {
  components: { Grouping },
  data () {
    return {
      panel: [],
      show: true,
    }
  },
  computed: {
    tagLabels () {
      const labels = new Set();
      const obj = this.$store.state.tags;
      for (let key in obj) {
        labels.add(obj[key].label);
      }
      return labels;
    },
  },
  methods: {
    countTags (label) {
      const selectedTags = this.$store.getters.filterQuery.filter((value) => {
        return value.label === label;
      });
      let count = 0;
      selectedTags.forEach((tag) => {
        count += tag.keys.length;
      })
      // this.show = (count !== 0) ? true : false;
      return count;
    },
  },
}
</script>
