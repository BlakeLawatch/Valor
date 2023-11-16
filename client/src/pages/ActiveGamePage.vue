<template>
  <!-- TODO MAKE THIS PAGE LOOK GOOD -->
  <div class="container-fluid">
    <section class="row p-3 justify-content-center">
      <div class="col-10">
        <div class="dark-bg rounded p-3">
          <div class="text-center rounded card-bg p-2">
            <div v-if="game.id" class="row justify-content-center">
              <div v-if="game.cover" class="col-10 col-md-7 cover-img d-flex justify-content-center align-items-start" :style="{ backgroundImage: `url(${game.cover.url})` }">
                <p class="game-name rounded-pill fs-5 p-md-3 p-1 mb-0 mt-md-3 m-1">{{ game.name }}</p>
              </div>
              <div v-else-if="!game.cover" class="col-10 col-md-7 d-flex justify-content-center align-items-end broken-background">
                <p class="game-name fs-md-1 fs-5 py-md-2 p-1 mt-md-3 m-md-4 m-3 px-md-4 rounded">{{ game.name }}</p>
              </div>
            </div> 
            <section class="row justify-content-center align-items-center">
              <div class="col-10">
                <p class="card-text text-center my-2 fs-4 mb-0 mt-3">Search Tournament</p>
              </div>
              <div class="text-start p-3 col-md-7 col-12">
                <label class="text-white" for="searchForm">Search</label>
                <form @submit.prevent="filterTournaments()" class="" name="searchForm">
                  <div class="input-group">
                    <input v-model="searchEditable" class="form-control mr-sm-2" type="search"
                      placeholder="Search for your tournament here..." aria-label="Search" title="search bar">
                    <button class="btn btn-valor mdi mdi-magnify" type="submit"></button>
                  </div>
                </form>
              </div>
              <div class="col-6 col-md-2 text-start">
                <label for="filterBy" class="text-white">Filter By</label>
                <select v-model="filteredTournamentType" class="form-select border-0" name="filterBy" title="filter bar">
                  <option v-for="tournamentType in tournamentTypes" :key="tournamentType">
                    {{ tournamentType }}
                  </option>
                </select>
              </div>
              <div class="col-6 col-md-2 text-start">
                <label for="sortBy" class="text-white">Sort By</label>
                <select v-model="filteredSortType" class="form-select border-0" name="sortBy" title="sorting bar">
                  <option v-for="sortType in sortTypes" :key="sortType">
                    {{ sortType }}
                  </option>
                </select>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section class="row d-flex justify-content-center">
          <div v-if="tournaments.length > 0" class="col-8">
            <div class="mb-3" v-for="tournament in tournaments" :key="tournament.id">
              <ActiveTournamentCard :tournament="tournament" />
            </div>
          </div>
          <div v-else class="col-8">
            <h3 v-if="filteredTournamentType" class="card-text my-3 text-center">
              No tournaments exist with the given criteria
            </h3>
            <h3 v-else class="card-text my-3 text-center">
              This game currently does not have any active or future tournaments.
            </h3>
          </div>
    </section>

  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, watchEffect, ref } from 'vue';
import { gamesService } from '../services/GamesService';
import Pop from '../utils/Pop';
import { tournamentsService } from '../services/TournamentsService';
import ActiveTournamentCard from '../components/ActiveTournamentCard.vue';

export default {
  setup() {
    const route = useRoute();
    // const sortByHighEntrants = ref(true);
    const sortTypes = ['Entrants (high)', 'Entrants (low)']
    const tournamentTypes = ['Online only', 'In person'];
    const searchEditable = ref('');
    const filteredTournamentType = ref('')
    const filteredSortType = ref('')
    watchEffect(() => {
      route;
      getGameAndTournamentsById();
    });
    watchEffect(() => {
      searchEditable
      filterTournaments()
    });
    async function filterTournaments() {
      try {
        if (searchEditable.value == '') {
          await tournamentsService.getTournamentsByGameId(route.params.gameId)
        }
        else {
          await tournamentsService.filterTournaments(searchEditable.value)
        }
      }
      catch (error) {
        Pop.error(error)
      }
    }
    async function getGameAndTournamentsById() {
      try {
        await gamesService.getGameById(route.params.gameId);
        await tournamentsService.getTournamentsByGameId(route.params.gameId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      searchEditable,
      filteredTournamentType,
      tournamentTypes,
      sortTypes,
      filteredSortType,
      game: computed(() => AppState.activeGame),
      tournaments: computed(() => {
        let filteredAndSortedTournaments = AppState.searchedTournaments
        if (filteredTournamentType.value) {
          if (filteredTournamentType.value == 'Online only') {
            filteredAndSortedTournaments = AppState.searchedTournaments.filter(tournament => tournament.onlineOnly)
          }
          else {
            filteredAndSortedTournaments = AppState.searchedTournaments.filter(tournament => tournament.onlineOnly == false)
          }
        }
        if (filteredSortType.value) {
          if (filteredSortType.value == 'Entrants (high)') {
            filteredAndSortedTournaments.sort((t1, t2) => t2.playerCount - t1.playerCount)
          }
          else {
            filteredAndSortedTournaments.sort((t1, t2) => t1.playerCount - t2.playerCount)
          }
        }
        return filteredAndSortedTournaments

      }),
      filterType(tournamentType) {
        filteredTournamentType.value = tournamentType
      },
      filterTournaments
    };
  },
  components: { ActiveTournamentCard }
};
</script>


<style lang="scss" scoped>
.dark-bg {
  background-color: #242726;
}

.card-bg {
  background-color: #444444;
}

.cover-img {
  background-size:cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 15rem;
  border: 2px solid #2ca58d;
  box-shadow: 0px 5px 6px #2ca58d;
}
.broken-background {
  background-image: url(/src/assets/img/valorPanda.png);
  background-size:cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 15rem;
  border: 2px solid #2ca58d;
  box-shadow: 0px 5px 6px #2ca58d;
}
.game-name{
  background-color: #242726d6;
  border: 2px solid #2ca58d;
  box-shadow: 0px 5px 6px #2ca58d;
  text-shadow: 0px 5px 6px #2ca58d;
  color:white;
}

.btn-valor {
  background-color: #2ca58d;
  color: white;
  font-weight: bold;
}

p {
  margin-bottom: 0;
}

.card-text {
  color: white;
  text-shadow: 1px 0px 5px black;
}
</style>