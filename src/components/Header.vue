<template>
  <header>
    <button id="add" title="Add new note">
      <font-awesome-icon icon="plus" @click="newNote" />
    </button>
    <h3>Notes</h3>
    <div class="buttons">
      <button id="removenote" title="Delete note" @click="removeNote">
        <font-awesome-icon icon="trash" />
      </button>
      <button id="save" title="Save note" @click="saveNote"><font-awesome-icon icon="save" /></button>
    </div>
  </header>
</template>

<script setup>
import { note } from "@/stores/note";

let { saveNote, removeNote, newNote } = note()
</script>
