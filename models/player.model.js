import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  team: { type: String, required: true },
  against: { type: String, required: true },
  odds: { type: Object, required: true },
  games: { type: Object, required: true },

})
const players = mongoose.model('players', playerSchema);

export default players;