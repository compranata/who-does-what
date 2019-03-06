<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Homepage</h1>

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
          <span>Hey {{ getUser.isAuth }}</span>
        </div>
      </v-layout>

      <v-card flat v-for="card in cards" :key="card.id">
        <v-layout row wrap :class="`pa-3 card ${card.unit}`">
          <v-flex xs12 md4>
            <div class="caption grey--text">Team</div>
            <div>{{ card.name }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="caption grey--text">Lead</div>
            <div>{{ card.lead }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="caption grey--text">Phone</div>
            <div>{{ card.phone }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="caption grey--text">Mail</div>
            <div>{{ card.mail }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="right">
              <v-chip small :class="`${card.unit} white--text text-uppercase caption my-2`">{{ card.unit }}</v-chip>
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
    data() {
      return {
        person: {},
      }
    },
    methods: {
      // sortBy(prop) {
      //   this.cards.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
      // }
    },
    computed: {
      cards() {
        return this.$store.state.cards;
      },
      getUser() {
        return this.$store.getters.currentUser;
      }
    },
  }
</script>

<style scoped>

.card.brand {
  border-left: 4px solid #5f6a72;
}
.card.diamond {
  border-left: 4px solid #923148;
}
.card.premium {
  border-left: 4px solid #00b0e8;
}

.v-chip.brand {
  background: #5f6a72;
}
.v-chip.diamond {
  background: #923148;
}
.v-chip.premium {
  background: #00b0e8;
}
</style>
