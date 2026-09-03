import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useTaskForm } from '../hooks/useTaskForm'
import { useTasks } from '../hooks/useTasks'
import { getProjectById } from '../services/projectService'
import type { Project } from '../types'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const projectId = Number(id)
  const navigate = useNavigate()

  const [project, setProject] = useState<Project | null>(null)
  const { tasks, loading, error, refetch, handleDelete, handleStatusChange } = useTasks(projectId)
  const taskForm = useTaskForm({ projectId, onSuccess: refetch })

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((data) => setProject(data))
        .catch(() => setProject(null))
    }
  }, [projectId])

  return (
    <Box maxWidth={720} mx="auto" mt={6} px={2}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
        Volver al Dashboard
      </Button>

      <Typography variant="h4" gutterBottom>
        {project ? project.name : `Proyecto #${projectId}`}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {project?.description || 'Gestión de tareas de la API de Tasks.'}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TaskForm {...taskForm} />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </Paper>
    </Box>
  )
}