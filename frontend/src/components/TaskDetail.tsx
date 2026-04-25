import React, { useState } from 'react';
import { Task, Status } from '../../../shared/types';

interface TaskDetailProps {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, details: { title: string; description?: string }) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onStatusChange, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const statuses: Status[] = ['PENDENTE', 'EM_PLANEJAMENTO', 'EM_EXECUCAO', 'CONCLUIDA'];

  const handleSave = () => {
    onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <div className="task-detail">
      {isEditing ? (
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={handleSave}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button className="danger" onClick={() => onDelete(task.id)}>Excluir</button>
        </div>
      )}
      
      <div className="status-selector">
        <label>Status: </label>
        <select 
          value={task.status} 
          onChange={(e) => onStatusChange(task.id, e.target.value as Status)}
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TaskDetail;
