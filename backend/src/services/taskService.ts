import prisma from '@lib/prisma';

export const createTask = async (userId: string, data: { title: string; description?: string; date: Date; startTime?: Date; durationMinutes?: number; parentId?: string }) => {
  const startTime = data.startTime || new Date(data.date.setHours(9, 0, 0, 0));
  const durationMinutes = data.durationMinutes || 60;

  // Validate overlaps only for the same user
  const existingTasks = await prisma.task.findMany({
    where: {
      userId,
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
      userId,
      startTime,
      durationMinutes
    },
  });
};

export const listTasks = async (userId: string) => {
  return await prisma.task.findMany({
    where: { userId }
  });
};

export const updateTaskDate = async (userId: string, id: string, newDate: Date) => {
  const task = await prisma.task.findUnique({ 
    where: { id, userId } 
  });
  if (!task) throw new Error('Task not found');

  const diff = newDate.getTime() - task.date.getTime();
  
  const updatedTask = await prisma.task.update({
    where: { id, userId },
    data: { date: newDate },
  });

  // Recursive displacement for children
  const children = await prisma.task.findMany({ 
    where: { parentId: id, userId } 
  });
  for (const child of children) {
    const childNewDate = new Date(child.date.getTime() + diff);
    await updateTaskDate(userId, child.id, childNewDate);
  }

  return updatedTask;
};

export const updateTaskStatus = async (userId: string, id: string, status: any) => {
  const task = await prisma.task.findUnique({ where: { id, userId } });
  if (!task) throw new Error('Task not found');

  return await prisma.task.update({
    where: { id, userId },
    data: { status },
  });
};

export const updateTask = async (userId: string, id: string, data: { title?: string; description?: string }) => {
  const task = await prisma.task.findUnique({ where: { id, userId } });
  if (!task) throw new Error('Task not found');

  return await prisma.task.update({
    where: { id, userId },
    data,
  });
};

export const deleteTask = async (userId: string, id: string) => {
  const task = await prisma.task.findUnique({ where: { id, userId } });
  if (!task) throw new Error('Task not found');

  return await prisma.task.delete({
    where: { id, userId },
  });
};
