<script setup>
import { ref } from "vue";
import { note } from "@/stores/note";

import Sidebar from "@/components/Sidebar.vue";
import Editor from "@/components/Editor.vue";
import TheHeader from "@/components/Header.vue";

const editor = ref('');

const { hydrate, loadNotes } = note()

loadNotes()
hydrate()
</script>

<template>
  <div>
    <div class="container active">

      <TheHeader />
      <Sidebar />

      <Editor v-model="editor" />
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --color-background: #eee;
  --color-text: #555;
  --color-border: #e1e1e1;
  --color-primary: #2B8492;
  --font-main: 'Barlow', sans-serif;
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-main);
}

.container {
  width: 100% !important;
  background: #eee;
  height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 56px auto;
  grid-template-areas:
    "header"
    "main";
  transition: .3s all;
  overflow: hidden;
}

.container.active {
  grid-template-columns: 250px auto;
  grid-template-areas:
    "aside header"
    "aside main";
  transition: .3s all;
}


header {
  grid-area: header;
  border-bottom: 1px solid var(--color-border);
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

aside {
  grid-area: aside;
  border-right: 1px solid var(--color-border);
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 56px auto;
  grid-template-areas:
    "search"
    "notelist";
  transition: .3s all;
  overflow-y: scroll;
}

main {
  grid-area: main;
}

button {
  padding: 0 10px;
  border: none;
  background-color: transparent;
  font-size: 1.2em;
  color: var(--color-text);
}

button:hover {
  color: var(--color-primary);
  cursor: pointer;
}

button:focus {
  outline: none;
}

/**  Search  **/
.search-box {
  grid-area: search;
  border-bottom: 1px solid var(--color-border);
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  align-items: center;
  padding: 0 20px;
}

#search {
  padding: 10px 0;
  background-color: transparent;
  border: none;
}

#search:focus {
  outline: none;
  color: #111;
}

ul {
  grid-area: notelist;
}

ul li {
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  transition: .3s all;
  list-style: none;
}

ul li:hover {
  cursor: pointer;
  background-color: var(--color-border);
}

#notelist {
  grid-area: notelist;
}

#notelist>div {
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  transition: .3s all;
  list-style: none;
}

#notelist>div:hover {
  cursor: pointer;
  background-color: var(--color-border);
}

.selected {
  background-color: white;
  margin-right: -1px;
}

#toggle {
  position: absolute;
  top: 50%;
  left: 0;
  padding: 5px;
  background: #eee;
  // background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-left: none;
}

.active #toggle {
  left: 249px;
}

#toggle:hover {
  cursor: pointer;
  color: var(--color-primary);
}

#noteinput {
  width: 100%;
  height: calc(100vh - 60px);
  padding: 20px;
  border: none;
  background-color: transparent;
  font-size: 1.2em;
  transition: .3s all;
}

#noteinput:focus {
  outline: none;
  background-color: white;
  color: #111;
}
</style>
