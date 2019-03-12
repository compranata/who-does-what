<template>
  <div class="contacts">
    <h1 class="subheading grey--text">Who Does What...?</h1>

    <v-container class="my-3">

      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('name')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">by team</span>
          </v-btn>
          <span>Sort cards by team name</span>
        </v-tooltip>

        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('lead')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">by lead</span>
          </v-btn>
          <span>Sort cards by lead name</span>
        </v-tooltip>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="wdw in wdws" :key="wdw._id">
          <v-card flat :class="`wdw ma-3 ${wdw.unit}`">
            <!-- <v-responsive class="pt-0">
              <div :class="`white--text px-1 titlebar ${wdw.unit}`">
                <v-icon class="white--text">business</v-icon>
              </div>
            </v-responsive> -->

            <v-card-text>
              <div class="subheading">{{ wdw.name }}</div>
              <v-divider></v-divider>
              <template>
                <div class="grey--text"><v-icon small class="mr-1">phone</v-icon><a :href="`tel:${ wdw.phone}`">{{ wdw.phone }}</a></div>
                <div class="grey--text"><v-icon small class="mr-1">print</v-icon>{{ wdw.phone }}</div>
                <div class="grey--text"><v-icon small class="mr-1">alternate_email</v-icon><a :href="`mailto:${ wdw.mail }`">{{ wdw.mail }}</a></div>
                <div class="grey--text"><v-icon small class="mr-1">person</v-icon>{{ wdw.lead }}</div>
              </template>
            </v-card-text>

            <!-- <v-card-actions>
              <v-btn flat color="grey" class="mx-0 mt-3">
                <v-icon small>person</v-icon>
              </v-btn>
              <v-btn flat color="grey" class="mx-0 mt-3">
                <v-icon small>contact_mail</v-icon>
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    wdws () {
      return this.$store.state.wdws;
    },
    tags () {
      return this.$store.state.tags;
    },
  },
  methods: {
    sortBy (prop) {
      this.wdws.sort((a,b) => a[prop] < b[prop] ? -1 : 1);
    },
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
