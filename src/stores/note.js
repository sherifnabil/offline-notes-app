import { watch } from 'vue'
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid'

export const note = defineStore('note', {
  state: () => ({
    editor: '',
    notesList: [],
    activeNote: {},
    inputFocus: false,
    filteredNotes: [],
  }),

  actions: {
    editorFocus(state = true) {
      this.inputFocus = state
    },

    findNoteIndex(searchId) {
      return this.notesList.findIndex((n) => n.id == searchId)
    },

    loadNotes() {
      const storedNotes = localStorage.getItem('notes')
      if (storedNotes) {
        try {
          const parsedNotes = JSON.parse(storedNotes)

          if (Array.isArray(parsedNotes)) this.notesList = parsedNotes

          /** if There's an Internet Connection */
          if(navigator.onLine) {
            /** sync notes */
            let syncNotes = parsedNotes.filter((n) => n.hasCreated || n.hasUpdated || n.hasDeleted)
            if(syncNotes.length) {
              // Call API Server With Filtered Notes
              // Call API To Get Fresh Notes and
              // Save Them To Storage
            }
            /** sync notes */
          }

        } catch (error) {
          console.error('Failed to parse notes from localStorage:', error)
        }
      }
    },

    setActive(note) {
      Object.assign(this.activeNote, note)

      this.editor = note.name
      this.editorFocus()
    },

    setEditorContent(content) {
      this.editor = content
    },

    saveNote() {
      if (!this.editor.trim()) return

      this.activeNote.id ? this.update() : this.create()
      this.editorFocus()
    },

    newNote() {
      this.editor = ''
      Object.keys(this.activeNote).forEach((key) => delete this.activeNote[key])
      this.editorFocus()
    },

    create() {
      let uuid = uuidv4()

      this.notesList.push({
        id: uuid,
        name: this.editor,
        // flags for offline mode
        hasCreated: true ,
        hasUpdated: false ,
        hasDeleted: false
      })

      this.notesList = [...this.notesList]
      const index = this.findNoteIndex(uuid)

      this.setActive(this.notesList[index])
    },

    update() {
      const index = this.findNoteIndex(this.activeNote.id)
      if (index !== -1) {
        this.notesList[index].name = this.editor
        this.notesList[index].hasUpdated = true
      }
    },

    removeNote() {
      if (Object.keys(this.activeNote).length) {
        const index = this.findNoteIndex(this.activeNote.id)
        if (index != -1) {
          this.notesList[index].hasDeleted = true

          /** Stop Hard Delete */
          // const selected = this.notesList[index];
          // this.notesList.filter((n) => n.id != selected.id)
          // this.notesList.splice(index, 1);
        }

        Object.keys(this.activeNote).forEach((key) => delete this.activeNote[key])

        this.editor = ''
        this.editorFocus(false)
      }
    },

    hydrate() {
      watch(
        () => this.notesList,
        (newNotes) => {
          localStorage.setItem('notes', JSON.stringify(newNotes))
        },
        { deep: true, immediate: true },
      )
    },
  },

  getters: {},
})
