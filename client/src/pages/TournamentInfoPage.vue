<template>
  <div v-if="activeTournament" class="container-fluid px-5 py-4">
    <section class="row text-light card-bg rounded p-2">
      <div class="col-12 py-2 px-0 banner-img d-flex align-items-center justify-content-center"
        :style="{ backgroundImage: 'url(' + activeTournament.imgUrl + ')' }">
        <p class="fs-1 timer">{{ countdown }}</p>
      </div>
      <div class="col-12 mt-3 text-center">
        <h1 class="text-shadow">{{ activeTournament.name }}</h1>
      </div>
      <div class="col-12 d-flex justify-content-between align-items-center my-2">
        <div>
          <p class="fs-5">{{ activeTournament.address }}</p>
          <p>{{ players.length }} Entrant
            <span v-if="activeTournament.playerCount > 1">s</span>
          </p>
        </div>
        <div class="text-end">
          <h2>{{ activeTournament.gameName }}</h2>
          <div v-if="activeTournament.startDate">

            <p v-if="activeTournament.startDate.toLocaleDateString() == activeTournament.endDate.toLocaleDateString()">
              {{ activeTournament.startDate.toLocaleDateString() }}
            </p>
            <p v-else>
              {{ activeTournament.startDate?.toLocaleDateString() }}
              -
              <span v-if="activeTournament.endDate < activeTournament.startDate">TBD</span>
              <span v-else>{{ activeTournament.endDate?.toLocaleDateString() }}</span>
            </p>
          </div>
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
            <p v-if="activeTournament.startDate < new Date()"> Registration is over!</p>
            <p v-else>Registration ends:
              <span v-if="activeTournament.signUpDeadline">{{ activeTournament.signUpDeadline?.toLocaleDateString()
              }}</span>
              <span v-else>TBD</span>
            </p>
          </div>
        </div>
        <div class="col-2">
          <RouterLink v-if="activeTournament.creatorId == account.id"
            :to="{ name: 'ManageTournament', params: { tournamentId: activeTournament.id } }">
            <button class="btn btn-valor w-100">Edit</button>
          </RouterLink>
          <div v-else>
            <button @click="registerForTournament()" v-if="players.find(p => p.accountId == account.id) == null"
              :disabled="activeTournament.startDate.toLocaleDateString() < new Date().toLocaleDateString()"
              class="btn btn-valor w-100">Register</button>
            <button @click="unregisterForTournament(players.find(p => p.accountId == account.id))" v-else
              :disabled="activeTournament.startDate.toLocaleDateString() < new Date().toLocaleDateString()"
              class="btn btn-danger w-100">Unregister</button>
          </div>
        </div>
      </div>
    </section>
    <section class="row">
      <iframe
        src="https://clips.twitch.tv/embed?clip=ComfortableSillyAlbatrossTBCheesePull-L6smyx4werCeH2Nd&parent=localhost&autoplay=true"
        height="720" width="1280" allowfullscreen>
      </iframe>

    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import Pop from "../utils/Pop";
import { tournamentsService } from "../services/TournamentsService.js"
import { playersService } from "../services/PlayersService.js"
import { logger } from "../utils/Logger";

export default {
  setup() {
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
    async function getTournamentById() {
      try {
        const tournamentId = route.params.tournamentId
        await tournamentsService.getTournamentById(tournamentId)
      }
      catch (error) {
        Pop.error(error)
      }
    }
    async function getPlayersByTournamentId() {
      try {
        const tournamentId = route.params.tournamentId
        await playersService.getPlayersByTournamentId(tournamentId)
      }
      catch (error) {
        Pop.error(error)
      }
    }
    function getCountdownTime() {
      const countdownDifference = AppState.activeTournament.startDate.getTime() - new Date().getTime()
      let days = Math.floor(countdownDifference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((countdownDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((countdownDifference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((countdownDifference % (1000 * 60)) / 1000);
      if (countdownDifference < 0) {
        countdown.value = ''
      }
      else {
        countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`
      }

    }
    return {
      route,
      activeTournament: computed(() => AppState.activeTournament),
      countdown,
      account: computed(() => AppState.account),
      players: computed(() => AppState.playersInActiveTournament),
      async registerForTournament() {
        try {
          // TODO MAKE THROW ERROR IF ALREADY REGISTERED
          const yes = await Pop.confirm('Are you sure you would like to register for this event?')
          if (!yes) {
            return
          }
          await tournamentsService.registerForTournament(route.params.tournamentId)
          Pop.success('You have successfully registered for this event!')
        } catch (error) {
          Pop.error(error)
        }
      },
      async unregisterForTournament(account) {
        try {
          const yes = await Pop.confirm('Are you sure you would like to cancel your registration for this event?')
          if (!yes) {
            return
          }
          logger.log('account', account)
          await tournamentsService.unregisterForTournament(account.id)
          Pop.success('Successfully unregistered for this event')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
p {
  margin-bottom: 0;
}

.card-bg {
  background-color: #444444;
}

.banner-img {
  height: 12rem;
}

.timer {
  text-shadow: 0px 0px 7px black;
}

.btn-valor {
  background-color: #2ca58d;
  border: 0;
}

.text-shadow {
  text-shadow: 2px 2px 4px #2ca58d;
}
</style>