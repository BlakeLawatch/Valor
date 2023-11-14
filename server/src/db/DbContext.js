import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TournamentSchema } from '../models/Tournament.js';
import { PlayerSchema } from "../models/Player.js";
import { matchSchema } from '../models/Match.js';
import { VideoSchema } from '../models/Video.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('accounts', AccountSchema)
  Tournaments = mongoose.model('Tournament', TournamentSchema);
  Players = mongoose.model('Player', PlayerSchema);
  Matches = mongoose.model('Match', matchSchema);
  Videos = mongoose.model('Video', VideoSchema);
}

export const dbContext = new DbContext()
