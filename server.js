import express from 'express';
import dotenv from 'dotenv';
import gameRoutes from './route/game.route.js';
import playerRoutes from './route/player.route.js';
import { connectDB } from './config/db.js';
//import bodyParser from 'body-parser';
//import cors from 'cors';
//import morgan from 'morgan';
//import helmet from 'helmet';
//import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
/*app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));*/

app.use(express.json());
app.get('/api/games', gameRoutes);
app.get('/api/players', playerRoutes);

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
})


// Routes
//app.use('/api', routes);



// Error handling middleware
//app.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).send({ error: 'Something went wrong!' });
//});