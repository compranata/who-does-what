<template>
  <v-flex xs10 offset-xs2 offset-lg0>
    <v-dialog v-model="createNew" max-width="600px">
      <v-btn color="primary" dark small fixed right fab slot="activator">
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title class="subheading grey--text text-uppercase">Create New {{ target }}</v-card-title>
        <v-card-text>
          <component
            :is="targetList"
            :item="target"
            :target="target"
            :icon="icon"
            @cancel="onCancel"
            :key="target"
          ></component>
        </v-card-text>
      </v-card>
    </v-dialog>

    <h1 class="subheading grey--text mb-2 text-capitalize">{{ this.target }}</h1>
    <p class="grey--text mb-2 pr-5">{{ this.note }}</p>

    <v-card flat v-for="(item, i) in items" transition="slide-x-transition" :key="i" class="mb-2">
      <component
        :is="targetList"
        :item="item"
        :target="target"
        :icon="icon"
        :create-new="createNew"
        class="mx-3"
        :key="item._id"
      ></component>
      <v-divider></v-divider>
    </v-card>
  </v-flex>
</template>

<script>
import icons from './Lists/Icons.vue';
import entities from './Lists/Entities.vue';
import tags from './Lists/Tags.vue';
import leads from './Lists/Leads.vue';
import units from './Lists/Units.vue';

export default {
  props: [
    'target',
    'icon',
  ],
  components: {
    icons,
    entities,
    tags,
    leads,
    units,
  },
  data () {
    return {
      targetList: this.target,
      note: '',
      createNew: false,
      items: '',
    }
  },
  computed: {
  },
  methods: {
    onCancel () {
      this.createNew = false;
    },
  },
  mounted () {
    switch (this.target) {
      case 'icons':
        this.note = 'Please find the icon name at https://dev.materialdesignicons.com/icons, and add prefix "mdi-".';
        this.items = this.$store.getters.icons;
        break;
      case 'entities':
        this.note = '';
        this.items = this.$store.getters.entities;
        break;
      case 'tags':
        this.note = '';
        this.items = this.$store.getters.tags;
        break;
      case 'leads':
        this.note = '';
        this.items = this.$store.getters.leads;
        break;
      case 'units':
        this.note = 'Branding Colour must be the web colour code, such as alias "red", Hex "#FF0055", also RGB rgb(255,69,200) etc';
        this.items = this.$store.getters.units;
        break;
      default:
        this.note = '';
        this.items = [];
    }
  }
}
</script>
