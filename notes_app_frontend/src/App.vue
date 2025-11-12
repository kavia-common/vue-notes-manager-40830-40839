<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/layout/TopBar.vue'
import Sidebar from './components/layout/Sidebar.vue'
</script>

<template>
  <div class="app-shell" :style="{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), #f9fafb 35%)' }">
    <TopBar />
    <div class="content">
      <Sidebar class="sidebar" />
      <main class="main" role="main" aria-label="Main content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Main area grid */
.content {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.sidebar {
  position: sticky;
  top: 72px;
  align-self: start;
  height: fit-content;
}

.main {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  padding: 1rem;
  min-height: calc(100vh - 120px);
}

/* Responsive */
@media (max-width: 960px) {
  .content {
    grid-template-columns: 1fr;
    padding: 0.75rem;
  }
  .sidebar {
    position: relative;
    top: 0;
    order: -1;
  }
}
</style>
