import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TournamentSchema } from '../models/Tournament.js';
import { PlayerSchema } from "../models/Player.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Tournaments = mongoose.model('Tournament', TournamentSchema);
  Players = mongoose.model('Player', PlayerSchema)
}

export const dbContext = new DbContext()
