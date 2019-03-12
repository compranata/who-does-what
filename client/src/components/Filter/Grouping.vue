<template>
  <div>
    <span v-for="group in tagGroups" class="mb-1">
      <div class="subheading grey--text">{{ group }}</div>
      <FilterButtons :label="label" :group="group"></FilterButtons>
    </span>
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
