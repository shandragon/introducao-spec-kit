import React from 'react';
import { Task } from '../../../shared/types';

interface TreeViewProps {
  tasks: Task[];
}

const TreeNode: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <div>{task.title} ({task.status})</div>
      {task.children && task.children.map(child => (
        <TreeNode key={child.id} task={child} />
      ))}
    </div>
  );
};

const TreeView: React.FC<TreeViewProps> = ({ tasks }) => {
  // Simple logic to build tree from flat list if needed, 
  // but assuming backend might return nested or we filter here.
  const rootTasks = tasks.filter(t => !t.parentId);
  
  const buildTree = (task: Task, allTasks: Task[]): Task => {
    return {
      ...task,
      children: allTasks.filter(t => t.parentId === task.id).map(t => buildTree(t, allTasks))
    };
  };

  const tree = rootTasks.map(t => buildTree(t, tasks));

  return (
    <div>
      {tree.map(task => (
        <TreeNode key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TreeView;
