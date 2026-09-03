import { useEffect, useState } from 'react';
import { getApiErrorMessage } from '../services/httpClient';
import { getTasks } from '../services/taskService';
import type { Task } from '../types';

interface TaskListProps {
  tasks?: Task[];
  loading?: boolean;
  error?: string | null;
  onDelete?: (id: number) => Promise<void>;
  onStatusChange?: (id: number, newStatus: string) => Promise<void>;
}

export function TaskList({ 
  tasks: propTasks, 
  loading: propLoading, 
  error: propError, 
  onDelete, 
  onStatusChange 
}: TaskListProps) {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(true);
  const [localError, setLocalError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLocalLoading(true);
      setLocalError(null);
      const data = await getTasks(); 
      setLocalTasks(data);
    } catch (err: unknown) {
      setLocalError(getApiErrorMessage(err));
    } finally {
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    if (!propTasks) {
      fetchTasks();
    }
  }, [propTasks]);

  const tasks = propTasks !== undefined ? propTasks : localTasks;
  const loading = propLoading !== undefined ? propLoading : localLoading;
  const error = propError !== undefined ? propError : localError;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Lista de Tareas</h2>
      
      {!propTasks && (
        <button 
          onClick={fetchTasks} 
          style={{ padding: '8px 15px', marginBottom: '15px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Recargar Tareas
        </button>
      )}

      {loading && <p>Cargando tareas desde el servidor...</p>}
      {error && (
        <pre style={{ color: '#b91c1c', whiteSpace: 'pre-wrap', fontSize: 13, background: '#fef2f2', padding: 12, borderRadius: 8 }}>
          {error}
        </pre>
      )}

      {!loading && !error && tasks.length === 0 && (
        <p style={{ fontStyle: 'italic', color: '#666' }}>No hay tareas registradas en este momento.</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => {
          const taskId = Number(task.id);
          return (
            <li 
              key={task.id} 
              style={{ 
                background: '#f9f9f9', 
                border: '1px solid #ddd', 
                padding: '15px', 
                marginBottom: '10px', 
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{task.title}</h3>
                <p style={{ margin: '0 0 10px 0', color: '#666' }}>{task.description || 'Sin descripción'}</p>
                <div style={{ fontSize: '0.85rem', display: 'flex', gap: '15px' }}>
                  <span><strong>Estado:</strong> {task.status}</span>
                  <span><strong>ID Proyecto:</strong> {task.projectId}</span>
                </div>
              </div>

              {(onDelete || onStatusChange) && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {onStatusChange && (
                    <button 
                      onClick={() => onStatusChange(taskId, task.status === 'DONE' ? 'TODO' : 'DONE')}
                      style={{ padding: '6px 10px', cursor: 'pointer' }}
                    >
                      Cambiar Estado
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(taskId)}
                      style={{ padding: '6px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}