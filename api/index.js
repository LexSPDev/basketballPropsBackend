import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import gameRoutes from '../route/game.route.js'; 
import playerRoutes from '../route/player.route.js'; 
import { connectDB } from '../config/db.js';

// NOTA: dotenv.config() es solo para desarrollo local. En Railway, las variables
// se inyectan automáticamente.
dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

// Variable para rastrear el estado de la conexión a la base de datos
let isDbConnected = false; 

// Middleware de Conexión Dinámica
app.use(async (req, res, next) => {
    if (isDbConnected) {
        return next();
    }
    
    try {
        await connectDB();
        isDbConnected = true; 
        next(); 
    } catch (error) {
        // Captura el fallo de conexión para devolver un 503
        console.error("Critical DB Connection Failure during request:", error.message);
        res.status(503).json({ 
            status: "error", 
            message: "Service Unavailable: Database connection failed. Check Railway logs.",
            details: error.message
        });
    }
});


// Definición de Rutas
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        message: "API está operativa en Railway. Usa /games o /players." 
    });
});

// ¡CORRECCIÓN CRÍTICA! 
// Usamos app.use() para montar el router de Express en la ruta /games
app.use('/games', gameRoutes);
app.use('/players', playerRoutes);


// --- LÓGICA DE INICIO DEL SERVIDOR (CRÍTICA PARA RAILWAY) ---
const PORT = process.env.PORT || 3000;

// Escucha en el puerto asignado por Railway o en el 3000 localmente.
app.listen(PORT, () => {
    // Intentamos conectar la DB en el inicio, pero el middleware lo asegura.
    if (!isDbConnected) {
        connectDB().catch(() => console.log("Intento de conexión inicial fallido, se reintentará en la primera solicitud."));
    }
    console.log(`Server running on port ${PORT}`);
});