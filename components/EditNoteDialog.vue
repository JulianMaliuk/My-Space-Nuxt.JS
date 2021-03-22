<template>
  <v-dialog :value="dialog" max-width="600px" @input="(v) => v || close()">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Note</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editNote.title"
                label="Title"
                required
              ></v-text-field>
              <v-textarea
                v-model="editNote.text"
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
                @click="editNote.color = color"
              >
                <v-avatar>
                  <v-icon v-if="editNote.color === color">mdi-check</v-icon>
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
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { NOTE_COLORS } from '~/common/note-colots'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    note: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      NOTE_COLORS,
      editNote: {},
    }
  },
  watch: {
    note() {
      this.editNote = { ...this.note }
    },
  },
  methods: {
    close() {
      this.$emit('update:dialog', false)
    },
    async save() {
      await this.updateById(this.editNote)
      this.close()
    },
    ...mapActions({
      updateById: 'notes/updateById',
    }),
  },
}
</script>
