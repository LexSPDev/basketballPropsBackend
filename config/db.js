import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // La variable MONGODB_URI debe estar definida en el dashboard de Vercel.
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // AJUSTE CRÍTICO: Desactivar 'retryWrites' evita timeouts en Vercel causados por 
      // problemas de resolución de la cadena SRV (mongodb+srv://).
      retryWrites: false, 
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: Failed to connect to DB - ${error.message}`);
    // Lanzamos el error para que sea capturado en el middleware de 'api/index.js'
    throw new Error(`DB Connection Failed: ${error.message}`); 
  }
};