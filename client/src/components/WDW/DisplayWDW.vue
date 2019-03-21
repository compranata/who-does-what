<template>

    <v-dialog v-model="dialog" max-width="400px">
      <v-btn icon right class="grey--text" slot="activator"><v-icon small>open_in_new</v-icon></v-btn>
      <v-card flat :class="`wdw ${wdw.unit}`">

        <v-img class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-container fill-height fluid class="lightbox">
            <v-flex xs12 align-end justify-start flexbox>
              <span class="headline font-weight-medium">{{ wdw.name }}</span>
              <p>{{ wdw.description }}</p>
            </v-flex>
          </v-container>
        </v-img>
        <v-card-text class="pb-0" overflow>
          <template>
            <v-tooltip bottom>
              <div class="grey--text" slot="activator"><v-icon small class="mr-1">business</v-icon>{{ wdw.entities.name }}</div>
              <span>{{ wdw.entities.address }}, {{ wdw.entities.country }}</span>
            </v-tooltip>

            <div class="grey--text"><v-icon small class="mr-1">phone</v-icon><a :href="`tel:${ wdw.phone}`">{{ wdw.phone }}</a></div>
            <div class="grey--text"><v-icon small class="mr-1">print</v-icon>{{ wdw.phone }}</div>
            <div class="grey--text"><v-icon small class="mr-1">alternate_email</v-icon><a :href="`mailto:${ wdw.mail }`">{{ wdw.mail }}</a></div>
            <div class="grey--text"><v-icon small class="mr-1">person</v-icon>{{ wdw.lead }}</div>
          </template>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn icon right class="grey--text" :href="`mailto:${ wdw.mail }`"><v-icon small>email</v-icon></v-btn>
          <v-btn icon right class="grey--text" :href="`tel:${ wdw.phone}`"><v-icon small>call</v-icon></v-btn>
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
    wdw () {
      return this.$store.getters.selectedWdw(this.id);
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.wdw.yksi {
  border-left: 4px solid #5f6a72;
}
.wdw.kaksi {
  border-left: 4px solid #d3222a;
}
.wdw.kolme {
  border-left: 4px solid #00b0e8;
}
.wdw.nelja {
  border-left: 4px solid #719500;
}
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 72px);
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
