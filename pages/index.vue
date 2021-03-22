<template>
  <div>
    <v-row v-if="!isLoading && !isExistNotes" class="mt-16">
      <v-col cols="12" class="mt-16 text-center">
        <h1>Create Your First Note</h1>
      </v-col>
    </v-row>
    <v-row v-if="isLoading" class="my-8">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else v-masonry>
      <v-col v-for="note in notes" :key="note.id" cols="12" sm="6" md="4">
        <v-card
          height="100%"
          :color="getColor(note)"
          class="pt-1 pb-1"
          @click="edit(note)"
        >
          <v-card-title v-if="note.title">{{ note.title }}</v-card-title>
          <v-card-text v-if="note.text">
            <span style="white-space: pre-line">{{ note.text }}</span>
          </v-card-text>
          <v-card-actions class="mt-2 mb-0 pb-0" @click.stop>
            <span class="pl-3 pb-7 date">
              {{ new Date(note.updatedAt).toLocaleString() }}
            </span>
            <v-spacer></v-spacer>

            <v-speed-dial :bottom="true" :right="true" direction="left">
              <template #activator>
                <v-btn icon>
                  <v-icon> mdi-dots-vertical </v-icon>
                </v-btn>
              </template>
              <v-btn dark icon color="red" @click="deleteNote(note)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <EditNoteDialog :dialog.sync="editDialog" :note="selectedNote" />
    <CreateNoteDialog :dialog.sync="createDialog" />

    <v-fab-transition>
      <v-btn
        color="red"
        fab
        dark
        fixed
        bottom
        right
        @click="createDialog = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import EditNoteDialog from '~/components/EditNoteDialog.vue'
import CreateNoteDialog from '~/components/CreateNoteDialog.vue'

export default {
  components: {
    EditNoteDialog,
    CreateNoteDialog,
  },
  data() {
    return {
      createDialog: false,
      editDialog: false,
      selectedNote: null,
    }
  },
  async fetch() {
    await this.fetchNotes()
  },
  head: {
    title: 'Notes',
  },
  computed: {
    isExistNotes() {
      return this.notes?.length
    },
    notes() {
      return this.$store.state.notes.list
    },
    isLoading() {
      return this.$store.state.notes.isLoading
    },
  },
  watch: {
    notes: {
      deep: true,
      handler() {
        setTimeout(() => this.$redrawVueMasonry())
      },
    },
  },
  methods: {
    getColor(note) {
      return note.color ?? '#34357b'
    },
    async deleteNote(note) {
      await this.removeById(note)
    },
    edit(note) {
      this.selectedNote = note
      this.editDialog = true
    },
    ...mapActions({
      fetchNotes: 'notes/fetch',
      removeById: 'notes/removeById',
    }),
  },
}
</script>

<style lang="scss" scoped>
.date {
  font-size: 0.8rem;
  color: silver;
}
</style>
