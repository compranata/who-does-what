<template>
  <div>
    <v-btn-toggle v-model="filterQuery" multiple @change="pushKeywords">
      <v-layout row wrap justify-start>
        <span v-for="button in tagButtons" :key="button._id">
          <v-btn small flat round outline color="grey" class="ml-1 mb-1" :value="button._id">{{ button.name }}</v-btn>
        </span>
      </v-layout>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  props: ['group', 'label'],
  data () {
    return {
      filterQuery: [],
    }
  },
  computed: {
    tagButtons () {
      const buttons = new Set();
      const obj = this.$store.getters.tags;
      for (let key in obj) {
        if (obj[key].label === this.label && obj[key].group === this.group) {
          buttons.add({ name: obj[key].name, _id: obj[key]._id });
        }
      }
      return buttons;
    },
  },
  methods: {
    pushKeywords () {
      const obj = {
        label: this.label,
        group: this.group,
        keys: this.filterQuery,
      };
      this.$store.dispatch('pushFilterQuery', obj);
    },
  },
}
</script>

<style scoped>
.selected {
  background-color: #f00;
  border: 1px solid #ff0000;
}
.v-btn-toggle .v-btn:last-child {
  border-radius: 10px;
  height: 20px;
}
.v-btn-toggle--selected {
  box-shadow: none;
  -webkit-box-shadow: none;
}
</style>
