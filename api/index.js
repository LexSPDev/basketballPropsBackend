import express from 'express';
import dotenv from 'dotenv';
import gameRoutes from './route/game.route.js';
import playerRoutes from './route/player.route.js';
import { connectDB } from './config/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.get('/api/games', gameRoutes);
app.get('/api/players', playerRoutes);

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
})