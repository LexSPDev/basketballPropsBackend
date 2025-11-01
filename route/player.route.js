import express from 'express';

import player from '../models/player.model.js';

const router = express.Router();

//Get all players
router.get('/api/players', async (req, res) => {
  try {
    const playersData = await player.find();
    res.status(200).json(playersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;