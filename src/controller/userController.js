// userController.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {
  sendOk,
  error404,
  badRequest,
  internalError,
  sendOk204
} = require ('../helpers/http.js');
const { generateToken, isValidToken } = require ('../middlewares/jwtHandler.js');


const getAllUser = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      return error404(res, 'No hay usuarios registrados');
    } else {
      return sendOk(res, `${users.length} Usuarios Encontrados`, users);
    }
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  // Función para crear un usuario
};

async function loginUser(req, res, next) {
  const { user_name, email, profile_image, role_id } = req.body;
  try {
    let getUser = await prisma.user.findUnique({ where: { email } });

    if (!getUser) {
      const getInvitation = await prisma.invitated.findUnique({ where: { email } });
      const role = getInvitation ? 4 : 2;
      getUser = await prisma.user.create({
        data: {
          user_name, email, profile_image, role_id: role
        }
      });
    }

    const token = await generateToken(getUser.user_name, getUser.id, getUser.role_id, email);
    getUser.token = token;
    // Respuesta exitosa
    return sendOk(res, 'Inicio de sesión exitoso', getUser);
  } catch (error) {
    // Manejo de errores
    next(error);
  }
}

module.exports = {
  getAllUser,
  createUser,
  loginUser
}
