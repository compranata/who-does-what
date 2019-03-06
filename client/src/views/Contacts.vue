<template>
  <div class="contacts">
    <h1 class="subheading grey--text">Contacts</h1>

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
        <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card._id">
          <v-card flat :class="`card ma-3 ${card.unit}`">
            <v-responsive class="pt-0">
              <div :class="`white--text px-1 titlebar ${card.unit}`">
                <v-icon small class="white--text">business</v-icon>
              </div>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ card.name }}</div>
              <v-divider></v-divider>
              <div class="grey--text"><v-icon small class="mr-1">phone</v-icon><a :href="`tel:${ card.phone}`">{{ card.phone }}</a></div>
              <div class="grey--text"><v-icon small class="mr-1">print</v-icon>{{ card.phone }}</div>
              <div class="grey--text"><v-icon small class="mr-1">alternate_email</v-icon><a :her="`mailto:${ card.mail }`">{{ card.mail }}</a></div>
              <div class="grey--text"><v-icon small class="mr-1">person</v-icon>{{ card.lead }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey" class="mx-0 mt-3">
                <v-icon small>person</v-icon>
              </v-btn>
              <v-btn flat color="grey" class="mx-0 mt-3">
                <v-icon small>contact_mail</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>

  export default {
    data() {
      return {
      }
    },
    // methods: {
    //   sortBy(prop) {
    //     this.cards.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    //   }
    // },
    computed: {
      cards() {
        return this.$store.state.cards;
      }
    },
  }
</script>

<style scoped>
.card.brand {
  border-bottom: 4px solid #5f6a72;
}
.card.diamond {
  border-bottom: 4px solid #923148;
}
.card.premium {
  border-bottom: 4px solid #00b0e8;
}
.titlebar.brand {
  background: #5f6a72;
}
.titlebar.diamond {
  background: #923148;
}
.titlebar.premium {
  background: #00b0e8;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
