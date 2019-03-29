<template>
  <v-layout row wrap justify-space-around>
    <v-flex xs12>
      <v-expansion-panel v-model="panel" expand>
        <v-expansion-panel-content v-for="label in tagLabels" class="mb-3" :key="label">
          <template v-slot:header>
            <div class="text-xs-left">
              <v-chip  outline small text-color="white" v-if="countTags(`${label}`) !== 0">
                <v-avatar class="grey">{{ countTags(`${label}`) }}</v-avatar>
              </v-chip>
              <span class="subheading font-weght-medium grey--text">{{ label }}</span>
            </div>
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
    // isSelectedTags () {
    //   return this.$store.getters.isSelectedTags(this.label);
    // },
    // getCountTags () {
    //   return this.$store.getters.countTags;
    // },
  },
  methods: {
    countTags (label) {
      let count = 0;
      const filterQuery = this.$store.getters.filterQuery;
      (filterQuery.filter((v) => v.label === label)).forEach((s) => {
        count += (s.keys.length) ? s.keys.length : 0;
      });
      return count;
    }
    // countTags (label) {
    //   const labelSet = this.$store.getters.countTags(label);
    //   const count = (count) ? labelSet.count : 0;
    //   return count;
    // },
  },
}
</script>
