<template>
  <div class="contacts">
    <h1 class="subheading grey--text">Who Does What...?</h1>

    <v-container class="mb-3">
      <v-layout column v-if="wdws.length <= 0">
        <v-flex xs12 class="text-xs-center">
          <p class="grey--text">Ups,, unfortunately nothing to display.</p>
        </v-flex>
      </v-layout>

      <v-layout row class="mb-3" v-if="!wdws.length <= 0">
        <v-spacer></v-spacer>
        <div class="right">
          <v-btn-toggle mandatory v-model="viewStyle">
            <v-tooltip top>
              <v-btn flat slot="activator">
                <v-icon small>mdi-view-grid</v-icon>
              </v-btn>
              <span>display the contacts in card style.</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn flat slot="activator">
                <v-icon small>view_list</v-icon>
              </v-btn>
              <span>display the contacts in list style</span>
            </v-tooltip>
          </v-btn-toggle>
        </div>
      </v-layout>

      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"
            v-if="loading"
          ></v-progress-circular>
        </v-flex>
      </v-layout>

      <v-layout v-if="!viewStyle" row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="wdw in wdws" :key="wdw._id">
          <v-card flat :class="`wdw ma-3 ${wdw.unit.name}`" :style="`border-left: 4px solid ${wdw.unit.branding}`">

            <v-img class="white--text" height="80px" :src="(wdw.imageUrl) ? wdw.imageUrl : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'">
              <v-layout pa-2 column justify-space-between fill-height class="lightbox">
                <v-spacer></v-spacer>
                <v-flex shrink>
                  <span class="subheading font-weight-medium">{{ wdw.name }}</span>
                </v-flex>
              </v-layout>
            </v-img>
            <v-card-text class="pb-0">
              <template>
                <v-tooltip bottom v-if="(!!wdw.entity.name)">
                  <div class="grey--text" slot="activator"><v-icon small class="mr-1">business</v-icon>{{ wdw.entity.name }}</div>
                  <span>{{ wdw.entity.address }}, {{ wdw.entity.country }}</span>
                </v-tooltip>

                <div v-if="(!!wdw.phone)" class="grey--text"><v-icon small class="mr-1">phone</v-icon><a :href="`tel:${ wdw.phone}`">{{ wdw.phone }}</a></div>
                <div v-if="(!!wdw.fax)" class="grey--text"><v-icon small class="mr-1">print</v-icon>{{ wdw.fax }}</div>
                <div v-if="(!!wdw.email)" class="grey--text"><v-icon small class="mr-1 text-none">alternate_email</v-icon><a :href="`mailto:${ wdw.email }`">{{ wdw.email }}</a></div>
                <div v-if="(!!wdw.sip.account)" class="grey--text"><v-icon small class="mr-1">{{ wdw.sip.icon.mdi }}</v-icon>{{ wdw.sip.icon.provider }} / {{ wdw.sip.account }}</div>
                <div v-if="(!!wdw.lead.name)" class="grey--text"><v-icon small class="mr-1">person</v-icon>{{ wdw.lead.name }}</div>
              </template>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-tooltip top v-if="(!!wdw.lead.name)">
                <v-btn icon right class="grey--text" :href="`mailto:${ wdw.lead.email }`" slot="activator"><v-icon small>mdi-voice</v-icon></v-btn>
                <span>Send email to the team leader ({{ wdw.lead.email }})</span>
              </v-tooltip>
              <v-tooltip top v-if="(!!wdw.email)">
                <v-btn icon right class="grey--text" :href="`mailto:${ wdw.email }`" slot="activator"><v-icon small>email</v-icon></v-btn>
                <span>Send email to the team ({{ wdw.email }})</span>
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
          <v-layout row wrap :class="`pa-3 wdw ${wdw.unit.name}`" :style="`border-left: 4px solid ${wdw.unit.branding}`">

            <v-flex xs12 sm6>
              <div class="caption grey--text">Team</div>
              <div class="font-weight-medium">{{ wdw.name }}</div>
            </v-flex>
            <v-flex xs8 sm4>
              <div class="caption grey--text">Entity</div>
              <div>{{ wdw.entity.name }}</div>
            </v-flex>
            <v-flex xs4 sm2>
              <div class="right">
                <v-chip small :class="`${wdw.unit.name} white--text caption my-2`" :style="`background-color: ${ wdw.unit.branding }`">{{ wdw.unit.name }}</v-chip>
              </div>
            </v-flex>

            <v-flex xs12 sm6 md3>
              <div class="caption grey--text">Phone</div>
              <div><a :href="`tel:${ wdw.phone }`">{{ wdw.phone }}</a></div>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <div class="caption grey--text">Fax</div>
              <div>{{ (wdw.fax) ? wdw.fax : 'N/A' }}</div>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <div class="caption grey--text">Email</div>
              <div><a :href="`mailto:${ wdw.email }`">{{ wdw.email }}</a></div>
            </v-flex>

            <v-flex schrink xs12 sm6 offset-md6>
              <div class="caption grey--text">{{ wdw.sip.icon.provider }}</div>
              <div>{{ (wdw.sip.account) ? wdw.sip.account : 'N/A' }}</div>
            </v-flex>

            <v-flex xs12 sm6 class="caption grey--text font-italic mt-2">
              <span>Team Lead: </span>
              <span>{{ wdw.lead.name }}</span>
              <span> (Email: </span>
              <a :href="`mailto:${ wdw.lead.email }`">{{ wdw.lead.email }}</a>
              <span>)</span>
            </v-flex>
            <v-flex xs12 sm6 class="caption grey--text font-italic mt-2">
              <div>Remark:</div>
              <div style="white-space: pre-line">{{ (wdw.remark) ? wdw.remark : '' }}</div>
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
      return this.$store.getters.keywords;
    },
    loading () {
      return this.$store.getters.loading;
    },
    user () {
      return this.$store.getters.user;
    }
  },
  mounted () {
    this.$store.dispatch('setIsForm', false);
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
