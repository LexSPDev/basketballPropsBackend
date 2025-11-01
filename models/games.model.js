import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  id: { type: Date, required: true }
})
const games = mongoose.model('games', gameSchema);

export default games;