const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Agrega el usuario decodificado a la solicitud
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
  };
  
  module.exports = verifyToken;
  