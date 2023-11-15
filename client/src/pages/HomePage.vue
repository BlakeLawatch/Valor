<template>
  <div class="container-fluid">
    <section class="row d-flex justify-content-center">
      <div class="col-12 text-center text-white">
        <h1 class="valor my-5">Valor</h1>
      </div>
      <div class="col-md-8 col-12 box-bg p-5 rounded">
        <!-- <p class="fs-5 text-white">
  Search
</p> -->
        <form @submit.prevent="homeSearch()" class="form-inline d-flex">
          <input v-model="editable" maxlength="50" class="form-control mr-sm-2" type="search" placeholder="Search"
            aria-label="Search">
          <button class="btn my-2 my-sm-0 ms-3 color-match text-light" type="submit">Search</button>
        </form>
      </div>
    </section>
    <div v-if="checkGames == 'nothing' && checkTournaments == 'nothing' && checkProfiles == 'nothing'">
      <section class="row d-flex justify-content-center">
        <div class="col-md-8 col-12 mt-4 text-white fs-3">
          <h2>Nothing Found Named {{ noName }}</h2>
        </div>
      </section>
    </div>
    <div v-else>

      <section class="row d-flex justify-content-center">
        <div v-if="games.length > 0" class="col-md-8 col-12">
          <h1 class="text-white fs-3 mt-5 ">Games
        </h1>
        <section class="row">
          <div class="col-md-4 col-12 mt-4" v-for="game in games" :key="game.id">
            <GameCard :game="game" />
          </div>
        </section>
      </div>
      <div  v-if="checkGames == 'nothing'">
        <section class="row d-flex justify-content-center">
          <div class="col-md-8 col-12 mt-4">
            <h2 class="text-white fs-3">No Games Named <span class="word-break">{{ noName }}</span></h2>
          </div>
        </section>
      </div>
      
      <div v-if="searchedTournaments.length > 0" class="col-md-8 col-12">
        <h3 class="text-white mt-5">
          Tournaments
        </h3>
        <section class="row">
          <div class="col-12 mt-4">
            <div class="mt-4" v-for="tournament in searchedTournaments" :key="tournament.id">
              <ActiveTournamentCard :tournament="tournament" />
            </div>
          </div>
        </section>
      </div>
      <div v-if="checkTournaments == 'nothing'">
        <section class="row d-flex justify-content-center">
          <div class="col-md-8 col-12 mt-4">
            <h3 class="text-white fs-3">No Tournaments Named <span class="word-break">{{ noName }}</span></h3>
          </div>
        </section>
      </div>
      <div v-if="profiles.length > 0" class="col-md-8 col-12">
        <h4 class="text-white mt-5 fs-3">Profiles</h4>
        <section class="row mb-5">
          <div class="col-md-4 col-6 mt-4" v-for="profile in profiles" :key="profile.id">
            <RouterLink :to="{name: 'Account', params: {accountId: profile.id}}">
              
              <div class="d-flex align-items-center box-bg p-3 rounded">
                <img class="profile-picture rounded-circle" :src="profile.picture" alt="profile picture">
                <p class="text-white mb-0 ms-3 word-break">
                  {{ profile.name }}
                </p>
              </div>
              
            </RouterLink>
            </div>
        </section>
      </div>
      <div v-if="checkProfiles == 'nothing'">
        <section class="row d-flex mb-4 justify-content-center">
          <div class="col-md-8 col-12 mt-4">
            <h4 class="text-white fs-3">No Profiles Named <span class="word-break">{{ noName }}</span></h4>
            
          </div>
        </section>
      </div>
      <!-- FIXME IF NO GAMES SHOW UP IN THE SEARCH THESE STILL SHOW FIX PLS -->
      <div v-if="checkGames == ''" class="col-md-8">
        <h1 class="text-white mt-5">Active Tournaments</h1>
        <section class="row mb-4">
          <div class="col-12 mt-4 text-white" v-for="tournament in activeTournaments" :key="tournament.id">
            <!-- <div class="d-flex gap-5">
              <span>
                Start:
                {{ tournament.startDate }}
              </span>
              <span>
                End:
                {{ tournament.endDate }}
              </span>

            </div> -->
            <ActiveTournamentCard :tournament="tournament" />
          </div>
        </section>
      </div>
    </section>
  </div>
</div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { gamesService } from '../services/GamesService'
import GameCard from '../components/GameCard.vue';
import { AppState } from '../AppState';
import ActiveTournamentCard from '../components/ActiveTournamentCard.vue';
import { tournamentsService } from '../services/TournamentsService';
import { useRoute } from 'vue-router';
import { Tournament } from '../models/Tournament';
import { accountService } from '../services/AccountService';

export default {
  setup() {
    const editable = ref('');
    const inputName = ref('')
    const checkGames = ref('')
    const checkTournaments = ref('')
    const checkProfiles = ref('')
    const route = useRoute()


    watchEffect(() => {
      route
      getActiveTournaments()
    })



    async function getActiveTournaments() {
      try {
        editable.value = ''
        checkGames.value = ''
        checkTournaments.value = ''
        checkProfiles.value = ''
        await tournamentsService.getActiveTournaments()
        AppState.games = []
        AppState.searchedTournaments = []
        AppState.profiles = []
      } catch (error) {
        Pop.error(error)
      }
    }



    return {
      inputName,
      editable,
      checkGames,
      checkTournaments,
      checkProfiles,
      tournaments: computed(() => AppState.activeTournaments),
      noName: computed(()=> inputName),
      activeTournaments: computed(() => AppState.activeTournaments.filter(tournament => tournament.startDate <= new Date() && tournament.endDate > new Date())),
      // { startDate: { $gt: new Date().getUTCDate() } }).limit(10)
      games: computed(() => AppState.games),
      searchedTournaments: computed(() => AppState.searchedTournaments),
      profiles: computed(() => AppState.profiles),
      async homeSearch() {
        try {
          if(editable.value == ''){
            getActiveTournaments()
            return
          }
          inputName.value = editable.value
          const body = { search: editable.value };
          const query = { name: editable.value }
          const isGames = await gamesService.homeSearch(body);
          checkGames.value = isGames
          const isPlayers = await accountService.searchByPlayerName(query)
          checkProfiles.value = isPlayers
          const isTournaments = await tournamentsService.searchTournamentsByName(query)
          checkTournaments.value = isTournaments
        }
        catch (error) {
          Pop.error(error);
        }
      }

    };
  },
  components: { GameCard, ActiveTournamentCard }
}
</script>

<style scoped lang="scss">
.box-bg {
  background-color: #444444;
}
.word-break{
  word-break: break-all;
}

.profile-picture {
  height: 4rem;
  aspect-ratio: 1/1;
}
.btn{
  word-break: normal;
}
.color-match {
  background-color: #2ca58d;
}

.valor {

  height: 61px;

  font-family: 'Press Start 2P';
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 64px;

  color: #FFFFFF;

  text-shadow: 0px 4px 4px #FC65C2;

}
</style>
