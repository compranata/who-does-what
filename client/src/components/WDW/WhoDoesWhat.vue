<template>
  <div class="contacts">
    <h1 class="subheading grey--text">Who Does What...?</h1>

    <v-container class="mb-3">
      <p v-if="wdws.length <= 0" class="grey--text">Ups,, unfortunately nothing to display.</p>

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
                <v-icon small>mdi-view-grid</v-icon>
              </v-btn>
              <span>display the contacts in card style</span>
            </v-tooltip>
          </v-btn-toggle>
        </div>
      </v-layout>

      <v-layout v-if="viewStyle" row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="wdw in wdws" :key="wdw._id">
          <v-card flat :class="`wdw ma-3 ${wdw.unit.name}`">

            <v-img class="white--text" height="80px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
              <v-container fill-height fluid class="lightbox">
                <v-flex xs12 align-end justify-start flexbox>
                  <span class="subheading font-weight-medium">{{ wdw.name }}</span>
                </v-flex>
              </v-container>
            </v-img>
            <v-card-text class="pb-0">
              <template>
                <v-tooltip bottom v-if="(!!wdw.entity.name)">
                  <div class="grey--text" slot="activator"><v-icon small class="mr-1">business</v-icon>{{ wdw.entity.name }}</div>
                  <span>{{ wdw.entity.address }}, {{ wdw.entity.country }}</span>
                </v-tooltip>

                <div v-if="(!!wdw.phone)" class="grey--text"><v-icon small class="mr-1">phone</v-icon><a :href="`tel:${ wdw.phone}`">{{ wdw.phone }}</a></div>
                <div v-if="(!!wdw.fax)" class="grey--text"><v-icon small class="mr-1">print</v-icon>{{ wdw.fax }}</div>
                <div v-if="(!!wdw.mail)" class="grey--text"><v-icon small class="mr-1 text-none">alternate_email</v-icon><a :href="`mailto:${ wdw.mail }`">{{ wdw.mail }}</a></div>
                <div v-if="(!!wdw.sip.account)" class="grey--text"><v-icon small class="mr-1">{{ wdw.sip.mdi }}</v-icon>{{ wdw.sip.provider }} / {{ wdw.sip.account }}</div>
                <div v-if="(!!wdw.lead.name)" class="grey--text"><v-icon small class="mr-1">person</v-icon>{{ wdw.lead.name }}</div>
              </template>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-tooltip top v-if="(!!wdw.lead.name)">
                <v-btn icon right class="grey--text" :href="`mailto:${ wdw.lead.mail }`" slot="activator"><v-icon small>mdi-voice</v-icon></v-btn>
                <span>Send email to the team leader ({{ wdw.lead.mail }})</span>
              </v-tooltip>
              <v-tooltip top v-if="(!!wdw.mail)">
                <v-btn icon right class="grey--text" :href="`mailto:${ wdw.mail }`" slot="activator"><v-icon small>email</v-icon></v-btn>
                <span>Send email to the team ({{ wdw.mail }})</span>
              </v-tooltip>
              <v-tooltip top v-if="(!!wdw.phone)">
                <v-btn icon right class="grey--text" :href="`tel:${ wdw.phone}`" slot="activator"><v-icon small>call</v-icon></v-btn>
                <span>Call the team ({{ wdw.phone }})</span>
              </v-tooltip>
              <v-tooltip top>
                <DisplayWDW :id="wdw._id" slot="activator"></DisplayWDW>
                <span>Display the detailed window.</span>
              </v-tooltip>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>

      <v-layout v-else column>
        <v-card flat v-for="wdw in wdws" :key="wdw._id">
          <v-layout row wrap :class="`pa-3 wdw ${wdw.unit.name}`">
            <v-flex xs12 md4>
              <div class="caption grey--text">Team</div>
              <div>{{ wdw.name }}</div>
            </v-flex>
            <v-flex xs12 sm2 md2>
              <div class="caption grey--text">Lead</div>
              <div>{{ wdw.lead.name }}</div>
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
                <v-chip small :class="`${wdw.unit.name} white--text text-uppercase caption my-2`">{{ wdw.unit.name }}</v-chip>
              </div>
            </v-flex>
            <!-- <v-flex xs1>
              <v-img src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"></v-img>
            </v-flex> -->
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
.wdw.Air {
  border-left: 4px solid #5f6a72;
}
.wdw.Fire {
  border-left: 4px solid #d3222a;
}
.wdw.Water {
  border-left: 4px solid #00b0e8;
}
.wdw.Earth {
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
