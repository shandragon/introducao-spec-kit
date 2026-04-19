import React from 'react';
import { Task, Status } from '../../../shared/types';

interface TaskDetailProps {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onStatusChange }) => {
  const statuses: Status[] = ['PENDENTE', 'EM_PLANEJAMENTO', 'EM_EXECUCAO', 'CONCLUIDA'];

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div>
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
