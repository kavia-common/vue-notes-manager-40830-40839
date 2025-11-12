import { defineStore } from 'pinia'
import { ref, computed, watch, onMounted } from 'vue'
import type { Note } from '@/types/note'
import { loadNotes, saveNotes, log } from '@/utils/persistence'

/**
 * Notes store manages notes collection, selection, and search query.
 * Hydrates from LocalStorage on init and persists on changes.
 */
// PUBLIC_INTERFACE
export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const selectedNoteId = ref<string | null>(null)
  const searchQuery = ref<string>('')

  // Derived
  const selectedNote = computed<Note | null>(() => {
    return notes.value.find(n => n.id === selectedNoteId.value) ?? null
  })

  const filteredNotes = computed<Note[]>(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return notes.value
    return notes.value.filter(n => {
      const t = (n.title || '').toLowerCase()
      const c = (n.content || '').toLowerCase()
      return t.includes(q) || c.includes(q)
    })
  })

  // Actions
  // PUBLIC_INTERFACE
  function createNote(partial?: Partial<Note>) {
    const now = new Date().toISOString()
    const note: Note = {
      id: crypto.randomUUID(),
      title: partial?.title?.trim() || 'Untitled Note',
      content: partial?.content || '',
      createdAt: now,
      updatedAt: now,
    }
    notes.value.unshift(note)
    selectedNoteId.value = note.id
    log('info', `Created note ${note.id}`)
    return note
  }

  // PUBLIC_INTERFACE
  function updateNote(id: string, patch: Partial<Pick<Note, 'title' | 'content'>>) {
    const idx = notes.value.findIndex(n => n.id === id)
    if (idx === -1) return
    const updated: Note = {
      ...notes.value[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    }
    notes.value[idx] = updated
  }

  // PUBLIC_INTERFACE
  function deleteNote(id: string) {
    const idx = notes.value.findIndex(n => n.id === id)
    if (idx === -1) return
    notes.value.splice(idx, 1)
    if (selectedNoteId.value === id) {
      selectedNoteId.value = notes.value[0]?.id ?? null
    }
  }

  // PUBLIC_INTERFACE
  function selectNote(id: string | null) {
    selectedNoteId.value = id
  }

  // PUBLIC_INTERFACE
  function setSearchQuery(q: string) {
    searchQuery.value = q
  }

  // Persistence
  onMounted(() => {
    try {
      const loaded = loadNotes()
      if (Array.isArray(loaded)) {
        notes.value = loaded
        selectedNoteId.value = notes.value[0]?.id ?? null
      }
    } catch {
      log('warn', 'Failed to load notes on init')
    }
  })

  watch(
    notes,
    (val) => {
      try {
        saveNotes(val)
      } catch {
        log('warn', 'Failed to persist notes')
      }
    },
    { deep: true }
  )

  return {
    notes,
    selectedNoteId,
    searchQuery,
    selectedNote,
    filteredNotes,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    setSearchQuery,
  }
})
