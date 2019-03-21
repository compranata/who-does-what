<template>
  <v-layout column align-center>
    <div>
      <p>If you have no account yet, then just join!</p>
    </div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn flat small outline color="grey" slot="activator">
        <v-icon left>how_to_reg</v-icon>
        <span>Join</span>
      </v-btn>
      <v-card>
        <v-card-title class="headline">
          <v-icon left>how_to_reg</v-icon>
          <span>Sign Up</span>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3 mt-3" ref="signunForm" v-model="valid">
            <v-text-field
              v-model="email"
              append-icon="mail"
              :rules="[rules.required, rules.emailValid]"
              label="Email*"
              validate-on-blur
            ></v-text-field>
            <v-text-field
             v-model="name"
             append-icon="person"
             label="Name"
             :persistentHint="true"
             hint="(Optional)"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.min8]"
              :type="show ? 'text' : 'password'"
              label="Password*"
              hint="At least 8 characters"
              @click:append="show = !show"
              validate-on-blur
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :append-icon="show ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.confirmValid]"
              :type="show ? 'text' : 'password'"
              label="Confirm Password*"
              @click:append="show = !show"
              validate-on-blur
            ></v-text-field>
            <v-checkbox v-model="agree" :rules="[rules.agree]" color="success">
              <template v-slot:label>
                <div @click.stop="">
                  Do you accept the
                  <a @click.stop="terms = true">terms</a>
                  and
                  <a @click.stop="conditions = true">conditions</a>
                  ?
                </div>
              </template>
            </v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            class=""
            @click="dialog = false"
            >Cancel</v-btn>
          <v-btn
            flat
            :loading="loading"
            :disabled="!valid"
            color="success"
            @click="signUp"
          >Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title">Terms</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="success" @click="terms = false">
            <span>Ok</span>
            <v-icon small right>accept</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="conditions" width="70%">
      <v-card>
        <v-card-title class="title">Conditions</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="success" @click="conditions = false">
            <span>Ok</span>
            <v-icon small right>accept</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      show: false,
      dialog: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
      terms: false,
      conditions: false,
      rules: {
        required: v => !!v || 'Required.',
        min8: v => v.length >= 8 || 'Min 8 characters.',
        emailValid: v => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v) || 'Invalid email address',
        confirmValid: v => this.password === v || 'Type in carefully once again',
        agree: v => v === true || 'Accept terms & conditions',
      },
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    loading () {
      return this.$store.getters.loading;
    },
    error () {
      return this.$store.getter.error;
    },
  },
  methods: {
    signUp () {
      if (this.$refs.signunForm.validate()) {
        (this.name === '') ? this.name = this.email : this.name;
        this.$store.dispatch('signupUser', {email: this.email, name: this.name, password: this.password});
      } else throw new Error('Ensure to fill the fields below!');
    },
  },
}
</script>
