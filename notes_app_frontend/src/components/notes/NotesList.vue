<script setup lang="ts">
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notes'
import NoteItem from './NoteItem.vue'

const store = useNotesStore()
const notes = computed(() => store.filteredNotes)
const selectedId = computed(() => store.selectedNoteId)

function onSelect(id: string) {
  store.selectNote(id)
}

function onDelete(id: string) {
  const note = store.notes.find(n => n.id === id)
  const title = note?.title || 'this note'
  const ok = window.confirm(`Delete "${title}"? This action cannot be undone.`)
  if (ok) {
    store.deleteNote(id)
  }
}
</script>

<template>
  <section aria-label="Notes list" class="list card">
    <header class="list-header">
      <h2>My Notes</h2>
      <span class="badge">{{ notes.length }}</span>
    </header>

    <div v-if="notes.length === 0" class="empty">
      <p class="text-muted">No notes found. Create a new note to get started.</p>
    </div>

    <ul v-else class="items" role="listbox" aria-label="Notes">
      <li v-for="n in notes" :key="n.id" role="option" :aria-selected="n.id === selectedId" :class="{ selected: n.id === selectedId }">
        <NoteItem :note="n" :selected="n.id === selectedId" @select="onSelect" @delete="onDelete" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.list {
  padding: 0;
  overflow: hidden;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(90deg, rgba(37,99,235,0.06), rgba(255,255,255,1));
}

.items {
  list-style: none;
  margin: 0;
  padding: 0.25rem;
  display: grid;
  gap: 0.25rem;
}

li.selected {
  outline: 2px solid rgba(37,99,235,0.25);
  border-radius: 10px;
}

.empty {
  padding: 1rem;
}
</style>
