import express from 'express';

import games from '../models/games.model.js';

const router = express.Router();

//Get all games
router.get('/', async (req, res) => {
  try {
    const gamesData = await games.find();
    res.status(200).json(gamesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;