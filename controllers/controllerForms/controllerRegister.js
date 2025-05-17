import { schemaRegister } from "../../schemas/schemaRegister.js"
import prisma from "../../prismaDB.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function register(req,res){
    const {error,value} = schemaRegister.validate(req.body)
    
        
    if(error) return res.status(400).json({erro: error.details[0].message})
    
    const {name,email,password} = value
    
    try{
        const existingUser = await prisma.user.findUnique({
            where: {email},
        })

        if(existingUser) return res.status(409).json({error: 'Email já está em uso'})

        const hashedPassword = await bcrypt.hash(password,10)
        
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            }
        })

        const token = jwt.sign(
            {id: user.id, name: user.name},
            process.env.JWT_SECRET,
            {expiresIn: '7d'})
    
        
        res.status(201).json({
            message: 'Usuário registrado com sucesso.',
            user: user,
            token: token,
        })

    }catch(e){
        console.log(e)
        res.status(500).json({error: 'Erro no servidor. Tente novamente.'})
    }

}