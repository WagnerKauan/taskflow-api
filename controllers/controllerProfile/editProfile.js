import prisma from "../../prismaDB.js"
import { schemaEditProfile } from "../../schemas/schemaEditProfile.js"
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import bcrypt from 'bcrypt'

export default async function editProfile(req, res) {

  const { value, error } = schemaEditProfile.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const userId = req.params.id
  if (!userId) return res.status(400).json({ error: 'ID do usuário não fornecido.' })

  const { name, email, oldPassword, newPassword } = value

  let updateData = { name, email }

  try {

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' })

    if (email) {
      const isEmailExist = await prisma.user.findUnique({
        where: { email }
      })

      if (isEmailExist && isEmailExist.id !== userId) {
        return res.status(400).json({ error: 'E-mail já está em uso.' })
      }

      updateData.email = email
    }

    if (oldPassword && newPassword) {
      if (oldPassword === newPassword) return res.status(400).json({ error: 'A nova senha não pode ser igual à antiga.' })
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
      if (!isPasswordValid) return res.status(401).json({ error: 'Senha inválida.' })


      const hashedPassword = await bcrypt.hash(newPassword, 10)
      updateData.password = hashedPassword

    }

    if (!oldPassword && !newPassword){
      if (updateData.name === user.name && updateData.email === user.email) return res.status(400).json({ error: 'Nenhuma informação foi alterada.' })
    }

    const editUser = await prisma.user.update({
      where: { id: userId },

      data: updateData
    })

    const { password, ...userWithoutPassword } = editUser

    // Gerar um novo token JWT com o novo nome
    const token = jwt.sign({ id: user.id, name: updateData.name }, process.env.JWT_SECRET, { expiresIn: '7d' });


    res.status(200).json({
      message: 'Perfil atualizado com sucesso.',
      user: userWithoutPassword,
      token
    })

  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Erro no servidor. Tente novamente.' })
  }
}