import { useCallback, useEffect, useState } from 'react'
import { getTasks, deleteTask, updateTaskStatus } from '../services/taskService'
import type { Task } from '../types'

export function useTasks(projectId?: number) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getTasks()
      .then((data) => {
        if (!cancelled) {
          // Filtrar por projectId si se especifica
          const filtered = projectId ? data.filter((t) => t.projectId === Number(projectId)) : data
          setTasks(filtered)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar tareas')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [reloadKey, projectId])

  async function handleDelete(id: number) {
    try {
      await deleteTask(id)
      refetch()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al borrar tarea')
    }
  }

  async function handleStatusChange(id: number, newStatus: string) {
    try {
      await updateTaskStatus(id, newStatus)
      refetch()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al cambiar estado')
    }
  }

  return { tasks, loading, error, refetch, handleDelete, handleStatusChange }
}