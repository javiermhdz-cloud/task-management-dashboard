export interface AuthResponse {
  token: string
}

export interface Project {
  id: number
  name: string
  description?: string
  ownerId: number
  createdAt: string
}

export interface NewProject {
  name: string
  description?: string
}

export interface Task {
  id: number
  title: string
  description: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'PENDING' | 'COMPLETED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  projectId: number
  assigneeId?: number
  dueDate?: string
}

export interface NewTask {
  title: string
  description: string
  status?: string
  priority?: string
  assigneeId?: number
  dueDate?: string
}

export const API_URL =
  import.meta.env.VITE_API_URL || 'https://d3ujwk09smrk9z.cloudfront.net'

export const TOKEN_KEY = 'token';