import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // La variable ya está corregida a MONGODB_URI (todo mayúsculas).
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // ESTE AJUSTE ES CRUCIAL PARA ENTORNO SERVERLESS Y PROBLEMAS SRV.
      retryWrites: false, 
      // Si usas Mongoose v6+ no necesitas useNewUrlParser/useUnifiedTopology
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: Failed to connect to DB - ${error.message}`);
    // Lanzamos el error para que la ejecución en api/index.js lo capture
    throw new Error(`DB Connection Failed: ${error.message}`); 
  }
};