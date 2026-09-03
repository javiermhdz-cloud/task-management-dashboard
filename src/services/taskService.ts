import { httpClient } from './httpClient' // Ajusta la ruta si tu httpClient está en otra carpeta
import type { NewTask, Task } from '../types' // Ajusta la ruta a tus types

export async function getTasks(): Promise<Task[]> {
  const { data } = await httpClient.get<Task[]>('/tasks')
  return data
}

export async function getTaskById(id: number): Promise<Task> {
  const { data } = await httpClient.get<Task>(`/tasks/${id}`)
  return data
}

export async function createTask(projectId: number, body: NewTask): Promise<Task> {
  const { data } = await httpClient.post<Task>(`/projects/${projectId}/tasks`, body)
  return data
}

export async function updateTask(id: number, body: NewTask): Promise<Task> {
  const { data } = await httpClient.put<Task>(`/tasks/${id}`, body)
  return data
}

export async function updateTaskStatus(id: number, status: string): Promise<Task> {
  const { data } = await httpClient.patch<Task>(`/tasks/${id}/status`, { status })
  return data
}

export async function deleteTask(id: number): Promise<void> {
  await httpClient.delete(`/tasks/${id}`)
}