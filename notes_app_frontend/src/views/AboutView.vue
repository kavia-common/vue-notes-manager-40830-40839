<template>
  <div class="about card">
    <h1>About Ocean Notes</h1>
    <p>
      Ocean Notes is a simple notes application built with Vue 3, Vite, Vue Router, and Pinia.
      Notes are stored in your browser using LocalStorage to keep your data on your device.
    </p>
    <ul>
      <li>Create, select, edit, and delete notes</li>
      <li>Real-time search across titles and content</li>
      <li>Local persistence</li>
      <li>Ocean Professional theme with modern UI</li>
    </ul>
  </div>
</template>

<style scoped>
.about {
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  display: grid;
  gap: 0.5rem;
}
ul {
  margin-left: 1rem;
}
</style>
