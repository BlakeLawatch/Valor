<template>
  <!-- TODO MAKE SEARCH IN THE BACK END NOT CASE SPECIFIC -->
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
  <input v-model="editable" class="form-control mr-sm-2" required type="search" placeholder="Search" aria-label="Search">
    <button class="btn my-2 my-sm-0 ms-3 color-match text-light" type="submit">Search</button>
</form>
      </div>
    </section>
    <section class="row d-flex justify-content-center">
      <div v-if="games.length >0" class="col-md-8 col-12">
        <h1 class="text-white mt-5 ">Games
        </h1>
          <section class="row">
            <div class="col-md-4 col-12 mt-4" v-for="game in games" :key="game.id">
              <GameCard :game="game" />
            </div>
          </section>
      </div>
      <div v-if="searchedTournaments.length>0" class="col-md-8 col-12">
<h1 class="text-white mt-5">
  Tournaments
</h1>
<section class="row">
  <div class="col-12 mt-4" >
    <div v-for="tournament in searchedTournaments" :key="tournament.id" >
          <ActiveTournamentCard  :tournament = "tournament" />
          </div>  
  </div>
</section>
      </div>
      <div v-if="profiles.length >0" class="col-md-8 col-12">
          <h2 class="text-white mt-5 fs-1">Profiles</h2>
            <section class="row mb-5">
              <div class="col-md-3 col-6 mt-4" v-for="profile in profiles" :key="profile.id">
              <div class="d-flex align-items-center box-bg p-3 rounded">
                <img class="profile-picture rounded-circle" :src="profile.picture" alt="profile picture">
                <p class="text-white mb-0 ms-3 ">
                  {{ profile.name }}
                </p>
              </div>

              </div>
            </section>
      </div>
          
      <div v-if="games.length == 0" class="col-md-8">
        <h1 class="text-white mt-5">Active Tournaments</h1>
      <section class="row">
          <div class="col-12 mt-4" v-for="tournament in tournaments" :key="tournament.id" >
          <ActiveTournamentCard  :tournament = "tournament" />
          </div>  
      </section>
    </div>
    </section>
  </div>
</template>

<script>
import { computed,  onMounted,  ref, watchEffect } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import {gamesService} from '../services/GamesService'
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
        const route = useRoute()

        watchEffect(()=>{
          route
          getActiveTournaments()
        })



        async function getActiveTournaments(){
        try {
          editable.value = ''
          await tournamentsService.getActiveTournaments() 
          AppState.games = [] 
          AppState.searchedTournaments = []    
        } catch (error) {
          Pop.error(error)
        }
      }
        
      
        
        return {
            editable,
            tournaments: computed(()=> AppState.activeTournaments.filter(tournament => tournament.startDate < Date.now() || tournament.endDate > Date.now())),
            // { startDate: { $gt: new Date().getUTCDate() } }).limit(10)
            games: computed(()=> AppState.games),
            searchedTournaments: computed(()=> AppState.searchedTournaments),
            profiles: computed(()=> AppState.profiles),
            async homeSearch() {
                try {
                    const body = { search: editable.value };
                    const query = {name: editable.value}
                    await gamesService.homeSearch(body);
                    await accountService.searchByPlayerName(query)
                    await tournamentsService.searchTournamentsByName(query)
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
.box-bg{
  background-color: #444444;
}

.profile-picture{
  height: 4rem;
  aspect-ratio: 1/1;
}

.color-match{
  background-color: #2ca58d;
}

.valor{

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
