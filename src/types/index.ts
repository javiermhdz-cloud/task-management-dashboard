export interface Task {
  id?: string | number;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  projectId: string | number;
  assignedTo?: string;
}

export interface Project {
  id: string | number;
  name: string;
  description?: string;
}

export interface NewProject {
  name: string
  description?: string
}

export const TOKEN_KEY = 'jwt-auth-demo-token'