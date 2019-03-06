<template>
  <nav>

    <v-snackbar v-model="snackLogin" :timeout="4000" top color="success">
      <span>You are now logged in as {{ this.loginUser }}</span>
      <v-btn flat color="white" @click="snackLogin = false">Close</v-btn>
    </v-snackbar>

    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>Who</span>
        <span class="font-weight-light">Does</span>
        <span >What</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <Login v-if="loggedOff" @userLoggedIn="snackMessage" class="hidden-xs-only" />
      <Signup v-if="loggedOff" @userLoggedIn="snackMessage" class="hidden-xs-only" />
      <v-menu v-if="loggedOff" offset-y class="hidden-sm-and-up">
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <Login @userLoggedIn="snackMessage" />
            <Signup @userLoggedIn="snackMessage" />
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat color="grey" @click="logout">
        <span class="hidden-xs-only">Log Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-layout column align-center>
        <v-flex class="mt-4 mb-3">
          <Popup />
        </v-flex>
        <v-flex class="mt-1 mb-1">
          <div class="white--text">{{ loggedT }}</div>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
import fb from '@/store/firebase'
import Signup from './Signup'
import Login from './Login'
import Popup from './Popup'

export default {
  components: { Signup, Login, Popup },
  data() {
    return {
      drawer: false,
      snackLogin: false,
      loginUser: 'nobody',
      loggedIn: false,
      loggedOff: true,
      links: [
        { icon: 'dashboard', text: 'Dashborad', route: '/dashboard' },
        { icon: 'folder', text: 'Contacts', route: '/contacts' },
        { icon: 'person', text: 'Team', route: '/login' },
      ],
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('userLogoff');
      // fb.auth.signOut().then(() => {
      //   this.loggedIn = false;
      //   this.loggedOff = true;
      //   console.log(this);
      // })
    },
    snackMessage() {
      this.snackLogin = true;
        this.loggedIn = true;
        this.loggedOff = false;
    },
    // snackMessage() {
    //   this.loginUser = fb.auth.currentUser.email;
    //   this.snackLogin = true;
    //   this.loggedIn = true;
    //   this.loggedOff = false;
    // }
  },
  computed: {
    loggedT() {
      return this.$store.state.isAuthenticated;
    },
  },
}
</script>
