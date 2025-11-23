import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
// Rutas corregidas usando '../' para salir de la carpeta 'api'
import gameRoutes from '../route/game.route.js'; 
import playerRoutes from '../route/player.route.js'; 
import { connectDB } from '../config/db.js';

// NOTA: dotenv.config() es solo para desarrollo local. En Vercel, las variables
// se inyectan automáticamente.
dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

// Variable para rastrear el estado de la conexión a la base de datos
let isDbConnected = false; 

// --- 1. Middleware de Conexión Dinámica (CRÍTICO para Serverless) ---
// Este middleware se ejecuta en CADA solicitud. Si la DB no está conectada, 
// intenta conectarse ANTES de pasar la solicitud a las rutas, garantizando
// que las variables de entorno están listas.
app.use(async (req, res, next) => {
    // Si la conexión ya está establecida, simplemente pasa al siguiente middleware/ruta
    if (isDbConnected) {
        return next();
    }
    
    try {
        await connectDB();
        isDbConnected = true; // Marcar como conectado exitosamente
        next(); // Pasar a las rutas
    } catch (error) {
        // Capturar el error de conexión (incluyendo el "undefined" de la URI o el timeout)
        console.error("Critical DB Connection Failure during request:", error.message);
        res.status(503).json({ 
            status: "error", 
            message: "Service Unavailable: Database connection failed.",
            details: error.message
        });
    }
});


// --- 2. Definición de Rutas (Ahora protegidas por el Middleware de conexión) ---

// Ruta de "Health Check"
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        message: "API está operativa. Usa /api/games o /api/players." 
    });
});

// Adjunta los Routers. La URL final será /api/games y /api/players
app.use('/api/games', gameRoutes);
app.use('/api/players', playerRoutes);


// --- 3. Exportación del Handler ---
export default app;