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
            <v-list-tile-avatar color="primary" class="white--text font-weight-medium">Y</v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Yoshi Kanai</v-list-tile-title>
              <v-list-tile-sub-title>yoshihiro.kanai@outlook.com</v-list-tile-sub-title>
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
          <v-spacer></v-spacer>

          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="menu = false">Save</v-btn>
        </v-card-actions>

      </v-card>

      <v-card v-else>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-btn flat class="grey--text" router to="/signin">
                <v-icon small left>person</v-icon>
                <span>SignIn / SignUp</span>
              </v-btn>
            </v-list-tile-content>
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
  },
}
</script>
