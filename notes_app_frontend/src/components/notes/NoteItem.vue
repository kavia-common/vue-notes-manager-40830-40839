<script setup lang="ts">
import type { Note } from '@/types/note'

const props = defineProps<{
  note: Note
  selected?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'delete', id: string): void
}>()

function select() {
  emit('select', props.note.id)
}

function del(e: MouseEvent) {
  e.stopPropagation()
  emit('delete', props.note.id)
}
</script>

<template>
  <article
    class="row"
    :class="{ selected }"
    role="button"
    tabindex="0"
    @click="select"
    @keyup.enter="select"
    :aria-label="`Open note ${note.title || 'Untitled Note'}`"
  >
    <div class="meta">
      <h3 class="title">{{ note.title || 'Untitled Note' }}</h3>
      <p class="excerpt text-muted">{{ note.content ? note.content.slice(0, 80) : 'No content' }}</p>
    </div>
    <div class="actions">
      <button class="secondary" aria-label="Delete note" title="Delete" @click="del">Delete</button>
    </div>
  </article>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  align-items: center;
  padding: 0.6rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease, box-shadow .15s ease;
}
.row:hover {
  background: #f8fafc;
  border-color: var(--border-strong);
}
.row.selected {
  border-color: rgba(37, 99, 235, 0.45);
  box-shadow: var(--focus-ring);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
}

.excerpt {
  font-size: 0.85rem;
}
</style>
