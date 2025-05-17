import prisma from "../../prismaDB.js"

export async function getTasks(req, res) {

    try {

        const tasks = await prisma.task.findMany({
            where: {
              userId: req.userId,
              isDelete: false
            },
            orderBy: { createdAt: 'desc' }
          })
          

        if(tasks.length === 0){
            return res.status(200).json({
                tasks: [],
                userName: req.userName,
                userId: req.userId
            })
        }

        res.json({
            tasks,
            userName: req.userName,
            userId: req.userId
        })

    } catch (e) {
        res.status(500).json({ error: 'Erro ao buscar tarefas.' })
        console.log(e)
    }
}
