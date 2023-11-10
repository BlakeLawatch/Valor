<template>
<div v-if="activeTournament" class="container-fluid px-5 py-4">
  <section class="row text-light card-bg rounded p-2">
    <div class="col-12 py-2 px-0 banner-img d-flex align-items-center justify-content-center" :style="{backgroundImage: 'url(' + activeTournament.imgUrl + ')'}">
      <p class="fs-1 timer">TIMER</p>
    </div>
    <div class="col-12 mt-3 text-center">
      <h2>{{ activeTournament.name }}</h2>
    </div>
    <div class="col-12 d-flex justify-content-between align-items-center my-2">
      <div>
        <p>{{ activeTournament.address }}</p>
        <p>{{ activeTournament.playerCount?.toLocaleString() }} Entrants</p>
      </div>
      <div class="text-end">
        <p class="fs-5">{{ activeTournament.gameName }}</p>
        <p>{{ activeTournament.startDate?.toLocaleDateString() }} - {{ activeTournament.endDate?.toLocaleDateString() }}</p>
      </div>
    </div>
    <div class="col-12 my-3">
      <p>{{ activeTournament.description }}</p>
    </div>
    <div class="col-12 d-flex justify-content-between align-items-center my-2">
      <div class="">
        <p>${{ activeTournament.prizePool }} Prize Pool</p>
        <p>Entry fee: ${{ activeTournament.entryPrice }}</p>
        <p>Registration ends {{ activeTournament.signUpDeadline?.toLocaleDateString() }}</p>
      </div>
      <div class="">
        <button class="btn btn-success">Register</button>
      </div>
    </div>
  </section>
</div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, watchEffect } from 'vue';
import Pop from "../utils/Pop";
import {tournamentsService} from "../services/TournamentsService.js"

export default {
  setup(){
    const route = useRoute()
    watchEffect(()=> {
      route
      getTournamentById()
    })
    async function getTournamentById(){
      try {
        const tournamentId = route.params.tournamentId
        await tournamentsService.getTournamentById(tournamentId)
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    return {
      activeTournament: computed(() => AppState.activeTournament)
    }
  }
};
</script>


<style lang="scss" scoped>
p{
  margin-bottom: 0;
}

.card-bg{
  background-color: #444444;
}

.banner-img{
  height: 12rem;
}

.timer{
  text-shadow: 0px 0px 7px black;
}

</style>