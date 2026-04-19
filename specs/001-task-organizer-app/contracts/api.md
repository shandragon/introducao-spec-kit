# API Contracts: Task Organizer App

## Base URL
`/api/v1`

## Tasks Endpoints

### 1. List Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Query Params**:
  - `view`: [calendar, tree, list]
  - `date_start`: ISO Date (Optional)
  - `date_end`: ISO Date (Optional)
- **Response**: `200 OK`
  ```json
  [
    {
      "id": "uuid",
      "title": "Task 1",
      "date": "2026-04-19",
      "status": "PENDENTE",
      "parentId": null,
      "children": []
    }
  ]
  ```

### 2. Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "New Task",
    "date": "2026-04-20",
    "parentId": "uuid"
  }
  ```
- **Response**: `201 Created`

### 3. Update Task (Reagendamento/Status)
- **URL**: `/tasks/:id`
- **Method**: `PATCH`
- **Body**:
  ```json
  {
    "date": "2026-04-21",
    "status": "CONCLUIDA"
  }
  ```
- **Response**: `200 OK`
- **Note**: Se a data for alterada, o sistema aplicará o **deslocamento relativo** a todas as sub-tarefas vinculadas.

### 4. Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Response**: `204 No Content`
