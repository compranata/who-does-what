<template>

    <v-dialog v-model="dialog" max-width="400px">
      <v-btn icon right class="grey--text" slot="activator"><v-icon small>open_in_new</v-icon></v-btn>
      <v-card flat :class="`wdw ${selectedWdw.unit}`">
        <v-card-title primary-title>
          <h1 class="headline pb-0">{{ selectedWdw.name }}</h1>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form refs="newWdw">
            <v-textfield class="grey--text"><v-icon small class="mr-1">phone</v-icon><a :href="`tel:${ selectedWdw.phone}`">{{ selectedWdw.phone }}</a></v-textfield>
            <v-textfield class="grey--text"><v-icon small class="mr-1">print</v-icon>{{ selectedWdw.phone }}</v-textfield>
            <v-textfield class="grey--text"><v-icon small class="mr-1">alternate_email</v-icon><a :href="`mailto:${ selectedWdw.mail }`">{{ selectedWdw.mail }}</a></v-textfield>
            <v-textfield class="grey--text"><v-icon small class="mr-1">person</v-icon>{{ selectedWdw.lead }}</div>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="primary">text</v-btn>
          <v-btn flat color="primary">text</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
  props: [ 'id' ],
  data () {
    return {
      dialog: false,
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    loading () {
      return this.$store.getters.loading;
    },
    error () {
      return this.$store.getters.error;
    },
    selectedWdw () {
      return this.$store.getters.selectedWdw(this.id);
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.wdw.yksi {
  border-left: 16px solid #5f6a72;
}
.wdw.kaksi {
  border-left: 16px solid #d3222a;
}
.wdw.kolme {
  border-left: 16px solid #00b0e8;
}
.wdw.nelja {
  border-left: 16px solid #719500;
}
/* .titlebar.yksi {
  background: #5f6a72;
}
.titlebar.kaksi {
  background: #d3222a;
}
.titlebar.kolme {
  background: #00B0E8;
}
.titlebar.nelja {
  background: #719500;
} */
a {
  text-decoration: none;
  color: inherit;
}
</style>
