import prisma from "../../prismaDB.js"

export async function getDeletedTasks(req, res) {
  try {
    const deletedTasks = await prisma.task.findMany({
      where: {
        userId: req.userId,
        isDelete: true
      },
      orderBy: { deletedAt: 'desc' }
    })

    res.json({
      tasks: deletedTasks,
      userName: req.userName,
      userId: req.userId
    })
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar tarefas deletadas.' })
    console.log(e)
  }
}
