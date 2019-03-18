<template>
  <div class="contacts">
    <h1 class="subheading grey--text">Who Does What...?</h1>

    <v-container class="mb-3">

      <v-layout row class="mb-3">
        <v-spacer></v-spacer>
        <div class="right">
          <v-btn-toggle mandatory v-model="viewStyle">
            <v-tooltip top>
              <v-btn flat slot="activator">
                <v-icon small>view_list</v-icon>
              </v-btn>
              <span>display the contacts in list style.</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn flat slot="activator">
                <v-icon small>dashboard</v-icon>
              </v-btn>
              <span>display the contacts in card style</span>
            </v-tooltip>
          </v-btn-toggle>
        </div>
      </v-layout>

      <v-layout v-if="viewStyle" row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="wdw in wdws" :key="wdw._id">
          <v-card flat :class="`wdw ma-3 ${wdw.unit}`">
            <!-- <v-responsive class="pt-0">
              <div :class="`white--text px-1 titlebar ${wdw.unit}`">
                <v-icon class="white--text">business</v-icon>
              </div>
            </v-responsive> -->
            <v-card-text class="pb-0">
              <div class="subheading">
                <span>{{ wdw.name }}</span>
              </div>
              <v-divider></v-divider>
              <template>
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
              <DisplayWDW :id="wdw._id"></DisplayWDW>
            </v-card-actions>

          </v-card>
          {{ wdw.length }}
        </v-flex>
      </v-layout>

      <v-layout v-else column>
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
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import DisplayWDW from './DisplayWDW';

export default {
  components: { DisplayWDW },
  data () {
    return {
      viewStyle: 0,
    }
  },
  computed: {
    wdws () {
      return this.$store.getters.filteredWdws;
    },
    tags () {
      return this.$store.getters.tags;
    },
    keywords () {
      return this.$store.state.keywords;
    }
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
