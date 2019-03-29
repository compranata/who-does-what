<template>
  <div class="tagList">
    <template>
      <h4 class="caption">Tags:</h4>
      <span v-for="tag in tagList" :key="tag._id" class="text-xs-left">
        <v-chip outline :class="`${ tag.label }`">{{ tag.name }}</v-chip>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: [ 'tags' ],
  computed: {
    tagList () {
      const tagObject = this.$store.getters.tags;
      return tagObject.filter((tag) => {
        return JSON.stringify(this.tags).includes(tag._id);
      })
    }
  },

}
</script>

<style scoped>
.v-chip {
  height: 18px !important;
}
</style>
