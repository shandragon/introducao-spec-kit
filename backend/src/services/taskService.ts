import prisma from '@lib/prisma';

export const createTask = async (data: { title: string; date: Date; parentId?: string }) => {
  return await prisma.task.create({
    data,
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
