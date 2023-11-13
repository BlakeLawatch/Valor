<template>
    <!-- TODO MAKE THIS PAGE LOOK GOOD -->
    <div class="container-fluid">
        <section class="row p-3">
            <div class="col-12">
                <div class="dark-bg rounded p-3">
                    <div class="text-center rounded card-bg">
                        <h1 class="text-white">{{ game.name }}</h1>
                        <img :src="game.cover?.url" alt="">
                        <section class="row">
                            <div class="col-4">
                                <h3 class="text-white">Search Tournament</h3>
                            </div>
                            <div class=" col-4 dropdown text-end me-3">
                                <button class="btn btn-secondary color-match dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Filter
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Entrants (high)</a></li>
                                    <li><a class="dropdown-item" href="#">Entrants (low)</a></li>
                                    <li><a class="dropdown-item" href="#">Online</a></li>
                                    <li><a class="dropdown-item" href="#">In-person</a></li>
                                </ul>
                            </div>

                        </section>
                        <div v-if="tournaments.length > 0" class="text-start p-3">
                            <form class="form-inline d-flex px-5">
                                <input v-model="searchEditable" class="form-control mr-sm-2" type="search"
                                    placeholder="Search for your tournament here..." aria-label="Search">
                                <!-- <button class="btn btn-outline-success mx-3 my-2 my-sm-0" type="submit">Search</button> -->
                            </form>
                        </div>
                        <div v-else>
                            <h3 class="text-white my-3">
                                this game currently does not have any active or future tournaments.
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="row">
            <div class="col-12">
                <section class="row d-flex justify-content-center">
                    <div class="col-8">
                        <div class="mb-3" v-for="tournament in tournaments" :key="tournament.id">
                            <ActiveTournamentCard :tournament="tournament" />
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import { logger } from '../utils/Logger';
import { gamesService } from '../services/GamesService';
import Pop from '../utils/Pop';
import { tournamentsService } from '../services/TournamentsService';
import ActiveTournamentCard from '../components/ActiveTournamentCard.vue';
export default {
    setup() {
        const route = useRoute();
        const searchEditable = ref('')
        watchEffect(() => {
            route;
            getGameAndTournamentsById();
        });
        watchEffect(() => {
            searchEditable
            filterTournaments()
        });
        function filterTournaments() {
            try {
                tournamentsService.filterTournaments(searchEditable.value)
            } catch (error) {
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
            game: computed(() => AppState.activeGame),
            tournaments: computed(() => AppState.searchedTournaments)
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

img {
    object-fit: cover;
    object-position: center;
    width: 15%;
    height: 15rem;
}

.coolBg {
    background-color: #444444;
}

.color-match {
    background-color: #2ca58d;
}
</style>