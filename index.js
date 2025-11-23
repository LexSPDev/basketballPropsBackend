import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importamos CORS
import gameRoutes from './route/game.route.js'; // Debe ser un Router de Express
import playerRoutes from './route/player.route.js'; // Debe ser un Router de Express
import { connectDB } from './config/db.js';

// --- 1. Inicialización de Entorno y Conexión de DB ---

dotenv.config();

// Creamos la instancia de la aplicación
const app = express();

// --- 2. Middlewares ---

// Habilitar CORS para permitir solicitudes desde el frontend
// Puedes configurar cors con opciones específicas para producción
app.use(cors()); 

app.use(express.json()); // Permite a la app parsear JSON en el cuerpo de la solicitud

// --- 3. Definición de Rutas (Usando app.use) ---

// Ruta raíz (para evitar el "Cannot GET /" y servir como check de salud)
app.get('/', (req, res) => {
    // Usamos el código 200 para indicar éxito y devolvemos un JSON informativo.
    res.status(200).json({ 
        status: "ok", 
        message: "API está operativa y lista. Usa /api/games o /api/players para acceder a los datos." 
    });
});

// Adjunta los Routers.
// La URL final para estos endpoints será: [Dominio]/api/games y [Dominio]/api/players
app.use('/', gameRoutes);
//app.use('/api/players', playerRoutes);

// --- 4. Conexión de DB y Exportación del Handler (El enfoque Serverless) ---

// Función asíncrona para asegurar la conexión antes de exponer el handler.
async function initialize() {
    try {
        await connectDB();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
}

// Llamamos a la inicialización
initialize(); 

// Exportar la aplicación como un handler de Vercel
export default app;