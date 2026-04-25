import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Task } from '../../../shared/types';

interface CalendarProps {
  tasks: Task[];
  onTaskDrop: (id: string, newDate: string) => void;
  onDateClick: (date: string) => void;
  onTaskClick: (task: Task) => void;
}

const Calendar: React.FC<CalendarProps> = ({ tasks, onTaskDrop, onDateClick, onTaskClick }) => {
  const events = tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.startTime || task.date, // Usa startTime se disponível
    end: task.startTime 
      ? new Date(new Date(task.startTime).getTime() + task.durationMinutes * 60000).toISOString()
      : undefined,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      editable={true}
      eventDrop={(info) => {
        onTaskDrop(info.event.id, info.event.startStr);
      }}
      dateClick={(info) => {
        onDateClick(info.dateStr);
      }}
      eventClick={(info) => {
        const task = tasks.find(t => t.id === info.event.id);
        if (task) onTaskClick(task);
      }}
    />
  );
};

export default Calendar;
