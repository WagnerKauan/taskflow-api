import { schemaLogin } from "../../schemas/schemaLogin.js"
import prisma from "../../prismaDB.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function login(req,res) {
    const {error,value} = schemaLogin.validate(req.body)

    if(error) return res.status(400).json({error: error.details[0].message})
    
    const {email,password} = value

    try{
        const user = await prisma.user.findUnique({
            where: {email},
        })

        if(!user) return res.status(400).json({error: 'Usuário não encontrado.'})

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid) return res.status(401).json({error: 'Senha inválida.'})
        
    
        const token = jwt.sign(
            {id: user.id, name: user.name},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.status(200).json({
            message: "Login feito com sucesso.",
            token
        })
    }catch(e){
        console.log(e)
        res.status(401).json({error: 'Erro ao tentar logar. Tente novamente.'})
    }
}