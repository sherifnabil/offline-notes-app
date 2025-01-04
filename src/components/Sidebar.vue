<script setup>
import { ref, watch } from 'vue';
import { note } from "@/stores/note";

const { setActive, activeNote } = note()
const search = ref('');
let showSidebar = ref(true)
let notes = note().notesList.filter(n => !n.hasDeleted)

watch(() => note().notesList, (val) => notes = val.filter(n => !n.hasDeleted))
watch(note().activeNote, () => notes = notes.filter(n => !n.hasDeleted))
watch(search, () => !search.value.trim() ? notes.filter(n => !n.hasDeleted) : notes.filter((n) => n.name.toLowerCase().includes(search.value.toLowerCase())).filter(n => !n.hasDeleted));

const toggle = e => {
  let container = document.getElementsByClassName('container')[0];
  showSidebar.value = !showSidebar.value;
  showSidebar.value ? container.classList.add('active') : container.classList.remove('active');
}
</script>

<template>
  <aside>
    <span @click="toggle" id="toggle">
      <font-awesome-icon v-if="showSidebar" icon="angles-left" />
      <font-awesome-icon v-else icon="angles-right" />
    </span>
    <div class="search-box">
      <font-awesome-icon icon="search" />
      <input v-model="search" type="text" id="search" placeholder="Search">
    </div>
    <div id="notelist">
      <div v-for="note in notes" :key="note.id" @click="setActive(note)"
        :class="{ 'selected': activeNote.id == note.id }">
        {{ note.name }}
      </div>
    </div>
  </aside>
</template>
