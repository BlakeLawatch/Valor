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
  <input v-model="editable" class="form-control mr-sm-2" required type="search" placeholder="Search" aria-label="Search">
    <button class="btn my-2 my-sm-0 ms-3 color-match text-light" type="submit">Search</button>
</form>
      </div>
    </section>
    <section class="row d-flex justify-content-center">
      <div v-if="games.length >0" class="col-md-8 col-12">
        <h1 class="text-white mt-5 ">Games</h1>
        <section class="row">
          <div class="col-md-4 col-12 mt-4" v-for="game in games" :key="game.id">
            <GameCard :game="game" />
          </div>
          <section class="row">
          </section>
        </section>
      </div>
      <section v-if="games.length == 0" class="row">
        <div v-for="tournament in tournaments" :key="tournament.id" class="col-md-4 col-12 mt-4">
        <ActiveTournamentCard :tournament = "tournament" />
      </div>
      </section>
    </section>
  </div>
</template>

<script>
import { computed,  onMounted,  ref } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import {gamesService} from '../services/GamesService'
import GameCard from '../components/GameCard.vue';
import { AppState } from '../AppState';
import ActiveTournamentCard from '../components/ActiveTournamentCard.vue';
import { tournamentsService } from '../services/TournamentsService';

export default {
    setup() {
        const editable = ref('');

        onMounted(()=>{
          getActiveTournaments()
        })



        async function getActiveTournaments(){
        try {
          await tournamentsService.getActiveTournaments()      
        } catch (error) {
          Pop.error(error)
        }
      }
        
      
        
        return {
            editable,
            tournaments: computed(()=> AppState.activeTournaments),
            games: computed(()=> AppState.games),
            async homeSearch() {
                try {
                    const body = { search: editable.value };
                    await gamesService.homeSearch(body);
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
