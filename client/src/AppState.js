import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  
  /** @type {import('./models/Game.js').Game[]} */
  games: [],
  
  /** @type {import('./models/Game.js').Game || {}} */
  activeGame: {},
  /**@type {import('./models/Profile.js).Profile}*/
  profile:{},
  
  /** @type {import('./models/Game.js').Game[]} */
  createFormGames: [],
  
  /** @type {import('./models/Tournament.js').Tournament []} */
  activeTournaments: []
})
