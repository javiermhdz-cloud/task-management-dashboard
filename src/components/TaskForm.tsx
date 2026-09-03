import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface TaskFormProps {
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  priority: string
  setPriority: (value: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  submitting,
  error,
  valid,
  handleSubmit,
}: TaskFormProps) {
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Crear nueva tarea en este proyecto</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        helperText="Mínimo 3 caracteres"
      />
      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />
      <TextField
        select
        label="Prioridad"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
      >
        <MenuItem value="LOW">Baja</MenuItem>
        <MenuItem value="MEDIUM">Media</MenuItem>
        <MenuItem value="HIGH">Alta</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" disabled={!valid || submitting}>
        {submitting ? 'Creando…' : 'Crear tarea'}
      </Button>
    </Stack>
  )
}