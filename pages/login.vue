<template>
  <div class="d-flex justify-center mt-16 mx-2">
    <v-card elevation="2" width="400" max-width="100%" class="text-center">
      <v-card-title class="d-block">
        <v-flex>
          <h1 class="mt-4" justify="center" align="center">
            <v-icon size="45" class="mt-n2" color="orange darken-1"
              >mdi-note-text</v-icon
            >
            My Space
          </h1>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="login.username"
            :rules="emailRules"
            label="E-mail"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="login.password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn
            color="primary"
            class="mt-4"
            :loading="loading"
            @click="submit"
          >
            Sign In
          </v-btn>

          <div class="mt-2">
            <NuxtLink to="/sign-up"> Sign Up </NuxtLink>
            <div>
              <v-btn
                :loading="loading"
                class="ma-1"
                color="#fb8c00"
                plain
                @click="demo"
              >
                Demo
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data: () => ({
    snackbar: false,
    loading: false,
    valid: true,
    login: {
      username: '',
      password: '',
    },
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length > 3) || 'Password must be more than 3 characters',
    ],
  }),
  head: {
    title: 'Auth',
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          await this.$auth.loginWith('local', {
            data: this.login,
          })
        } catch ({ response }) {
          this.loading = false
          this.$toast.error(response.data.message)
        }
      }
    },
    async demo() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: 'demo@demo.ua',
            password: '1111',
          },
        })
      } catch ({ response }) {
        this.loading = false
        this.$toast.error(response.data.message)
      }
    },
  },
}
</script>
