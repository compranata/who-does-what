<template>
  <div id="createForm">

    <v-layout row justify-space-around>
      <v-flex xs12 sm10 md8 lg6 color="white">
        <v-img height="200" :src="imageUrl">
          <v-layout wrap>
            <v-flex xs12>
              <v-progress-linear
                :active="isUpdating"
                class="ma-0"
                color="green lighten-3"
                height="4"
                indeterminate
              ></v-progress-linear>
            </v-flex>
            <v-flex text-xs-right xs12>
              <v-btn color="white" light fab small @click="onPickFile">
                <v-icon v-if="!isEditing">close</v-icon>
                <v-icon v-else>edit</v-icon>
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked"
                />
              </v-btn>
            </v-flex>
            <v-layout column align-start justify-end pa-3>
              <h3 class="headline white--text">{{ name }}</h3>
              <span class="grey--text text--lighten-1">{{ description }}</span>
            </v-layout>
          </v-layout>
        </v-img>

        <v-form ref="newWDW" v-model="valid">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  :disabled="isUpdating"
                  outline
                  label="Team Name*"
                  prepend-inner-icon="group"
                  :rules="[rules.required]"
                  :persistentHint="true"
                  hint="Unique name of team"
                  validate-on-blur
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="description"
                  :disabled="isUpdating"
                  outline
                  right
                  counter="255"
                  :rules="[rules.required, rules.max255]"
                  label="Description*"
                  prepend-inner-icon="comment"
                  :persistentHint="true"
                  hint="Short introduction for your team up to 255 characters."
                  validate-on-blur
                  ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-radio-group v-model="unit" row>
                  <template v-for="unit in units">
                    <v-radio :label="`${unit.name}`" :value="unit.name" :key="unit.name" :color="unit.branding"></v-radio>
                  </template>
                </v-radio-group>
              </v-flex>

              <v-flex xs12 sm6>
                <v-autocomplete
                  v-model="entity"
                  :disabled="isUpdating"
                  :items="entities"
                  outline
                  label="Entity*"
                  item-text="name"
                  item-value="_id"
                  prepend-inner-icon="business"
                  :rules="[rules.required]"
                  validate-on-blur
                >
                  <template v-slot:selection="data">
                    {{ data.item.name }}
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.address + ', ' + data.item.country"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>

              <v-flex xs12 sm6>
                <v-autocomplete
                  v-model="lead"
                  :disabled="isUpdating"
                  :items="leads"
                  outline
                  label="Lead*"
                  item-text="name"
                  item-value="_id"
                  prepend-inner-icon="person"
                  :rules="[rules.required]"
                  validate-on-blur
                >
                  <template v-slot:selection="data">
                    {{ data.item.name }}
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.mail"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field
                  v-model="phone"
                  :disabled="isUpdating"
                  outline
                  label="Phone*"
                  prepend-inner-icon="call"
                  :rules="[rules.required]"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="fax"
                  :disabled="isUpdating"
                  outline
                  label="Fax"
                  prepend-inner-icon="print"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="email"
                  :disabled="isUpdating"
                  outline
                  label="Email*"
                  prepend-inner-icon="mail"
                  :rules="[rules.required, rules.emailValid]"
                  validate-on-blur
                ></v-text-field>
              </v-flex>

              <v-flex xs11 sm5>
                <v-text-field
                  v-model="sip"
                  :disabled="isUpdating"
                  outline
                  label="Account ID"
                  :prepend-inner-icon="icons[icon].mdi"
                  :persistentHint="true"
                  :hint="`${ icons[icon].provider } (click app incon in right end for change the provider)`"
                  validate-on-blur
                  ></v-text-field>
                </v-flex>
              <v-flex xs1>
                <v-menu offet-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon class="grey--text" v-on="on">
                      <v-icon>mdi-apps</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile v-for="(item, key) in icons" :key="key" @click="icon = key">
                      <v-icon left>{{ icons[key].mdi }}</v-icon>
                      <v-list-tile-title>{{ icons[key].provider }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>

              <v-flex xs12>
                <v-textarea
                  v-model="remark"
                  :disabled="isUpdating"
                  outline
                  label="Addition Information"
                  prepend-inner-icon="mdi-calendar-edit"
                  :persistent-hint="true"
                  hint="Availability of teams, office hours, weekdays, seasons also emergency supports."
                  validate-on-blur
                ></v-textarea>
              </v-flex>

              <v-flex xs12>
                <v-divider></v-divider>

                <v-autocomplete
                  v-model="selectedTags"
                  :disabled="isUpdating"
                  :items="tagSelections"
                  outline
                  chips
                  label="Tags"
                  item-text="name"
                  item-value="_id"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      close
                      class="chip--select-multi"
                      @input="remove(data.item)"
                    >
                      <v-avatar color="success">
                        {{ data.item.avatar }}
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item">@</v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <v-divider></v-divider>
              </v-flex>

              <v-layout row justify-end align-end>
                  <v-spacer></v-spacer>
                  <v-btn left flat class="grey--text" @click="cancel">Clear</v-btn>
                  <v-btn left flat :loading="loading" :disabled="!valid" color="success" @click="save">Save</v-btn>
              </v-layout>


            </v-layout>
          </v-container>
        </v-form>

      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  data () {
    return {
      isUpdating: false,
      isEditing: true,

      valid: false,
      imageUrl: 'https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg',
      name: '',
      description: ' ',
      phone: '',
      fax: '',
      email: '',
      sip: '',
      remark: '',
      entity: '',
      lead: '',
      label: '',
      selectedTags: [],
      icon: 0,
      unit: '',
      image: null,
      rules: {
        required: v => !!v || 'Required.',
        max255: v => !!v && v.length <= 255 || 'Max 255 characters.',
        emailValid: v => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v) || 'Invalid email address',
      }
    }
  },
  computed: {
    icons () {
      return this.$store.getters.icons;
    },
    entities () {
      return this.$store.getters.entities;
    },
    tags () {
      return this.$store.getters.tags;
    },
    tagGroups () {
      return this.$store.getters.tagGroups(this.label);
    },
    tagLabels () {
      return this.$store.getters.tagLabels;
    },
    leads () {
      return this.$store.getters.leads;
    },
    tagSelections () {
      return this.$store.getters.tagSelections;
    },
    units () {
      return this.$store.getters.units;
    },
    loading () {
      return this.$store.getters.loading;
    },
  },

  watch: {
    isUpdating (val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    }
  },

  methods: {
    remove (item) {
      const index = this.selectedTags.indexOf(item._id)
      if (index >= 0) this.selectedTags.splice(index, 1)
    },
    save () {
      this.$store.dispatch('saveWdw', {
        image: this.image,
        name: this.name.trim(),
        description: this.description.trim(),
        phone: this.phone.trim(),
        fax: this.fax.trim(),
        email: this.email.trim(),
        sip: this.sip.trim(),
        sipicon: this.icon,
        remark: this.remark.trim(),
        entity: this.entity,
        lead: this.lead,
        tags: this.selectedTags,
        unit: this.unit,
      });
    },
    cancel () {
      this.$refs.newWDW.reset();
      this.name = '';
      this.imageUrl = 'https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg';
      this.description = ' ';
      this.phone = '';
      this.fax = '';
      this.email = '';
      this.sip = '';
      this.remark = '';
      this.entity = '';
      this.lead = '';
      this.label = '';
      this.selectedTags = [];
      this.icon = 0;
      this.unit = '';
    },
    onPickFile () {
      this.$refs.fileInput.click();
    },
    onFilePicked (event) {
      const files = event.target.files;
      if (files.length <= 0) return false;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!');
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
}
</script>
