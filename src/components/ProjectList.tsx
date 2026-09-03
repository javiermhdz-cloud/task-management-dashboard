import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { ApiErrorAlert } from './ApiErrorAlert'
import type { Project } from '../types'

interface ProjectListProps {
  projects: Project[]
  loading: boolean
  error: string | null
}

export function ProjectList({ projects, loading, error }: ProjectListProps) {
  const navigate = useNavigate()

  if (loading) {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress />
      </Stack>
    )
  }

  if (error) {
    return <ApiErrorAlert message={error} />
  }

  if (projects.length === 0) {
    return <Typography color="text.secondary">No hay proyectos registrados.</Typography>
  }

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Proyectos ({projects.length})
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id} divider disablePadding>
            <ListItemButton onClick={() => navigate(`/projects/${project.id}`)}>
              <ListItemText
                primary={project.name}
                secondary={project.description || `ID Proyecto: ${project.id}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}