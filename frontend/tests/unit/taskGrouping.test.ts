import { describe, it, expect } from 'vitest';
import { groupTasksChronologically } from '../../src/services/taskService';
import { Task } from '../../../../shared/types';

describe('groupTasksChronologically', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1 Jan',
      date: '2026-01-10T00:00:00.000Z',
      startTime: '2026-01-10T10:00:00.000Z',
      status: 'PENDENTE',
      durationMinutes: 60,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '2',
      title: 'Task 2 Jan',
      date: '2026-01-10T00:00:00.000Z',
      startTime: '2026-01-10T11:00:00.000Z',
      status: 'PENDENTE',
      durationMinutes: 60,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '3',
      title: 'Task Feb',
      date: '2026-02-15T00:00:00.000Z',
      startTime: '2026-02-15T09:00:00.000Z',
      status: 'PENDENTE',
      durationMinutes: 60,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '4',
      title: 'No Date Task',
      date: '',
      startTime: '',
      status: 'PENDENTE',
      durationMinutes: 0,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '5',
      title: 'Parent Task',
      date: '2026-01-10T00:00:00.000Z',
      startTime: '2026-01-10T08:00:00.000Z',
      status: 'PENDENTE',
      durationMinutes: 60,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '6',
      title: 'Child Task',
      date: '2026-01-10T00:00:00.000Z',
      startTime: '2026-01-10T08:30:00.000Z',
      status: 'PENDENTE',
      durationMinutes: 30,
      parentId: '5',
      createdAt: '',
      updatedAt: '',
    }
  ];

  it('should group tasks by month and day', () => {
    const groups = groupTasksChronologically(mockTasks);
    console.log('Group Labels:', groups.map(g => g.label));
    console.log('Jan Subgroups:', groups.find(g => g.label.toLowerCase() === 'janeiro')?.subGroups.map(sg => sg.label));
    
    // Check if months are correctly grouped
    const janGroup = groups.find(g => g.label.toLowerCase() === 'janeiro');
    const febGroup = groups.find(g => g.label.toLowerCase() === 'fevereiro');
    
    expect(janGroup).toBeDefined();
    expect(febGroup).toBeDefined();
    
    // Check if days are correctly grouped inside January
    const jan10Group = janGroup?.subGroups.find(sg => sg.label.includes('10'));
    expect(jan10Group).toBeDefined();
    expect(jan10Group?.tasks.length).toBeGreaterThan(0);
  });

  it('should group tasks without date in a "Sem Data" section', () => {
    const groups = groupTasksChronologically(mockTasks);
    const noDateGroup = groups.find(g => g.label === 'Sem Data');
    
    expect(noDateGroup).toBeDefined();
    expect(noDateGroup?.tasks.some(t => t.id === '4')).toBe(true);
  });

  it('should maintain internal hierarchy within the same day', () => {
    const groups = groupTasksChronologically(mockTasks);
    const janGroup = groups.find(g => g.label === 'janeiro');
    const jan10Group = janGroup?.subGroups.find(sg => sg.label.includes('10'));
    
    const parent = jan10Group?.tasks.find(t => t.id === '5');
    expect(parent).toBeDefined();
    expect(parent?.children).toBeDefined();
    expect(parent?.children?.some(t => t.id === '6')).toBe(true);
  });
});
