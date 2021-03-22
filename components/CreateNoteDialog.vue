<template>
  <v-dialog :value="dialog" max-width="600px" @input="(v) => v || close()">
    <v-card>
      <v-card-title>
        <span class="headline">Create Note</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newNote.title"
                label="Title"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="newNote.text"
                label="Text"
                required
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-chip
                v-for="(color, index) in NOTE_COLORS"
                :key="index"
                class="ma-1 pa-1"
                :color="color"
                @click="newNote.color = color"
              >
                <v-avatar>
                  <v-icon v-if="newNote.color === color">mdi-check</v-icon>
                </v-avatar>
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="create"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { NOTE_COLORS } from '~/common/note-colots'
const noteTemplate = {
  title: '',
  text: '',
  color: null,
}

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      NOTE_COLORS,
      newNote: { ...noteTemplate },
    }
  },
  methods: {
    close() {
      this.$emit('update:dialog', false)
      this.newNote = { ...noteTemplate }
    },
    async create() {
      await this.addNote(this.newNote)
      this.newNote = { ...noteTemplate }
      this.close()
    },
    ...mapActions({
      addNote: 'notes/create',
    }),
  },
}
</script>
