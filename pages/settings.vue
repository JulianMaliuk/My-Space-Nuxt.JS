<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="user.name" label="Name" required></v-text-field>

    <v-btn color="primary" class="" :loading="isSaving" @click="save">
      Save
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    isSaving: false,
    valid: true,
    user: {
      name: '',
    },
  }),
  async fetch() {
    this.user = await this.$axios.$get('/auth/profile')
  },
  head: {
    title: 'Settings',
  },
  methods: {
    async save() {
      this.isSaving = true
      try {
        await this.$axios.$patch('/auth/profile', this.user)
      } finally {
        this.isSaving = false
      }
    },
  },
}
</script>
