<template>
  <nav>

    <v-navigation-drawer app light v-model="drawer">

      <v-img :aspect-ratio="16/9"
        src="https://images.unsplash.com/photo-1508238419796-1a1fc1f35dce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">{{ user.displayName }}</div>
            <div class="body-1">{{ user.email }}</div>
          </v-flex>
        </v-layout>
      </v-img>

      <!-- <v-layout column align-center>
        <v-flex xs12>
          <v-text-field
            v-model="keywords"
            prepend-icon="search"
            single-line
            full-width
            hide-details
            clearable
            label="Tags"
            type="text"
          >
          <v-icon slot:append-icon>search</v-icon>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-progress-circular
                  v-show="loading"
                  size="24"
                  color="info"
                  indeterminate
                ></v-progress-circular>
              </v-fade-transition>
            </template>
          </v-text-field>

          <v-divider></v-divider> -->
          <div>
            <v-container class="ma-0">
              <v-radio-group v-model="sorting" mandatory row hide-details class="ma-0">
                <!-- <v-icon small left>filter</v-icon> -->
                <span class="subheading grey--text mr-1">Sort:</span>
                <v-radio label="By team" value="name"></v-radio>
                <v-radio label="By lead" value="lead"></v-radio>
              </v-radio-group>
            </v-container>
          </div>
          <v-divider></v-divider>
          <div>
            <v-container class="ma-0">
              <v-radio-group v-model="filterStyle" mandatory row hide-details class="ma-0">
                <!-- <v-icon small left>filter</v-icon> -->
                <v-layout row wrap justify-center>
                <span class="subheading grey--text mr-1 mt-1">Filter:</span>
                <v-radio label="OR" value="OR"></v-radio>
                <v-radio label="AND" value="AND"></v-radio>
                <!-- <v-spacer></v-spacer>
                <v-btn v-show="isFiltered" icon small left class="grey--text mx-0" @click="removeFilter"><v-icon>clear</v-icon></v-btn> -->
                </v-layout>
              </v-radio-group>
            </v-container>
          </div>
          <v-divider></v-divider>
          <Labeling></Labeling>

          <v-list>
            <v-list-tile v-for="link in links" :key="link.text" :to="link.route">
              <v-list-tile-action>
                <v-icon class="grey--text">{{ link.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">{{ link.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

    </v-navigation-drawer>

    <v-toolbar flat app>
      <template>
        <v-toolbar-side-icon class="grey--text" :disabled="!isAuth" @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="text-uppercase grey--text">
          <span>Who</span>
          <span class="font-weight-light">does</span>
          <span>what</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <div class="text-xs-center">
          <v-layout justify-space-around row>
            <v-flex shrink>
              <v-expand-x-transition mode="out-in">
                  <v-text-field
                    v-model="keywords"
                    v-if="expand"
                    solo
                    flat
                    full-width
                    prepend-inner-icon="search"
                    append-icon="indeterminate_check_box"
                    label="Keywords"
                    :autofocus="true"
                    clearable
                    :height="24"
                    @click:append="clearKeywords"
                    key="search"
                    class="keywords-field"
                  ></v-text-field>
                  <v-btn v-else icon class="grey--text" @click="expand = !expand" key="icon">
                    <v-icon>search</v-icon>
                  </v-btn>
              </v-expand-x-transition>
            </v-flex>
          </v-layout>
        </div>
        <v-menu :nudge-width="100">
          <template v-slot:activator="{ on }">
            <v-btn icon class="grey--text" v-on="on">
              <v-icon >more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="link in links" :key="link.text" :to="link.route">
              <v-list-tile-title>
                <v-icon small left>{{ link.icon }}</v-icon>
                <span>{{ link.text }}</span>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>

      <!-- <template v-else>
        <v-text-field
          v-model="keywords"
          solo
          flat
          full-width
          append-icon="search"
          label="Search"
          v-if="isAuth"
          :autofocus="true"
          clearable
          :height="18"
        ></v-text-field>
        <v-btn icon class="grey--text" @click="expand = !expand">
          CLOSE
        </v-btn>
      </template> -->


    </v-toolbar>

        <!-- <v-layout row class="pt-2">
          <v-flex>
            <v-text-field
              v-model="search"
              solo
              append-icon="search"
              label="Search"
              class="cute-input stretch"
              v-if="isAuth"
              :autofocus="true"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-icon>more_vert</v-icon>
          </v-flex>
        </v-layout> -->
      <!-- </v-toolbar-items> -->
      <!-- <v-btn flat color="grey">Profile</v-btn> -->
      <!-- <v-btn flat color="grey" router to="signin">Sign In</v-btn> -->
      <!-- <v-btn flat v-if="isAuth" color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn> -->
    <!-- </v-toolbar> -->

  </nav>
</template>

<script>
import Labeling from './Filter/Labeling';

export default {
  components: { Labeling },
  data () {
    return {
      drawer: false,
      expand: false,
      links: [
        { icon: 'folder', text: 'WhoDoesWhat', route: '/wdw' },
        { icon: 'person', text: 'Login', route: '/signin' },
      ],
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    isAuth () {
      return this.$store.getters.isAuth;
    },
    loading () {
      return this.$store.getters.loading;
    },
    tags () {
      return this.$store.getters.tags;
    },
    entities () {
      return this.$store.getters.entities;
    },

    keywords: {
      get: function () {
        return this.$store.state.keywords;
      },
      set: function (newValue) {
        this.$store.dispatch('setKeywords', newValue);
      }
    },

    isFiltered () {
      return this.$store.getters.isFiltered;
    },
    filterStyle: {
      get: function () {
        return this.$store.getters.filterStyle;
      },
      set: function (newValue) {
        this.$store.dispatch('toggleFilterStyle', newValue);
      }
    },
    sorting: {
      get: function () {
        return this.$store.getters.sorting;
      },
      set: function (newValue) {
        this.$store.dispatch('toggleSorting', newValue);
      }
    },
  },
  methods: {
    clearKeywords () {
      this.keywords = null;
      this.expand = false;
    },
  },
}
</script>

<style>
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
.keyword-field {
  height: 24px;
}
</style>
