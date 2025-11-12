<script setup lang="ts" name="AppSidebar">
import { useRouter, RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const router = useRouter()

function newNote() {
  store.createNote()
  // The HomeView automatically shows editor bound to selected note
  router.push({ name: 'home' })
}

const featureFlags = computed(() => String(import.meta.env.VITE_FEATURE_FLAGS ?? 'none'))
const logLevel = computed(() => String(import.meta.env.VITE_LOG_LEVEL ?? 'info'))
</script>

<script lang="ts">
export default {
  name: 'AppSidebar',
}
</script>

<template>
  <aside class="sidebar-panel" aria-label="Sidebar navigation">
    <div class="section">
      <button class="full" @click="newNote" aria-label="Create a new note">
        + New Note
      </button>
    </div>

    <nav class="section nav">
      <RouterLink class="nav-link" :to="{ name: 'home' }" aria-label="Home">
        Home
      </RouterLink>
      <RouterLink class="nav-link" :to="{ name: 'about' }" aria-label="About">
        About
      </RouterLink>
    </nav>

    <div class="section info card accent-gradient">
      <div class="kvs">
        <div class="kv">
          <span>Feature Flags</span>
          <code>{{ featureFlags }}</code>
        </div>
        <div class="kv">
          <span>Log Level</span>
          <code>{{ logLevel }}</code>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.section + .section {
  margin-top: 1rem;
}

.full {
  width: 100%;
  font-weight: 600;
}

.nav {
  display: grid;
  gap: 0.5rem;
}

.nav-link {
  display: block;
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  transition: background-color .2s ease, border-color .2s ease;
}
.nav-link:hover {
  background: #f3f4f6;
  border-color: var(--border-strong);
}

.info {
  padding: 0.75rem;
}

.kvs {
  display: grid;
  gap: 0.5rem;
  font-size: 0.85rem;
}
.kv {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
.kv code {
  color: #374151;
  background: rgba(255,255,255,0.8);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.1rem 0.3rem;
}
</style>
