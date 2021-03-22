export const state = () => ({
  list: [],
  isLoading: false,
})

export const mutations = {
  setNotes(state, notes) {
    state.list = notes
  },
  add(state, note) {
    state.list.unshift(note)
  },
  remove(state, note) {
    state.list = state.list.filter((item) => item.id !== note.id)
  },
  update(state, note) {
    state.list = state.list
      .map((item) => (item.id !== note.id ? item : note))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
}

export const actions = {
  async fetch({ commit }) {
    commit('setIsLoading', true)
    const result = await this.$axios.$get('/notes')
    commit('setNotes', result)
    commit('setIsLoading', false)
  },
  async create({ commit }, note) {
    const result = await this.$axios.$post('/notes', note)
    commit('add', result)
  },
  async updateById({ commit }, note) {
    const result = await this.$axios.$put('/notes/' + note.id, note)
    commit('update', result)
  },
  async removeById({ commit }, note) {
    await this.$axios.$delete('/notes/' + note.id)
    commit('remove', note)
  },
}
