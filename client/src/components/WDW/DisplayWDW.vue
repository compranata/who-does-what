<template>

    <v-dialog v-model="dialog" max-width="400px">
      <v-btn icon right class="grey--text" slot="activator"><v-icon small>open_in_new</v-icon></v-btn>
      <v-card flat :class="`wdw ${wdw.unit}`">

        <v-img class="white--text" height="200px" :src="(wdw.imageUrl) ? wdw.imageUrl : 'https://firebasestorage.googleapis.com/v0/b/web-auth-1c43f.appspot.com/o/wdws%2FdefaultWdw.jpg?alt=media&token=8012e3ea-8349-4168-a0c0-06e3db846221'">
          <v-container fill-height fluid class="lightbox">
            <v-layout column>
              <v-flex text-xs-right xs12>
                <v-btn color="white" flat icon small slot="activator" router :to="{ name: 'editWdW', params: { id: wdw._id }}">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 align-end justify-start flexbox>
                <span class="headline font-weight-medium">{{ wdw.name }}</span>
                <p>{{ wdw.description }}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text class="pb-0" overflow>
          <template>
            <div v-if="(!!wdw.entity.name)" class="grey--text mb-2">
              <h4 class="caption">Entity:</h4>
              <div><v-icon small class="mr-1">business</v-icon>{{ wdw.entity.name }}</div>
              <div><v-icon small class="mr-1 ml-2">map</v-icon>{{ wdw.entity.address }}, {{ wdw.entity.country }}</div>
              <div v-if="(!!wdw.entity.phone)"><v-icon small class="mr-1 ml-2">call</v-icon>{{ wdw.entity.phone }}</div>
            </div>
            <v-divider></v-divider>
            <div class="grey--text mb-2">
              <h4 class="caption">Contacts: </h4>
              <div v-if="(!!wdw.phone)"><v-icon small class="mr-1">phone</v-icon><a :href="`tel:${ wdw.phone}`">{{ wdw.phone }}</a></div>
              <div v-if="(!!wdw.fax)"><v-icon small class="mr-1">print</v-icon>{{ wdw.fax }}</div>
              <div v-if="(!!wdw.email)"><v-icon small class="mr-1">alternate_email</v-icon><a :href="`mailto:${ wdw.email }`">{{ wdw.email }}</a></div>
              <div v-if="(!!wdw.sip.account)"><v-icon small class="mr-1">{{ wdw.sip.mdi }}</v-icon>{{ wdw.sip.provider }} / {{ wdw.sip.account }}</div>
            </div>
            <v-divider></v-divider>
            <div v-if="(!!wdw.lead.name)" class="grey--text mb-2">
              <h4 class="caption">Team Leader:</h4>
              <div><v-icon small class="mr-1">person</v-icon>{{ wdw.lead.name }}</div>
              <div><v-icon small class="mr-1 ml-2">alternate_email</v-icon><a :href="`mailto:${ wdw.lead.email }`">{{ wdw.lead.email }}</a></div>
            </div>
            <v-divider></v-divider>
            <div v-if="(!!wdw.remark)" class="grey--text mb-2">
              <h3 class="caption">Remark:</h3>
              <p>{{ wdw.remark }}</p>
              <v-divider></v-divider>
            </div>
            <TagList :tags="wdw.tags"></TagList>
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
        </v-card-actions>

      </v-card>
    </v-dialog>

</template>

<script>
import TagList from './TagList';

export default {
  components: { TagList },
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
