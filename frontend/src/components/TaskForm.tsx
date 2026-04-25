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
  const [status, setStatus] = useState<Status>('PENDENTE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    // Append T00:00:00Z to ensure the backend creates the date at UTC midnight,
    // avoiding timezone shifts when retrieving it later.
    const utcDate = `${date}T00:00:00.000Z`;
    onSubmit({ title, description, date: utcDate, status });
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
            <label>Data</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="primary">Criar Tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
