import prisma from "./prismaDB";


async function ping(req, res) {

  try {
    await prisma.user.findFirst()
    res.status(200).send('pong')
  }catch(err) {
    console.error('Erro no ping', err)
    res.status(500).send('pong com erro')
  }
}


export default ping