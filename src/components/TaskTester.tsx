import { useState } from 'react';
import { getTasks, createTask } from '../services/taskService';
import type { Task, NewTask } from '../types';

export function TaskTester() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Probar GET /tasks
  const handleGetTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener las tareas');
    } finally {
      setLoading(false);
    }
  };

  // 2. Probar POST /projects/{projectId}/tasks (Asegúrate de poner un projectId válido de tu API)
  const handleCreateTask = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const dummyTask: NewTask = {
        title: 'Tarea de prueba desde React',
        description: 'Probando el endpoint de creación de tareas',
        status: 'TODO'
      };

      // Cambia '1' por el ID de un proyecto real que exista en tu base de datos
      const projectId = 1; 
      
      await createTask(projectId, dummyTask);
      
      // Recargamos la lista para ver el cambio
      await handleGetTasks();
    } catch (err: any) {
      setError(err.message || 'Error al crear la tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Panel de Pruebas de Tareas (CRUD)</h2>

      <div style={{ marginBottom: '15px' }}>
        <button onClick={handleGetTasks} style={{ marginRight: '10px', padding: '8px 15px' }}>
          Probar GET /tasks
        </button>
        <button onClick={handleCreateTask} style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          Probar POST (Crear Tarea)
        </button>
      </div>

      {loading && <p>Cargando peticiones...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h3>Resultados ({tasks.length} tareas encontradas):</h3>
      <pre style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px', maxHeight: '300px', overflowY: 'auto' }}>
        {JSON.stringify(tasks, null, 2)}
      </pre>
    </div>
  );
}