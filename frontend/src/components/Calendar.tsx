import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Task } from '../../../shared/types';

interface CalendarProps {
  tasks: Task[];
  onTaskDrop: (id: string, newDate: string) => void;
  onDateClick: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ tasks, onTaskDrop, onDateClick }) => {
  const events = tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.date,
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
    />
  );
};

export default Calendar;
