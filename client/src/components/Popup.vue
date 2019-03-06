<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success">Add new team</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a new team</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="newCard">
          <v-text-field label="Team Name" v-model="name" prepend-icon="folder" :rules="[rules.min]"></v-text-field>
          <v-textarea label="Description" v-model="description" prepend-icon="edit"></v-textarea>
          <v-text-field label="Shared Phone" v-model="phone" prepend-icon="phone" :rules="[rules.phoneMatch]"></v-text-field>
          <v-text-field label="Shared Inbox" v-model="mail" prepend-icon="mail" :rules="[rules.emailMatch]"></v-text-field>
          <v-btn flat class="c_gta mx-0 mt-3" @click="submit">Add team</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      phone: '',
      mail: '',
      rules: {
        min: v => v.length >= 3 || 'Min 3 characters',
        phoneMatch: v => v.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/) || 'Invalid phone/fax number',
        emailMatch: v => v.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || 'Invalid email address',
      }
    }
  },
  methods: {
    submit() {

    },
    // submit() {
    //   if(this.$refs.newCard.validate()){
    //     console.log(this.name, this.description);
    //   }
    // }
  }
}
</script>
