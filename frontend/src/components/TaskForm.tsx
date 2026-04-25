import React, { useState } from 'react';
import { Status } from '../../../shared/types';

const statusOptions: Status[] = ['PENDENTE', 'EM_PLANEJAMENTO', 'EM_EXECUCAO', 'CONCLUIDA'];

interface TaskFormProps {
  initialDate?: string;
  onClose: () => void;
  onSubmit: (task: { title: string; description: string; date: string; status: Status }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialDate, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState(60);
  const [status, setStatus] = useState<Status>('PENDENTE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const utcDate = `${date}T00:00:00.000Z`;
    const startDateTime = new Date(`${date}T${startTime}:00Z`);
    onSubmit({ 
      title, 
      description, 
      date: utcDate, 
      startTime: startDateTime.toISOString(), 
      durationMinutes: duration, 
      status 
    } as any);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nova Tarefa</h2>
        <form onSubmit={handleSubmit}>
          {/* ... inputs existentes ... */}
          <div className="form-group">
            <label>Horário de Início</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Duração (minutos)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} required />
          </div>
          <div className="form-actions">
            <button type="button" className="secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="primary">Criar Tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );


export default TaskForm;
