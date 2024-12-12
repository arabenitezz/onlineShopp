const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mi_secreto_super_seguro'; // Usa una variable de entorno en producción

const verifyToken = (req, res, next) => {
  const receivedToken = req.query.token || req.headers['authorization'] || req.headers['authorization'].cookie;

  if (!receivedToken) {
    return res.status(401).send('Acceso no autorizado: Token no encontrado');
}

try {
    const decoded = jwt.verify(receivedToken, JWT_SECRET);
    req.user = decoded; // Guarda la info del token
    next(); // Continúa
} catch (error) {
    console.error("Error al verificar token:", error);
    res.status(403).send('Token inválido o expirado');
}
};

module.exports = verifyToken; 