<template>
  <div v-if="activeTournament" class="container-fluid py-4">
    <TournamentInfoActiveTournament/>
    <!--SECTION live stream link -->
    <section class="row text-center my-2">
      <div v-if="activeTournament.startDate <= new Date() && activeTournament.endDate >= new Date()"
        class="col-12 text-center">
        <h3 class="text-center text-white fs-1 text-shadow">This tournament is live!</h3>
        <iframe v-if="activeTournament.liveStreamUrl" class="twitch-video" :src="activeTournament.liveStreamUrl"
          allowfullscreen>
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
import { computed, ref, watchEffect } from 'vue';
import Pop from "../utils/Pop";
import { tournamentsService } from "../services/TournamentsService.js"
import { playersService } from "../services/PlayersService.js"
import BracketComponent from "../components/BracketComponent.vue";
import TournamentInfoActiveTournament from "../components/TournamentInfoActiveTournament.vue";

export default {
  setup() {
    const route = useRoute();
    let editable = ref('');
    watchEffect(() => {
      editable;
      filterParticipants();
    });
    watchEffect(() => {
      route;
      getTournamentById();
      getPlayersByTournamentId();
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
    return {
      editable,
      route,
      activeTournament: computed(() => AppState.activeTournament),
      account: computed(() => AppState.account),
      players: computed(() => AppState.playersInActiveTournament),
      filteredPlayers: computed(() => AppState.filteredPlayers),
    };
  },
  components: { BracketComponent, TournamentInfoActiveTournament }
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