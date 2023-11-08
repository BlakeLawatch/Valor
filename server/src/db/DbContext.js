import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TournamentSchema } from '../models/Tournament.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Tournament = mongoose.model('Tournament', TournamentSchema);
}

export const dbContext = new DbContext()
