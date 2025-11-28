export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ 
        message: "Acceso denegado: Se requieren permisos de administrador" 
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error al verificar permisos de administrador" });
  }
};
