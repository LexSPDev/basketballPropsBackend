import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // CAMBIO CLAVE: Usar MONGODB_URI (todo en mayúsculas) para que coincida con Vercel
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Quitamos process.exit(1) porque esto termina toda la función Serverless.
    // Es mejor que la función falle con un error 500 para que Vercel lo detecte.
    console.error(`Error: Failed to connect to DB - ${error.message}`);
    // No usamos process.exit(1) en Serverless.
    // Si la conexión falla aquí, la ejecución continua al error del router, 
    // lo cual ya está manejado.
    throw new Error(`DB Connection Failed: ${error.message}`); 
  }
};