<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" color="grey">Sign Up</v-btn>
    <v-card>
      <v-card-title>
        <h2>Sign Up</h2>
      </v-card-title>
      <v-card-text>
        <v-alert :value="error" type="error">Oooops, something went wrong. {{ message }}</v-alert>
        <p>If you have alread an account, please signin here.
          <v-tooltip top>
            <v-icon left small slot="activator">help_outline</v-icon>
            <span class="caption text-lowercase">Only one account by one email address allowed</span>
          </v-tooltip>
        </p>
        <v-form class="px-3" ref="login" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            append-icon="mail"
            :rules="[rules.required, rules.emailMatch]"
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="repeat"
            :append-icon="show2 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.repeated]"
            :type="show2 ? 'text' : 'password'"
            label="Repeat"
            hint="Repeat the password"
            @click:append="show2 = !show2"
          ></v-text-field>
          <v-btn flat :loading="loading" :disabled="!valid" class="success mx-0 mt-3" @click="signUp">Sign Up</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// import fb from '@/services/fb'

export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      repeat: '',
      show1: false,
      show2: false,
      dialog: false,
      loading: false,
      error: false,
      message: '',
      rules: {
          required: v => !!v || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: v => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v) || 'Invalid email address',
          repeated: v => this.password.includes(v) || 'Type in carefully once again'
        }
    }
  },
  methods: {
    signUp() {
      if (this.$refs.login.validate()) {
        this.loading = true;
        this.$store.dispatch('userJoin', {
          email: this.email,
          password: this.password
        });
        // fb.auth.createUserWithEmailAndPassword(this.email, this.password).then(
        //   (user) => {
        //     this.loading = false;
        //     this.dialog = false;
        //     this.$emit('userLoggedIn', `You are now loggerd in as ${user.email}`);
        //   },
        //   (err) => {
        //     this.loading = false;
        //     this.message = err.message;
        //     this.error = true;
        //   }
        // )
      }
    },
  }
}
</script>

<style scoped>
</style>
