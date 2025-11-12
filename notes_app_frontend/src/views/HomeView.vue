<script setup lang="ts">
import NotesList from '@/components/notes/NotesList.vue'
import NoteEditor from '@/components/notes/NoteEditor.vue'
</script>

<template>
  <div class="grid">
    <NotesList />
    <NoteEditor />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 1rem;
}
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
