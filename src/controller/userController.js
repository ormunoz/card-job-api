// userController.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { sendOk, error404, badRequest, internalError, sendOk204 } = require('../helpers/http.js')
const { generateToken, isValidToken } = require('../middlewares/jwtHandler.js')

const getAllUser = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany()
    if (users.length === 0) {
      return error404(res, 'No hay usuarios registrados')
    } else {
      return sendOk(res, `${users.length} Usuarios Encontrados`, users)
    }
  } catch (error) {
    next(error)
  }
}

const createInvitation = async (req, res, next) => {
  try {
    const { email, user_create } = req.body
    let getInvitated = await prisma.invitated.findUnique({ where: { email } })
    if (getInvitated) {
      return badRequest(res, 'Este usuario ya tiene una invitacion', getUser)
    } else {
      createInvited = await prisma.invitated.create({ data: { email, user_create } })
      return sendOk(res, 'Invitacicon realizada con exito', createInvited)
    }
  } catch (error) {
    next(error)
  }
}

async function loginUser(req, res, next) {
  try {
    const { user_name, email, profile_image } = req.body
    let getUser = await prisma.user.findUnique({ where: { email } })

    if (!getUser) {
      const getInvitation = await prisma.invitated.findUnique({ where: { email } })
      const role = getInvitation ? 4 : 2
      getUser = await prisma.user.create({
        data: {
          user_name,
          email,
          profile_image,
          role_id: role
        }
      })
    }

    const token = await generateToken(getUser.user_name, getUser.id, getUser.role_id, email)
    getUser.token = token
    // Respuesta exitosa
    return sendOk(res, 'Inicio de sesión exitoso', getUser)
  } catch (error) {
    // Manejo de errores
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    await checkUserList(id)
    await prisma.user.delete({ where: { id } })
    return sendOk(res, 'Usuario eliminado correctamente', checkUser)
  } catch (error) {
    next(error)
  }
}

const changeUserRole = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const { newRole } = req.body
    await checkUserList(id)
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role_id: newRole }
    })

    res.json({ message: `Rol de usuario actualizado correctamente: ${updatedUser.id}` })
  } catch (error) {
    next(error)
  }
}

const checkUserList = async (id) => {
  const checkUser = await prisma.user.findUnique({ where: { id } })
  if (!checkUser) {
    throw new Error('Usuario no encontrado. Intenta con otra ID.')
  }
}

module.exports = {
  getAllUser,
  createInvitation,
  loginUser,
  deleteUser,
  changeUserRole,
  createInvitation
}
