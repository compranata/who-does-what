<template>
  <div id="createForm">

    <v-layout row justify-space-around>
      <v-flex xs12 sm10 md8 lg6 color="white">

        <v-img height="200" :src="imageUrl">
          <v-layout column justify-space-between fill-height class="lightbox">
            <v-flex shrink>
              <v-progress-linear
                :active="loading"
                class="ma-0"
                color="green lighten-3"
                height="4"
                indeterminate
              ></v-progress-linear>
            </v-flex>
            <v-flex text-xs-right shrink>
              <v-tooltip bottom>
                <v-btn color="white" light fab small @click="onPickFile" slot="activator">
                  <v-icon class="grey--text">mdi-file-upload-outline</v-icon>
                  <input
                    type="file"
                    style="display: none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked"
                  />
                </v-btn>
                <span>Please upload your team image.</span>
              </v-tooltip>
            </v-flex>
            <v-flex pa-3>
              <h3 class="headline white--text">{{ name }}</h3>
              <span class="grey--text text--lighten-1">{{ description }}</span>
            </v-flex>
          </v-layout>
        </v-img>

        <v-form ref="newWDW" v-model="valid">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  outline
                  label="Team Name*"
                  prepend-inner-icon="group"
                  counter="96"
                  :rules="[rules.required, rules.max96]"
                  :persistentHint="true"
                  hint="Unique name of team (max 96 characters)"
                  validate-on-blur
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="description"
                  outline
                  right
                  counter="200"
                  :rules="[rules.required, rules.max200]"
                  label="Description*"
                  prepend-inner-icon="comment"
                  :persistentHint="true"
                  hint="Short introduction for your team up to 200 characters."
                  validate-on-blur
                  ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-radio-group v-model="unit" row :rules="[rules.required]" label="Biz Unit*: ">
                  <template v-for="unit in units">
                    <v-radio
                      :label="`${unit.name}`"
                      :value="unit.name"
                      :key="unit._id"
                      :color="unit.branding"
                      :rules="[rules.required]"
                    ></v-radio>
                  </template>
                </v-radio-group>
              </v-flex>

              <v-flex xs12 sm6>
                <v-autocomplete
                  v-model="entity"
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
                        <v-list-tile-sub-title v-html="data.item.email"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field
                  v-model="phone"
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
                  outline
                  label="Fax"
                  prepend-inner-icon="print"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="email"
                  outline
                  label="Email*"
                  prepend-inner-icon="mail"
                  :rules="[rules.required, rules.emailValid]"
                  validate-on-blur
                ></v-text-field>
              </v-flex>

              <v-flex xs11 sm5>
                <v-text-field
                  v-model="sipAccount"
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
                    <v-list-tile v-for="(item, key) in icons" :key="item._id" @click="setIcon(key, item)">
                      <v-icon left>{{ icons[key].mdi }}</v-icon>
                      <v-list-tile-title>{{ icons[key].provider }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>

              <v-flex xs12>
                <v-textarea
                  v-model="remark"
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

              <v-flex xs12 v-if="error">
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
              </v-flex>

              <v-layout row v-if="!isEditing">
                  <v-btn left flat class="red--text" @click="clearForm"><v-icon left>mdi-eraser</v-icon>Clear</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn left flat class="grey--text" @click="cancel">Cancel</v-btn>
                  <v-btn left flat :loading="loading" :disabled="!valid" color="success" @click="saveWdw">Create</v-btn>
              </v-layout>

              <v-layout row v-else>
                  <v-btn left flat class="red--text" @click="deleteWdw"><v-icon left>mdi-eraser</v-icon>Delete</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn left flat class="grey--text" @click="cancel">Cancel</v-btn>
                  <v-btn left flat :loading="loading" :disabled="!valid" color="success" @click="saveWdw">Update</v-btn>
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
  props: [ 'id' ],
  data () {
    return {
      isEditing: false,

      valid: false,
      imageUrl: '',
      image: null,
      name: '',
      description: '',
      unit: '',
      entity: '',
      lead: '',
      phone: '',
      fax: '',
      email: '',
      sipAccount: '',
      sipProvider: {},
      remark: '',
      selectedTags: [],

      icon: 0,
      label: '',
      rules: {
        required: v => !!v || 'Required.',
        max96: v => !!v && v.length <= 96 || 'Max 96 characters.',
        max200: v => !!v && v.length <= 200 || 'Max 200 characters.',
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
    defaultImage () {
      return this.$store.getters.defaultImage;
    },
    loading () {
      return this.$store.getters.loading;
    },
    error () {
      return this.$store.getters.error;
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
    saveWdw () {
      this.$store.dispatch('saveWdw', {
        _id: (this.id) ? this.id : null,
        imageUrl: this.imageUrl,
        image: this.image,
        name: this.name.trim(),
        description: this.description.trim(),
        unit: this.unit,
        entity: this.entity,
        lead: this.lead,
        phone: this.phone.trim(),
        fax: this.fax.trim(),
        email: this.email.trim(),
        sipAccount: this.sipAccount.trim(),
        sipProvider: this.sipProvider,
        remark: this.remark.trim(),
        tags: this.selectedTags,
        sipicon: this.icon,
        router: this.$router,
        isEditing: this.isEditing,
      });
    },
    deleteWdw () {
      this.$store.dispatch('deleteWdw', {
        _id: this.id,
        router: this.$router,
      });
    },
    clearForm () {
      this.$refs.newWDW.reset();
      this.imageUrl = this.defaultImage;
      this.name = '';
      this.description = '';
      this.unit = '';
      this.entity = '';
      this.lead = '';
      this.phone = '';
      this.fax = '';
      this.email = '';
      this.sipAccount = '';
      this.sipProvider = this.$store.getters.icons[0];
      this.remark = '';
      this.selectedTags = [];
      this.icon = 0;
    },
    cancel () {
      this.$router.go(-1);
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
    },
    setIcon (key, item) {
      this.icon = key;
      this.sipProvider = item;
    },
    onDismissed () {
      this.$store.dispatch('clearError');
    },
  },
  mounted () {
    this.imageUrl = this.defaultImage;
    this.sipProvider = this.$store.getters.icons[0];
    if (this.id) {
      this.isEditing = true;
      const currentWdw = this.$store.getters.selectedWdw(this.id);
      let providerIndex;
      for (let idx = 0; idx < this.icons.length; idx++) {
        if (this.icons[idx]._id === currentWdw.sip._id) {
          providerIndex = idx;
        }
      }

      this.$refs.newWDW.reset();
      this.imageUrl = currentWdw.imageUrl;
      this.name = currentWdw.name;
      this.description = currentWdw.description;
      this.unit = currentWdw.unit.name;
      this.entity = currentWdw.entity._id;
      this.lead = currentWdw.lead._id;
      this.phone = currentWdw.phone;
      this.fax = currentWdw.fax;
      this.email = currentWdw.email;
      this.sipAccount = currentWdw.sip.account;
      this.sipProvider = { _id: currentWdw.sip._id, provider: currentWdw.sip.provider, mdi: currentWdw.sip.mdi };
      this.icon = providerIndex;
      this.remark = currentWdw.remark;
      this.selectedTags = currentWdw.tags.split(',');
    }
  }
}
</script>
