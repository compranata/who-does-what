<template>
  <div class="signin">
    <v-container align-content-center>
      <v-layout row wrap justify-space-around class="mb-3 grey--text">

        <v-flex xs12 sm6>
          <h1 class="subheading grey--text">User Accounts</h1>
          <v-divider></v-divider>
          <p>
            Please sign in before starting to use. Once you logged in,
            saved your crediential in your browser, unless you sign out
            explicitly.
          </p>

          <v-card flat>
            <v-card-title>
              <v-icon left color="grey">launch</v-icon>
              <h2 class="grey--text">Sign In</h2>
            </v-card-title>
            <v-card-text>
              <v-alert :value="valid" type="error">Ooops, something went wrong!</v-alert>
              <v-form class="px-3 mt-3" ref="signinForm" v-model="valid">
                <v-text-field
                 v-model="email"
                 append-icon="mail"
                 :rules="[rules.required, rules.emailValid]"
                 label="Email"
                 validate-on-blur
                ></v-text-field>
                <v-text-field
                 v-model="password"
                 :append-icon="show ? 'visibility_off' : 'visibility'"
                 :rules="[rules.required, rules.min8]"
                 :type="show ? 'text' : 'password'"
                 label="Password"
                 @click:append="show = !show"
                 validate-on-blur
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
               :loading="loading"
               :disabled="!valid"
               color="success"
               @click="signIn"
              >Sign In</v-btn>
            </v-card-actions>
          </v-card>
          <div class="mt-3">
            <Signup></Signup>
          </div>
        </v-flex>

      </v-layout>
    </v-container>


  </div>


</template>

<script>
import Signup from '@/components/User/Signup'

export default {
  components: { Signup },
  data () {
    return {
      valid: false,
      show: false,
      email: '',
      password: '',
      rules: {
        required: v => !!v || 'Required.',
        min8: v => v.length >= 8 || 'Min 8 characters.',
        emailValid: v => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v) || 'Invalid email address',
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
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    signIn () {
      if (this.$refs.signinForm.validate()) {
        this.$store.dispatch('signinUser', {email: this.email, password: this.password});
      } else throw new Error('Ensure to fill the fields below!');
    }
  }
}
</script>
