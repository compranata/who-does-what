<template>
  <v-layout row>
    <v-card height="100%" fill-height>
      <v-navigation-drawer
        v-model="menus"
        :mini-variant.sync="mini"
        hide-overlay
        stateless
        fixed
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar color="primary">
                <span class="white--text">{{ (user) ? user.displayName.slice(0, 1) : '' }}</span>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ (user) ? user.displayName : '' }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>

            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-tile v-for="(item, i) in menuItems" :key="i" @click.stop="() => { icon = item[1]; current = item[2]; target = item[3] ; mini = true; }">
            <v-list-tile-action>
              <v-icon>{{ item[1] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ item[0] }}</v-list-tile-title>
          </v-list-tile>

        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-container>
      <v-layout row wrap>
        <component
          :is="current"
          :target="target"
          :icon="icon"
          :key="target"
        ></component>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import SiteSetting from './SiteSetting';
import TagSetting from './TagSetting';

export default {
  components: {
    SiteSetting,
    TagSetting,
  },
  data () {
    return {
      menus: true,
      mini: false,
      current: 'SiteSetting',
      icon: 'mdi-settings-outline',
      target: '',
      menuItems: [
        ['Site Setting', 'mdi-settings-outline', 'SiteSetting', 'config'],
        ['Entity Locations', 'mdi-domain', 'TagSetting', 'entities'],
        ['Business Units & Brands', 'mdi-palette-outline', 'TagSetting', 'units'],
        ['Team Lead Accounts', 'mdi-account-badge-outline', 'TagSetting', 'leads'],
        ['Social Media Icons', 'mdi-comment-processing-outline', 'TagSetting', 'icons'],
        ['Managed Tags', 'mdi-pound', 'TagSetting', 'tags'],
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
    error () {
      return this.$store.getters.error;
    },
    infos () {
      return this.$store.getters.infos;
    },
    tags () {
      return this.$store.getters.tags;
    },
  },

  mounted () {
    this.$store.dispatch('setIsForm', true);
  }
}
</script>
