<template>
  <div v-if="activeTournament" class="container-fluid px-5 py-4">
    <!-- Info section -->
    <section class=" mx-5 row text-light card-bg formCard rounded p-2">
      <div class="col-12 py-2 banner-img d-flex align-items-center justify-content-center"
        :style="{ backgroundImage: 'url(' + activeTournament.imgUrl + ')' }">
        <p class="fs-1 timer">{{ countdown }}</p>
      </div>
      <div class="col-12 mt-3 text-center">
        <h1 class="text-shadow text-break">{{ activeTournament.name }}</h1>
      </div>
      <div class="col-12 d-flex justify-content-between align-items-center my-2">
        <div>
          <p class="fs-5 text-break">{{ activeTournament.address }}</p>
          <p v-if="activeTournament.playerCount == 1">{{ players.length }} Entrant</p>
          <p v-else>{{ players.length }} Entrants</p>
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
        <p class="text-break">{{ activeTournament.description }}</p>
      </div>
      <section class="row">
        <div class="justify-content-between align-items-center my-2">
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
              <p v-if="activeTournament.startDate < new Date()"> Registration is over</p>
              <p v-else>Registration ends:
                <span v-if="activeTournament.signUpDeadline">{{
                  activeTournament.signUpDeadline?.toLocaleDateString() }}</span>
                <span v-else>TBD</span>
              </p>
            </div>
          </div>
          <div class="col-12 text-end my 2 " v-if="!account.id">
            <!-- FIXME make look better pls -->
            <p class="text-end"> Sign in to register!</p>
            <button class="btn btn-valor button w-25" @click="login()">Register</button>

          </div>

          <div v-else class="col-12 my-2 text-end">
            <RouterLink v-if="activeTournament.creatorId == account.id"
              :to="{ name: 'ManageTournament', params: { tournamentId: activeTournament.id } }">
              <button class="btn btn-valor button">Edit</button>
            </RouterLink>
            <div v-else class="text-end">
              <button @click="registerForTournament(players, account)"
                v-if="players.find(p => p.accountId == account.id) == null"
                :disabled="activeTournament.startDate?.toLocaleDateString() < new Date().toLocaleDateString()"
                class="btn btn-valor button">Register</button>
              <button @click="unregisterForTournament(players.find(p => p.accountId == account.id))" v-else
                :disabled="activeTournament.startDate?.toLocaleDateString() < new Date().toLocaleDateString()"
                class="btn btn-danger button">Unregister</button>
            </div>
          </div>
        </div>
      </section>
    </section>
    <!-- live stream link -->
    <section class="row text-center my-2">
      <div v-if="activeTournament.startDate <= new Date() && activeTournament.endDate >= new Date()"
        class="col-12 text-center">
        <h3 class="text-center text-white fs-1 text-shadow">This tournament is live!</h3>
        <iframe class="twitch-video" :src="activeTournament.liveStreamUrl" allowfullscreen>
        </iframe>
      </div>
      <div v-else>
        <h3 v-if="activeTournament.startDate > new Date()" class="text-center text-white fs-1 text-shadow">Your tournament
          will be live soon</h3>
        <h3 v-if="activeTournament.endDate < new Date()" class="text-center text-white fs-1 text-shadow">Your tournament
          is over</h3>
      </div>
    </section>

    <!-- player search -->
    <section v-if="players.length > 0" class="row">
      <div class="col-12 col-md-3">
        <div class="col-12 text-white text-center">
          <h4 class="fs-1 text-shadow my-3">Participants</h4>
        </div>
        <div class="d-flex mb-3 justify-content-center">
          <input v-model="editable" type="search" class="form-control search-participants text-center" id="searchPlayers"
            placeholder="Search Participants">
        </div>
        <div class="overflow">
          <!-- TODO Make this look better  -->
          <!-- TODO ? put this in component maybe? maybe not-->
          <div class="d-flex text-white" v-for="player in filteredPlayers" :key="player.id">
            <div class="m-3 card-bg rounded p-2 d-flex">
              <div class="d-flex align-items-center pe-2">
                <img class="rounded-circle player-img " :src="player.profile.picture" alt="">
              </div>
              <div>
                <p class="text-break mb-0">{{ player.profile.name }}</p>
                <p>Seed: {{ player.seed }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9 text-center bracket">
        <BracketComponent />
      </div>
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
import { AuthService } from "../services/AuthService";
import BracketComponent from "../components/BracketComponent.vue";

export default {
  setup() {
    const route = useRoute();
    let countdown = ref('');
    let editable = ref('');
    let countdownInterval = null;
    onMounted(() => {
      countdownInterval = setInterval(getCountdownTime, 1000);
    });
    watchEffect(() => {
      editable;
      filterParticipants();
    });
    watchEffect(() => {
      route;
      getTournamentById();
      getPlayersByTournamentId();
    });
    onUnmounted(() => {
      clearInterval(countdownInterval);
    });
    async function getTournamentById() {
      try {
        const tournamentId = route.params.tournamentId;
        await tournamentsService.getTournamentById(tournamentId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function filterParticipants() {
      try {
        playersService.filterParticipants(editable.value);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getPlayersByTournamentId() {
      try {
        const tournamentId = route.params.tournamentId;
        await playersService.getPlayersByTournamentId(tournamentId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    function getCountdownTime() {
      const countdownDifference = AppState.activeTournament.startDate.getTime() - new Date().getTime();
      let days = Math.floor(countdownDifference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((countdownDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((countdownDifference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((countdownDifference % (1000 * 60)) / 1000);
      if (countdownDifference < 0) {
        countdown.value = '';
      }
      else {
        countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    }
    return {
      editable,
      route,
      activeTournament: computed(() => AppState.activeTournament),
      countdown,
      account: computed(() => AppState.account),
      players: computed(() => AppState.playersInActiveTournament),
      filteredPlayers: computed(() => AppState.filteredPlayers),
      async registerForTournament(players, account) {
        try {
          // TODO MAKE THROW ERROR IF ALREADY REGISTERED
          if (players.find(p => p.accountId == account.id)) {
            Pop.error('you are already registered for this event');
            return;
          }
          const yes = await Pop.confirm('Are you sure you would like to register for this event?');
          if (!yes) {
            return;
          }
          await tournamentsService.registerForTournament(route.params.tournamentId);
          Pop.success('You have successfully registered for this event!');
        }
        catch (error) {
          Pop.error(error);
        }
      },
      async unregisterForTournament(account) {
        try {
          const yes = await Pop.confirm('Are you sure you would like to cancel your registration for this event?');
          if (!yes) {
            return;
          }
          logger.log('account', account);
          await tournamentsService.unregisterForTournament(account.id);
          Pop.success('Successfully unregistered for this event');
        }
        catch (error) {
          Pop.error(error);
        }
      },
      async login() {
        AuthService.loginWithPopup();
      }
    };
  },
  components: { BracketComponent }
};
</script>


<style lang="scss" scoped>
p {
  margin-bottom: 0;
}

.player-img {
  height: 2rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

.card-bg {
  background-color: #444444;
}

.banner-img {
  height: 12rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
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

.overflow {
  overflow-y: scroll;
  height: 30rem;
}

::-webkit-scrollbar {
  background-color: rgb(68, 68, 68);
  border-radius: 10px;
  box-shadow: inset 0px 0px 6px #2ca58d;
  border: 1.5px solid #2ca58d;
}

::-webkit-scrollbar-thumb {
  background-color: #2ca58d;
  border-radius: 10px;
  box-shadow: 0px 0px 6px #2E3233;
}


.formCard {
  background-color: rgb(68, 68, 68);
  box-shadow: 0px 5px 4px #2ca58d;

  border: 1.5px solid #2ca58d;
}

.button {
  width: 25%
}

@media(max-width: 500px) {
  .button {
    width: 100%;
  }
}

.search-participants {
  width: 70%
}

@media (max-width: 845px) {
  .search-participants {
    width: 65%;
  }
}

.twitch-video {
  height: 540px;
  width: 860px;
}

@media (max-width: 950px) {
  .twitch-video {
    height: 178px;
    width: 283px
  }
}

@media (max-width: 845px) {
  .bracket {
    display: none;
  }
}
</style>