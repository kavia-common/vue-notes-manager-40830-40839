<script setup lang="ts">
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const query = computed({
  get: () => store.searchQuery,
  set: (v: string) => store.setSearchQuery(v),
})

const nodeEnv = import.meta.env.VITE_NODE_ENV || 'development'
</script>

<template>
  <header class="topbar" role="banner" aria-label="Application top bar">
    <div class="bar">
      <div class="left">
        <div class="logo" aria-hidden="true">📝</div>
        <h1 class="title" aria-label="App title">
          Ocean Notes
        </h1>
        <span class="env badge" :title="`Env: ${nodeEnv}`">{{ nodeEnv }}</span>
      </div>
      <div class="right">
        <label class="sr-only" for="global-search">Search notes</label>
        <input
          id="global-search"
          type="text"
          v-model="query"
          placeholder="Search notes..."
          aria-label="Search notes by title or content"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.bar {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.85rem 1rem;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1rem;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
}

.title {
  font-size: 1.125rem;
  letter-spacing: 0.2px;
  line-height: 1.2;
}

.env {
  margin-left: 0.5rem;
}

.right input {
  background: #fff;
}

@media (max-width: 720px) {
  .bar {
    grid-template-columns: 1fr;
  }
}
</style>
