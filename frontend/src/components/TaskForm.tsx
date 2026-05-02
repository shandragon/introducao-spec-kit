import React, { useState } from 'react';
import { Status } from '@task-organizer/shared';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const utcDate = `${date}T00:00:00.000Z`;
    // Constructing date using local timezone to avoid UTC shift
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDateTime = new Date(year, month - 1, day, hours, minutes);
    
    try {
        await onSubmit({ 
          title, 
          description, 
          date: utcDate, 
          startTime: startDateTime.toISOString(), 
          durationMinutes: duration, 
          status 
        } as any);
        onClose();
    } catch (err: any) {
        if (err.message === 'CONFLITO') {
            alert('Conflito de horário detectado! Por favor, escolha outro horário.');
        } else {
            alert('Erro ao criar tarefa.');
        }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nova Tarefa</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="Ex: Lavar o carro"
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
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
}

export default TaskForm;
