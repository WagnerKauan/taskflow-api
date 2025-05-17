import prisma from "../../prismaDB.js";

export async function restoreTask(req, res) {
  const taskId =  req.params.id

  if(!taskId) return res.status(404).json({error: 'Tarefa não encontrada.'})
  

  try{
    const task = await prisma.task.findUnique({
      where: {id: taskId}
    })

    if(!task) return res.status(404).json({error: 'Tarefa não encontrada.'})

    if(task.userId !== req.userId){
      return res.status(403).json({error: 'Você não tem permissão para restaurar essa tarefa.'})
    }

    if(!task.isDelete){
      return res.status(400).json({error: 'A tarefa não está deletada.'})
    }

    const updateTask = await prisma.task.update({
      where: {id: taskId},
      data: {isDelete: false}
    })

    res.status(200).json({
      message: 'Tarefa restaurada com sucesso.',
      task: updateTask,
    })
  
  }catch(e){
    console.log(e)
    res.status(500).json({error: 'Erro no servidor. Tente novamente.'})
  }

}