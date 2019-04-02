<template>
  <nav>

    <v-navigation-drawer app light v-model="drawer">

      <v-img :aspect-ratio="16/9"
        src="https://images.unsplash.com/photo-1508238419796-1a1fc1f35dce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink v-if="user">
            <div class="subheading">{{ user.displayName }}</div>
            <div class="body-1">{{ user.email }}</div>
          </v-flex>
        </v-layout>
      </v-img>

          <div>
            <v-container class="ma-0 py-0 px-3">
              <v-select
                v-model="sorting"
                :items="items"
                prefix="SortedBy:"
                flat
                solo
                hide-details
                color="grey"
                class="grey--text"
              ></v-select>
            </v-container>
          </div>
          <v-divider></v-divider>
          <div>
            <v-container class="ma-0 pt-1 pb-3">
              <v-radio-group v-model="filterStyle" mandatory row hide-details class="ma-0">
                <v-layout row wrap justify-center>
                <span class="subheading grey--text mr-1 mt-1">Filter:</span>
                <v-radio label="OR" value="OR"></v-radio>
                <v-radio label="AND" value="AND"></v-radio>
                <!-- <v-spacer></v-spacer>
                <v-btn v-show="isFiltered" icon small left class="mx-0" @click="removeFilter"><v-icon>clear</v-icon></v-btn> -->
                </v-layout>
              </v-radio-group>
            </v-container>
          </div>

          <v-divider></v-divider>
          <Labeling></Labeling>

          <v-list>
            <v-list-tile v-for="item in menuItems" :key="item.text" :to="item.route">
              <v-list-tile-action>
                <v-icon class="grey--text">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
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
                    fill-width
                    prepend-inner-icon="search"
                    append-icon="indeterminate_check_box"
                    label="Keywords"
                    :autofocus="true"
                    clearable
                    @click:append="clearKeywords"
                    key="search"
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
            <v-list-tile v-for="item in menuItems" :key="item.text" :to="item.route">
              <v-list-tile-title>
                <v-icon small left>{{ item.icon }}</v-icon>
                <span>{{ item.text }}</span>
              </v-list-tile-title>
            </v-list-tile>
            <v-divider v-if="isAuth"></v-divider>
            <v-list-tile v-if="isAuth">
              <v-list-tile-title @click="signOut">
                <v-icon small left>exit_to_app</v-icon>
                <span>Log Out</span>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>

    </v-toolbar>

  </nav>
</template>

<script>
import Labeling from './Filter/Labeling';

export default {
  components: { Labeling },
  data () {
    return {
      today: new Date(),
      drawer: false,
      expand: false,
      items: ['Name', 'Lead', 'Entity', 'Unit'],
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
    error () {
      return this.$store.getters.error;
    },
    tags () {
      return this.$store.getters.tags;
    },

    menuItems () {
      let menuItems = [
        { icon: 'add_to_photos', text: 'Create New', route: '/wdw/new'},
        { icon: 'folder', text: 'WhoDoesWhat', route: '/wdw' },
        { icon: 'person', text: 'Login', route: '/signin' },
      ];
      if (this.isAuth) {
        menuItems = [
          { icon: 'add_to_photos', text: 'Create New', route: '/wdw/new'},
          { icon: 'folder', text: 'WhoDoesWhat', route: '/wdw' },
        ];
      }
      return menuItems;
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
    signOut () {
      this.$store.dispatch('logout');
    }
  },
}
</script>

<style>
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
