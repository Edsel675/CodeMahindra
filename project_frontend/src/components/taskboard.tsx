import React, { useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';

const TasksBoard: React.FC = () => {
  // Lógica para obtener las tareas (desde Context o un hook)
  // Ejemplo usando un hook:
  // const { issues, fetchIssues } = useJiraContext();

  useEffect(() => {
    // fetchIssues();
  }, []);

  return (
    <div>
      <h1>Tablero de Tareas</h1>
      <KanbanBoard />
    </div>
  );
};

export default TasksBoard;