<template>
    <!-- TODO MAKE THIS PAGE LOOK GOOD -->
    <div class="container-fluid">
        <section class="row p-3">
            <div class="col-12">
                <div class="dark-bg rounded p-3">
<div class="text-center rounded card-bg">
    <p class="text-white">
        {{ game.name }}
    </p>
    <img :src="game.cover?.url" alt="">
    <div v-if="tournaments.length >0" class="text-start p-3">
        <p class="text-white fs-2">
            Search Tournament By
        </p>
        <form class="form-inline d-flex">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success mx-3 my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>
    <div v-else>
<p class="text-white">
    this game has no tournaments and this is a placeholder, make this look better soon pls
</p>
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
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { logger } from '../utils/Logger';
import { gamesService } from '../services/GamesService';
import Pop from '../utils/Pop';
import { tournamentsService } from '../services/TournamentsService';
import ActiveTournamentCard from '../components/ActiveTournamentCard.vue';
export default {
    setup() {
        const route = useRoute();
        watchEffect(() => {
            route;
            getGameAndTournamentsById();
        });
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
            game: computed(() => AppState.activeGame),
            tournaments: computed(()=> AppState.activeTournaments)
        };
    },
    components: { ActiveTournamentCard }
};
</script>


<style lang="scss" scoped>

.dark-bg{
    background-color: #242726;
}

.card-bg{
    background-color: #444444;
}

</style>