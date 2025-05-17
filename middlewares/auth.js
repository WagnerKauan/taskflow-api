import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export function authMiddleware(req,res,next){
    const token = req.headers.authorization

    if(!token) return res.status(401).json({error: 'Acesso negado.'})
    
    try{

        const decoded = jwt.verify(token.replace('Bearer ',''), JWT_SECRET)
        req.userId = decoded.id
        req.userName = decoded.name
        next()
        
    }catch(e){
        console.log(e)
        return res.status(401).json({error: 'token inválido.'})
    }
}