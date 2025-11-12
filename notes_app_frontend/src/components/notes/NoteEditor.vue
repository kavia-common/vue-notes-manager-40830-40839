<script setup lang="ts">
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()

const note = computed(() => store.selectedNote)

function onTitle(e: Event) {
  if (!note.value) return
  const v = (e.target as HTMLInputElement).value
  store.updateNote(note.value.id, { title: v })
}

function onContent(e: Event) {
  if (!note.value) return
  const v = (e.target as HTMLTextAreaElement).value
  store.updateNote(note.value.id, { content: v })
}
</script>

<template>
  <section class="editor card" aria-label="Note editor">
    <div v-if="!note" class="empty">
      <p class="text-muted">
        Select a note from the list or create a new note to start editing.
      </p>
    </div>
    <div v-else class="fields">
      <label class="sr-only" for="note-title">Note title</label>
      <input
        id="note-title"
        type="text"
        :value="note.title"
        @input="onTitle"
        placeholder="Note title"
        aria-label="Note title"
      />
      <label class="sr-only" for="note-content">Note content</label>
      <textarea
        id="note-content"
        :value="note.content"
        @input="onContent"
        placeholder="Write your thoughts..."
        aria-label="Note content"
      />
      <div class="foot text-muted">
        <span>Created: {{ new Date(note.createdAt).toLocaleString() }}</span>
        <span>Updated: {{ new Date(note.updatedAt).toLocaleString() }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editor {
  padding: 1rem;
  min-height: 360px;
}

.fields {
  display: grid;
  gap: 0.75rem;
}

.foot {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
}
</style>
