import type { Note } from '@/types/note'

const STORAGE_KEY = 'notes_app_v1'
let memoryFallback: Note[] | null = null

type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug'

function currentLevel(): LogLevel {
  const lvl = (import.meta.env.VITE_LOG_LEVEL as string | undefined)?.toLowerCase() || 'info'
  if (['silent','error','warn','info','debug'].includes(lvl)) return lvl as LogLevel
  return 'info'
}

function shouldLog(level: LogLevel) {
  const order: Record<LogLevel, number> = {
    silent: 5,
    error: 4,
    warn: 3,
    info: 2,
    debug: 1,
  }
  return order[level] >= order[currentLevel()]
}

// PUBLIC_INTERFACE
export function log(level: LogLevel, message: string, ...args: unknown[]) {
  if (!shouldLog(level)) return
  const prefix = '[NotesApp]'
  if (level === 'error') console.error(prefix, message, ...args)
  else if (level === 'warn') console.warn(prefix, message, ...args)
  else if (level === 'info') console.info(prefix, message, ...args)
  else if (level === 'debug') console.debug(prefix, message, ...args)
}

/**
 * Load notes from LocalStorage or memory fallback.
 */
// PUBLIC_INTERFACE
export function loadNotes(): Note[] {
  try {
    if (typeof window === 'undefined') {
      return memoryFallback ?? []
    }
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Note[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    log('warn', 'LocalStorage unavailable - using in-memory store')
    return memoryFallback ?? []
  }
}

/**
 * Save notes to LocalStorage or memory fallback.
 */
// PUBLIC_INTERFACE
export function saveNotes(notes: Note[]) {
  try {
    if (typeof window === 'undefined') {
      memoryFallback = notes
      return
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    log('warn', 'LocalStorage save failed - using in-memory store')
    memoryFallback = notes
  }
}
