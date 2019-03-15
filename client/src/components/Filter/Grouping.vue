<template>
  <div>
    <div v-for="group in tagGroups" :key="group" class="mb-1 mx-3">
      <div class="body-2 grey--text">{{ group }}</div>
      <FilterButtons :label="label" :group="group"></FilterButtons>
    </div>
  </div>
</template>

<script>
import FilterButtons from './FilterButtons';

export default {
  components: { FilterButtons },
  props: [ 'label' ],
  computed: {
    tagGroups () {
      const tags = new Set();
      const obj = this.$store.state.tags;
      for (let key in obj) {
        if (obj[key].label === this.label) {
          tags.add(obj[key].group);
        }
      }
      return tags;
    },
  }
}
</script>
