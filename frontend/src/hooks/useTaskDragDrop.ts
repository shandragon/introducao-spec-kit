import { useCallback } from 'react';
import { updateTaskDate } from '../services/taskService';

export const useTaskDragDrop = (onSuccess: () => void) => {
  const handleTaskDrop = useCallback(async (id: string, newDate: string) => {
    try {
      await updateTaskDate(id, newDate);
      onSuccess();
    } catch (error) {
      console.error('Failed to update task date:', error);
    }
  }, [onSuccess]);

  return { handleTaskDrop };
};
