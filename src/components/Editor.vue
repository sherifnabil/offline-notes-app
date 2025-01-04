<template>
  <main>
    <textarea name="noteinput" ref="noteInput" id="noteinput" v-model="editor" cols="50" rows="50"
      placeholder="Create new note"></textarea>
  </main>
</template>

<script setup>
import { note } from "@/stores/note";
import { watch, ref, nextTick } from "vue";

const { editor: storeEditor, setEditorContent } = note()
const emit = defineEmits();
const noteInput = ref(null);
const editor = ref(storeEditor)

watch(
  () => note().editor,
  (v) => {
    editor.value = v
    nextTick(() => {
      if (noteInput.value) {
        noteInput.value.focus();
      }
    });
  }
);

watch(editor, (newValue) => {
  emit('update:modelValue', newValue);
  setEditorContent(newValue)
});
</script>
