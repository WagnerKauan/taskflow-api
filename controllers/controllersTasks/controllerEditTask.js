import { schemaEditTask } from "../../schemas/schemaEditTask.js"
import prisma from '../../prismaDB.js'

export async function editTask(req,res) {
    const taskId = req.params.id
    if(!taskId) return res.status(404).json({message: 'Tarefa não encontrada.'})

    const {error,value} = schemaEditTask.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})

    const {title,description,status} = value

    try{

        const task = await prisma.task.findUnique({
            where: {id: taskId}
        })

        if(!task) return res.status(404).json({error: 'Tarefa não encontrada.'})
        if(task.userId !== req.userId) return res.status(403).json({error: 'Você não tem permissão para editar essa tarefa.'})

        const updateTask = await prisma.task.update({
            where: {id: taskId},
            
            data: {
                title,
                description,
                status,
            }
        })
        
        res.status(200).json({
                message: 'Tarefa atualizada com sucesso.',
                task: updateTask
            }
            
        )

    }catch(e){
        console.log(e)
        res.status(500).json({error: 'Erro no servidor. Tente novamente.'})
    }


}