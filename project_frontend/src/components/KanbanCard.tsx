import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Task {
  id: string;
  title: string;
  // otras propiedades
}

interface KanbanCardProps {
  task: Task;
  index: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            backgroundColor: '#fff',
            margin: '0 0 8px 0',
            padding: '8px',
            borderRadius: '4px',
            ...provided.draggableProps.style
          }}
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
