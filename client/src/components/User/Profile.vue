<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="250"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn icon flat color="grey" v-on="on"><v-icon>more_vert</v-icon></v-btn>
      </template>

      <v-card v-if="isAuth">
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar color="primary" class="white--text font-weight-medium">{{ user.displayName.slice(0,1) }}</v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :class="fav ? 'red--text' : 'grey--text'"
                icon
                @click="fav = !fav"
              ><v-icon>favorite</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch v-model="viewStyle" class="pt-3"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title v-if="viewStyle" class="subheading grey--text">View Style "Card"</v-list-tile-title>
            <v-list-tile-title v-else class="subheading grey--text">View Style "List"</v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-card-actions>
          <v-layout row justify-space-around fill-height>
            <v-tooltip top>
              <v-btn flat icon to="/wdw" class="grey--text" slot="activator"><v-icon>home</v-icon></v-btn>
              <span>HOME</span>
            </v-tooltip>
            <v-tooltip top v-if="!isForm">
              <v-btn flat icon to="/wdw/new" class="grey--text" slot="activator"><v-icon>add_to_photos</v-icon></v-btn>
              <span>CREATE NEW TEAM</span>
            </v-tooltip>
            <v-tooltip top v-if="isAuth">
              <v-btn flat icon @click="signOut" class="grey--text" slot="activator"><v-icon>exit_to_app</v-icon></v-btn>
              <span>SIGN OUT</span>
            </v-tooltip>
          </v-layout>
        </v-card-actions>

      </v-card>

      <v-card v-else>
        <v-list>
          <v-list-tile to="/signin">
            <v-list-tile-title>
              <v-icon small left>person</v-icon>
              <span>SignIn / SignUp</span>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card>

    </v-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: false,
      fav: false,
      viewStyle: true,
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    isAuth () {
      return this.$store.getters.isAuth;
    },
    isForm () {
      return this.$store.getters.isForm;
    },
  },
  methods: {
    signOut () {
      this.$store.dispatch('signout', { router: this.$router });
    },
  }
}
</script>
