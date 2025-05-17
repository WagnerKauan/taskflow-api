import { schemaTask } from "../../schemas/schemaTask.js"
import prisma from '../../prismaDB.js'

export async function setTasks(req,res) {
    const {error,value} = schemaTask.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})
    
    const {title,description,status} = value
        
    try{
        const taskDB = await prisma.task.create({
            data: {
                title,
                description,
                status,
                userId: req.userId
            }
        })
        
        res.status(201).json({
            message: 'Tarefa criada com sucesso.',
            task: taskDB
        })

    }catch(e){
        console.log(e)
        res.status(500).json({error: 'Erro no servidor. Tente novamente.'})
    }
}