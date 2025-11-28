import { validateToken } from "../helpers/jwt.js"; // Asegúrate que el nombre del archivo coincida

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No autenticado: Falta token" });
    }
    const decoded = validateToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "No autenticado: Token inválido o expirado" });
    }
    req.user = decoded; 
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};