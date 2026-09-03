import { TaskList } from './components/TaskList';

function App() {
  return (
    <div>
      <header style={{ textAlign: 'center', padding: '15px', background: '#282c34', color: 'white' }}>
        <h1>Gestor de Proyectos y Tareas</h1>
      </header>
      <main>
        <TaskList />
      </main>
    </div>
  );
}

export default App;