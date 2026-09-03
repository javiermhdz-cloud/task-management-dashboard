import { useState } from 'react'
import { createTask } from '../services/taskService'

interface UseTaskFormOptions {
  projectId: number
  onSuccess?: () => void
}

export function useTaskForm({ projectId, onSuccess }: UseTaskFormOptions) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('MEDIUM')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const valid = title.trim().length >= 3

  function reset() {
    setTitle('')
    setDescription('')
    setPriority('MEDIUM')
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || submitting) return

    setSubmitting(true)
    setError(null)

    try {
      await createTask(projectId, {
        title: title.trim(),
        description: description.trim(),
        priority,
        status: 'TODO'
      })
      reset()
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la tarea')
    } finally {
      setSubmitting(false)
    }
  }

  return { title, setTitle, description, setDescription, priority, setPriority, submitting, error, valid, handleSubmit }
}