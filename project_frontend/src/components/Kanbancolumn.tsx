import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';

interface ColumnProps {
  id: string;
  title: string;
  tasks: Array<{ id: string; title: string; ... }>;
}

const KanbanColumn: React.FC<ColumnProps> = ({ id, title, tasks }) => {
  return (
    <div style={{ margin: '0 8px' }}>
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ backgroundColor: '#f4f5f7', padding: '8px', minHeight: '200px' }}
          >
            {tasks.map((task, index) => (
              <KanbanCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
