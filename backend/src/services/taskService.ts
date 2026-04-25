import prisma from '@lib/prisma';

export const createTask = async (data: { title: string; description?: string; date: Date; startTime?: Date; durationMinutes?: number; parentId?: string }) => {
  const startTime = data.startTime || new Date(data.date.setHours(9, 0, 0, 0));
  const durationMinutes = data.durationMinutes || 60;

  // Validate overlaps
  const existingTasks = await prisma.task.findMany({
    where: {
      date: data.date,
    }
  }) || [];

  const newTaskEnd = new Date(startTime.getTime() + durationMinutes * 60000);

  const hasOverlap = existingTasks.some(task => {
    const taskEnd = new Date(task.startTime.getTime() + task.durationMinutes * 60000);
    return startTime < taskEnd && newTaskEnd > task.startTime;
  });

  if (hasOverlap) {
    throw new Error('CONFLITO');
  }

  return await prisma.task.create({
    data: {
      ...data,
      startTime,
      durationMinutes
    },
  });
};

export const listTasks = async () => {
  return await prisma.task.findMany();
};

export const updateTaskDate = async (id: string, newDate: Date) => {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) throw new Error('Task not found');

  const diff = newDate.getTime() - task.date.getTime();
  
  const updatedTask = await prisma.task.update({
    where: { id },
    data: { date: newDate },
  });

  // Recursive displacement for children
  const children = await prisma.task.findMany({ where: { parentId: id } });
  for (const child of children) {
    const childNewDate = new Date(child.date.getTime() + diff);
    await updateTaskDate(child.id, childNewDate);
  }

  return updatedTask;
};

export const updateTaskStatus = async (id: string, status: any) => {
  return await prisma.task.update({
    where: { id },
    data: { status },
  });
};

export const updateTask = async (id: string, data: { title?: string; description?: string }) => {
  return await prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTask = async (id: string) => {
  // Prisma relation cascade in schema would be better, 
  // but we can do it here for explicit control if not defined in schema.
  // Actually, standard practice for hierarchy is cascade on delete.
  return await prisma.task.delete({
    where: { id },
  });
};
