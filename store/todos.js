export const state = () => ({
  list: [],
  isLoading: false,
})

export const mutations = {
  setTodos(state, todos) {
    state.list = todos
  },
  add(state, todo) {
    state.list.push(todo)
  },
  toggle(state, todo) {
    state.list.map((item) => (item.id !== todo.id ? item : todo))
  },
  remove(state, todo) {
    state.list = state.list.filter((item) => item.id !== todo.id)
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
}

export const actions = {
  async fetch({ commit }) {
    commit('setIsLoading', true)
    const result = await this.$axios.$get('/todos')
    commit('setTodos', result)
    commit('setIsLoading', false)
  },
  async create({ commit }, todo) {
    const result = await this.$axios.$post('/todos', todo)
    commit('add', result)
  },
  async toggle({ commit }, todo) {
    const result = await this.$axios.$put('/todos/' + todo.id, todo)
    commit('toggle', result)
  },
  async removeById({ commit }, todo) {
    await this.$axios.$delete('/todos/' + todo.id)
    commit('remove', todo)
  },
}
