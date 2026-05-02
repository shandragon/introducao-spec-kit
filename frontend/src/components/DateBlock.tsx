import React, { useState } from 'react';
import { Task } from '@task-organizer/shared';
import { ChronologicalGroup } from '../services/taskService';

interface DateBlockProps {
  label: string;
  tasks: Task[];
  children?: React.ReactNode;
}

export const DateBlock: React.FC<DateBlockProps> = ({ label, tasks, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="date-block">
      <div className="date-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
        <h3>{label}</h3>
        <span className="task-count">({tasks.length} tarefas)</span>
      </div>
      {isExpanded && <div className="date-content">{children}</div>}
    </div>
  );
};
