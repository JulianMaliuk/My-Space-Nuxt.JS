<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-card-text>
      <v-form lazy-validation>
        <v-text-field
          v-model="text"
          label="Text"
          required
          @keydown.enter.prevent="create"
        ></v-text-field>

        <v-btn
          :disabled="!text"
          color="success"
          block
          class="mb-4"
          @click="create"
        >
          Create
        </v-btn>
      </v-form>

      <v-row v-if="!isLoading && !isExistTodos" class="my-8">
        <v-col cols="12" class="text-center">
          <h1>Create Your First TODO</h1>
        </v-col>
      </v-row>

      <v-row v-if="isLoading" class="my-8">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="red"></v-progress-circular>
        </v-col>
      </v-row>

      <v-row v-for="({ text, id, done }, index) in todos" :key="id" no-gutters>
        <v-col>
          <v-checkbox
            class="mt-0"
            :input-value="done"
            :label="`${index + 1}. ${text}`"
            @change="toggle(todos[index], $event)"
          ></v-checkbox>
        </v-col>
        <v-spacer></v-spacer>
        <v-col align="end">
          <v-btn icon color="red" @click="remove(id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  data() {
    return {
      text: '',
    }
  },
  async fetch() {
    await this.fetchTodos()
  },
  head: {
    title: 'Todos',
  },
  computed: {
    isExistTodos() {
      return this.todos?.length
    },
    todos() {
      return this.$store.state.todos.list
    },
    isLoading() {
      return this.$store.state.todos.isLoading
    },
  },
  watch: {},
  methods: {
    create() {
      if (!this.text) return
      this.createTodo({ text: this.text })
      this.text = ''
    },
    remove(id) {
      this.removeById({ id })
    },
    toggle(todo, event) {
      this.toggleTodo({ ...todo, done: event })
    },
    ...mapActions({
      fetchTodos: 'todos/fetch',
      createTodo: 'todos/create',
      toggleTodo: 'todos/toggle',
      removeById: 'todos/removeById',
    }),
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-list-item {
  padding: 0;
}
</style>
