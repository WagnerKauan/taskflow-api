import { Router } from "express";
import { getTasks } from "./controllers/controllersTasks/controllerGetTasks.js";
import { setTasks } from "./controllers/controllersTasks/controllerSetTasks.js";
import { register } from "./controllers/controllerForms/controllerRegister.js";
import { login } from "./controllers/controllerForms/controllerLogin.js";
import { editTask } from "./controllers/controllersTasks/controllerEditTask.js";
import { softDeleteTask } from "./controllers/controllersTasks/controllerDeleteTask.js";
import { authMiddleware } from "./middlewares/auth.js";
import editProfile from './controllers/controllerProfile/editProfile.js'
import getProfile from "./controllers/controllerProfile/getProfile.js";
import { getDeletedTasks } from "./controllers/controllersTasks/getDeletedTasks.js";
import { restoreTask } from "./controllers/controllersTasks/restoreTask.js";
import { deleteDefinitiveTask } from "./controllers/controllersTasks/deleteDefinitiveTask.js";
const route = Router()

route.get('/', (req,res) => {
    res.send('Hellow World!!')
})

//rota de registro
route.post('/registrar',register)

//rota de login
route.post('/login',login)

//Rotas de perfil
route.get('/profile/:id',authMiddleware,getProfile)
route.put('/profile/:id',authMiddleware,editProfile)

//rota de tarefas
route.get('/tarefas',authMiddleware,getTasks)
route.get('/tarefas-deletadas',authMiddleware,getDeletedTasks) 
route.post('/tarefas',authMiddleware,setTasks)
route.put('/tarefas/:id',authMiddleware,editTask)
route.patch('/tarefas/soft-delete/:id',authMiddleware,softDeleteTask)
route.patch('/tarefas/restaurar/:id',authMiddleware,restoreTask)
route.delete('/tarefas/deletar/:id',authMiddleware, deleteDefinitiveTask) 



export default route