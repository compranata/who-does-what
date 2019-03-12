<template>
  <div>
    <v-btn-toggle v-model="filterKeys" multiple @change="pushValues">
      <v-layout row wrap justify-start>
        <span v-for="button in tagButtons">
          <v-btn small flat round outline color="grey" :value="button">{{ button }}</v-btn>
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
      filterKeys: [],
    }
  },
  computed: {
    tagButtons () {
      const buttons = new Set();
      const obj = this.$store.state.tags;
      for (let key in obj) {
        if (obj[key].label === this.label && obj[key].group === this.group) {
          buttons.add(obj[key].name);
        }
      }
      return buttons;
    },
  },
  methods: {
    pushValues (e) {
      this.$store.dispatch('pushTagKeys', this.filterKeys);
    }
  },
}
</script>

<style scoped>
.selected {
  background-color: #f00;
  border: 1px solid #ff0000;
}
.v-btn-toggle .v-btn:last-child {
  border-radius: 30px;
  height: 18px;
}
.v-btn-toggle--selected {
  box-shadow: none;
  -webkit-box-shadow: none;
}
</style>
