<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">

      <v-layout row class="nb-3">
        <v-spacer></v-spacer>
        <div class="right">
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
        </div>
      </v-layout>

      <v-card flat v-for="wdw in wdws" :key="wdw._id">
        <v-layout row wrap :class="`pa-3 wdw ${wdw.unit}`">
          <v-flex xs12 md4>
            <div class="caption grey--text">Team</div>
            <div>{{ wdw.name }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="caption grey--text">Lead</div>
            <div>{{ wdw.lead }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="caption grey--text">Phone</div>
            <div>{{ wdw.phone }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="caption grey--text">Mail</div>
            <div>{{ wdw.mail }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="right">
              <v-chip small :class="`${wdw.unit} white--text text-uppercase caption my-2`">{{ wdw.unit }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    wdws () {
      return this.$store.getters.filteredWdws;
    },
    user () {
      return this.$store.getters.user;
    },
    isAuth () {
      return this.$sotre.getters.isAuth;
    },
    loading () {
      return this.$store.getters.loading;
    },
    error () {
      return this.$store.getter.error;
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
</style>
