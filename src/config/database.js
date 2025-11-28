import mongoose from "mongoose";

export const DBStart = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1); 
  }
};