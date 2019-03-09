<template>
  <nav>

    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" :disabled="!isAuth" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>Who</span>
        <span class="font-weight-light">does</span>
        <span>what</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="grey--text" to="/search">
        <v-icon >search</v-icon>
      </v-btn>
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
    </v-toolbar>

    <v-navigation-drawer app light v-model="drawer" class="kolme">
      <v-img :aspect-ratio="16/9" src="https://images.unsplash.com/photo-1547892984-fb5ef9f020a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">{{ user.displayName }}</div>
            <div class="body-1">{{ user.email }}</div>
          </v-flex>
        </v-layout>
      </v-img>
      <v-layout column align-center>
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
          <v-divider></v-divider>
            <v-btn flat color="grey" class="my-3">
              <span>Tag Filter</span>
            </v-btn>
          <v-divider></v-divider>
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
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

  </nav>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      keywords: '',
      search: '',
      expand: false,
      links: [
        { icon: 'dashboard', text: 'Dashborad(home)', route: '/' },
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
    }
  },
  methods: {
  }
}
</script>

<style>
.v-input.cute-input .v-input__slot {
  border-radius: 100px!important;
  /* min-height: 18px; */
}

.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>
