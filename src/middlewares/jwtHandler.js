const jwt = require ('jsonwebtoken');
const { denegateeAccess, error404, badRequest } = require ('../helpers/http.js');

const generateToken = async (name, id, role, email) => {
  return new Promise((resolve, reject) => {
    const payload = { name, id, role, email };
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      (err, token) => {
        if (err) {
          reject(new Error('El token no pudo ser creado'));
        }
        resolve(token);
      }
    );
  });
};

const isValidToken = (requiredRoles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ ok: false, msg: 'Falta el token' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const hasPermission = requiredRoles.some((role) => decoded.role === role);
    if (!hasPermission) {
      return res.status(403).json({ ok: false, msg: 'Acceso no autorizado' });
    }
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(400).json({ ok: false, msg: 'Token Inválido' });
  }
};

module.exports = {
  generateToken,
  isValidToken
};