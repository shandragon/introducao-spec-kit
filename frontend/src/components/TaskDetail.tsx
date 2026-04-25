import React, { useState } from 'react';
import { Task, Status } from '../../../shared/types';

interface TaskDetailProps {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, details: { title: string; description?: string }) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onStatusChange, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
    const [startTime, setStartTime] = useState(new Date(task.startTime).toISOString().substring(11, 16));
    const [duration, setDuration] = useState(task.durationMinutes);

  const statuses: Status[] = ['PENDENTE', 'EM_PLANEJAMENTO', 'EM_EXECUCAO', 'CONCLUIDA'];

  const handleSave = () => {
    onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <div className="task-detail">
      {isEditing ? (
        <div className="modal-body">
          <div className="form-group">
            <label>Título</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Horário de Início</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Duração (minutos)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} required />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value as Status)}>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button className="secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
            <button className="primary" onClick={handleSave}>Salvar</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>{task.title}</h2>
          <p><strong>Data:</strong> {new Date(task.date).toLocaleDateString('pt-BR')}</p>
          <p><strong>Início:</strong> {task.startTime ? new Date(task.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}) : 'Não definido'}</p>
          <p><strong>Duração:</strong> {task.durationMinutes} minutos</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Descrição:</strong> {task.description}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button className="danger" onClick={() => onDelete(task.id)}>Excluir</button>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
