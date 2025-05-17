import prisma from "../../prismaDB.js"

export async function deleteDefinitiveTask(req, res) {
  const taskId = req.params.id

  if (!taskId) return res.status(404).json({ error: 'Tarefa não encontrada.' })

  try {

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' })
    if (task.userId !== req.userId) return res.status(403).json({ error: 'Você não tem permissão para excluír essa tarefa.' })

    const delTask = await prisma.task.delete({
      where: { id: taskId }
    })

    res.status(200).json({
      message: 'Tarefa excluída com sucesso.',
      task: delTask
    })

  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Erro no servidor. Tente novamente.' })
  }
}