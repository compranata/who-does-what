<template>
  <div class="pb-3">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-actions class="pa-0">
          <v-icon left class="grey--text">{{ icon }}</v-icon>
          <span v-show="!modified" class="grey--text font-weight-medium">{{ form.target }}</span>
          <v-toolbar flat class="transparent" v-if="!isDummy && !isNew" key="edit">
            <v-chip outline v-show="modified" color="red">Modified</v-chip>
            <v-spacer></v-spacer>
            <v-btn flat icon class="grey--text" v-show="!isEditing"><v-icon @click="onEdit">edit</v-icon></v-btn>
            <v-btn flat icon class="green--text" :loading="loading" v-show="isEditing"><v-icon @click="onSave">save</v-icon></v-btn>
            <v-btn flat icon class="red--text" v-show="isEditing"><v-icon @click="onLeave">cancel</v-icon></v-btn>
            <v-btn flat icon class="grey--text" :loading="loading"><v-icon @click="onDelete">delete</v-icon></v-btn>
          </v-toolbar>
          <v-toolbar flat class="transparent" v-if="isNew" key="create">
            <v-spacer></v-spacer>
            <v-btn flat icon class="green--text" :loading="loading" :disabled="!valid"><v-icon @click="onCreate">save</v-icon></v-btn>
            <v-btn flat icon class="grey--text"><v-icon @click="onCancel">cancel</v-icon></v-btn>
          </v-toolbar>
          <v-toolbar flat class="transparent" v-if="isDummy" key="dummy" px-0>
            <v-chip outline v-show="modified" color="red">Modified</v-chip>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <v-chip outline color="grey" slot="activator">dummies</v-chip>
              <span>This is dummy record, when you create your own entity, this will be deleted.</span>
            </v-tooltip>
          </v-toolbar>
        </v-card-actions>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs12>
        <v-form ref="newMeta" v-model="valid" :key="form._id">
          <v-container class="pa-0">
            <v-layout row wrap>

              <v-flex xs12 sm6>
                <v-text-field
                  v-model="form.name"
                  :disabled="!isEditing"
                  label="Entity Name*"
                  :rules="[rules.required]"
                  hide-details
                  class="font-weight-medium"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="form.address"
                  :disabled="!isEditing"
                  label="Entity Address*"
                  :rules="[rules.required]"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 order-sm2>
                <v-text-field
                  v-model="form.country"
                  :disabled="!isEditing"
                  label="Country*"
                  :rules="[rules.required]"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 order-sm1>
                <v-text-field
                  v-model="form.phone"
                  :disabled="!isEditing"
                  label="Telephone (Representative)"
                  hide-details
                ></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
        </v-form>
      </v-flex>

      <v-flex xs12 order-sm3 v-if="error">
        <v-chip outline color="red">{{ error.message }}</v-chip>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
export default {
  props: [
    'item',
    'icon',
  ],
  data () {
    return {
      form: {
        target: 'Entities',
        _id: this.item._id,
        name: this.item.name,
        address: this.item.address,
        country: this.item.country,
        phone: this.item.phone,
      },
      valid: false,
      modified: false,
      isEditing: false,
      isNew: false,
      rules: {
        required: v => !!v || 'Required.',
      },
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading;
    },
    error () {
      return this.$store.getters.error;
    },
    isDummy () {
      return /^D\w\d{2}$/.test(this.form._id);
    },
  },
  watch: {
    form: {
      handler () {
        this.modified = true;
      },
      deep: true
    }
  },
  methods: {
    onEdit () {
      this.isEditing = true;
      return true;
    },
    onSave () {
      if (this.modified) {
        this.$store.dispatch('saveMeta', this.form).then(() => {
          this.modified = false;
          this.isEditing = false;
        });
      } else {
        this.isEditing = false;
      }
    },
    onCreate () {
      if (!this.valid) {
        return;
      }
      this.$store.dispatch('createMeta', this.form).then(() => {
        this.clearForm();
        this.$emit('cancel');
      })
    },
    onLeave () {
      this.form._id = this.item._id,
      this.form.name = this.item.name,
      this.form.address = this.item.address,
      this.form.country = this.item.country,
      this.phone = this.item.phone,
      this.isEditing = false;
    },
    onDelete () {
      this.$store.dispatch('removeMeta', this.form).then(() => {
        this.isEditing = false;
      })
    },
    onCancel () {
      this.modified = false;
      this.$emit('cancel');
    },
    clearForm () {
      this.form = {
        target: 'Entities',
        _id: '',
        name: '',
        address: '',
        country: '',
        phone: '',
      }
    },
  },
  created () {
    if (typeof this.item === 'string') {
      this.isNew = true;
      this.isEditing = true;
    }
  },
}
</script>
