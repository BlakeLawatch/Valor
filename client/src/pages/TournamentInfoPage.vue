<template>
<div v-if="activeTournament" class="container-fluid px-5 py-4">
  <section class="row text-light card-bg rounded p-2">
    <div class="col-12 py-2 px-0 banner-img d-flex align-items-center justify-content-center" :style="{backgroundImage: 'url(' + activeTournament.imgUrl + ')'}">
      <p class="fs-1 timer">{{ countdown }}</p>
    </div>
    <div class="col-12 mt-3 text-center">
      <h2>{{ activeTournament.name }}</h2>
    </div>
    <div class="col-12 d-flex justify-content-between align-items-center my-2">
      <div>
        <p class="fs-5">{{ activeTournament.address }}</p>
        <p>{{ activeTournament.playerCount?.toLocaleString() }} Entrant 
          <span v-if="activeTournament.playerCount > 1">s</span>
        </p>
      </div>
      <div class="text-end">
        <p class="fs-5">{{ activeTournament.gameName }}</p>
        <p>
          {{ activeTournament.startDate?.toLocaleDateString() }}
          -
          <span v-if="activeTournament.endDate < activeTournament.startDate">TBD</span>
          <span v-else>{{ activeTournament.endDate?.toLocaleDateString() }}</span>
        </p>
      </div>
    </div>
    <div class="col-12 my-3">
      <p>{{ activeTournament.description }}</p>
    </div>
    <div class="d-flex justify-content-between align-items-center my-2">
      <div class="col-10">
        <div class="">
          <p class="fs-5">$
            <span v-if="activeTournament.prizePool" class="fw-bold">{{ activeTournament.prizePool }} </span>
            <span v-else class="fw-bold">TBD </span>
            Prize Pool
          </p>
          <p>Entry fee: $
            <span v-if="activeTournament.entryPrice">{{ activeTournament.entryPrice }}</span>
            <span v-else>TBD</span>
          </p>
          <p>Registration ends: 
            <span v-if="activeTournament.signUpDeadline">{{ activeTournament.signUpDeadline?.toLocaleDateString() }}</span>
            <span v-else>TBD</span>
          </p>
        </div>
      </div>
      <!-- <div class="col-2">
        <button v-if="" class="btn btn-valor w-100">Register</button>
        <button v-else-if="activeTournament.creatorId == account.id" class="btn btn-valor w-100">Edit</button>
        <button v-else :disabled="activeTournament.signUpDeadline < new Date()" class="btn btn-valor w-100">Register</button>
      </div> -->
    </div>
  </section>
</div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import Pop from "../utils/Pop";
import {tournamentsService} from "../services/TournamentsService.js"
import {playersService} from "../services/PlayersService.js"

export default {
  setup(){
    const route = useRoute()
    let countdown = ref('')
    let countdownInterval = null
    onMounted(() => {
      countdownInterval = setInterval(getCountdownTime, 1000)
    })
    watchEffect(() => {
      route
      getTournamentById()
      getPlayersByTournamentId()
    })
    onUnmounted(() => {
      clearInterval(countdownInterval)
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
    async function getPlayersByTournamentId(){
      try {
        const tournamentId = route.params.tournamentId
        await playersService.getPlayersByTournamentId(tournamentId)
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    function getCountdownTime(){
      const countdownDifference =  AppState.activeTournament.startDate.getTime() - new Date().getTime()
      let days = Math.floor(countdownDifference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((countdownDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((countdownDifference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((countdownDifference % (1000 * 60)) / 1000);
      if(countdownDifference < 0){
        countdown.value = ''
      }
      else{
        countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`
      }

    }
    return {
      activeTournament: computed(() => AppState.activeTournament),
      countdown,
      account: computed(() => AppState.account),
      players: computed(()=> AppState.playersInActiveTournament)
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

.btn-valor{
  background-color: #2ca58d;
  border: 0;
}

</style>