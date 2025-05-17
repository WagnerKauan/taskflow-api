import prisma from "../../prismaDB.js"

export default async function getProfile(req,res){

  const userId = req.params.id
  if(!userId) return res.status(400).json({error: 'ID do usuário não fornecido.'})
  
  try {

    const user = await prisma.user.findUnique({
      where: {id: userId}
    })

    if(!user) return res.status(404).json({error: 'Usuário não encontrado.'})
      
      const { password, ...userWithoutPassword } = user

    res.status(200).json({user: userWithoutPassword})
  }catch(e){
    console.log(e)
    res.status(500).json({error: 'Erro no servidor. Tente novamente.'})
  }

}