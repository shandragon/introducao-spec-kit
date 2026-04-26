import React from 'react';
import { Task } from '../../../shared/types';
import { ChronologicalGroup } from '../services/taskService';

interface ChronologicalTreeViewProps {
  groups: ChronologicalGroup[];
  onTaskClick: (task: Task) => void;
}

export const ChronologicalTreeView: React.FC<ChronologicalTreeViewProps> = ({ groups, onTaskClick }) => {
  return (
    <div className="chronological-tree">
      {groups.map((monthGroup, idx) => (
        <div key={idx} className="month-group">
          <h2 className="month-label">{monthGroup.label}</h2>
          <div className="month-content">
            {monthGroup.subGroups.map((dayGroup, dayIdx) => (
              <div key={dayIdx} className="day-group">
                <h3 className="day-label">{dayGroup.label}</h3>
                <div className="day-content">
                  {dayGroup.tasks.map(task => (
                    <TaskItem key={task.id} task={task} onTaskClick={onTaskClick} />
                  ))}
                </div>
              </div>
            ))}
            {monthGroup.label === 'Sem Data' && monthGroup.tasks.map(task => (
              <TaskItem key={task.id} task={task} onTaskClick={onTaskClick} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const TaskItem: React.FC<{ task: Task; onTaskClick: (task: Task) => void }> = ({ task, onTaskClick }) => {
  return (
    <div className="task-item-container">
      <div className="task-item" onClick={() => onTaskClick(task)}>
        <span className={`status-dot ${task.status.toLowerCase()}`}></span>
        <span className="task-title">{task.title}</span>
        <span className="task-time">{new Date(task.startTime).toLocaleDateString('pt-BR')}</span>
      </div>
      {task.children && task.children.length > 0 && (
        <div className="task-children">
          {task.children.map(child => (
            <TaskItem key={child.id} task={child} onTaskClick={onTaskClick} />
          ))}
        </div>
      )}
    </div>
  );
};
