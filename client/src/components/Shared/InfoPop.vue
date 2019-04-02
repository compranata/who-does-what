<template>
  <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
    <span>{{ text }}</span>
    <v-btn ccolor="white" flat @click="onClose">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: ['text'],
  computed: {
    snackbar: {
      get: function () {
        return (this.$store.getters.error) ? true : false;
      },
      set: function (newValue) {
        this.$emit('dismissed');
      },
    }
  },
  methods: {
    onClose() {
      this.$emit('dismissed');
    }
  }
}
</script>
