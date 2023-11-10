<template>
    <div class="container-fluid p-5">
        <section class="row">
            <div class="col-12 text-center">
                <h1 class="text-white underline">{{ tournament.name }}</h1>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <form class="editFormCard w-100">
                </form>
            </div>
        </section>
    </div>


    
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { tournamentsService } from '../services/TournamentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
export default {
    setup(){
        const route = useRoute()
        watchEffect(() => {
            route,
            getMyTournamentById()
        })
        async function getMyTournamentById(){
        try {
            // debugger
            const tournamentId = route.params.tournamentId
            await tournamentsService.getTournamentById(tournamentId)
        } catch (error) {
            Pop.error(error)
            logger.error(error)
        }
    }
    return {
        tournament: computed(() => AppState.activeTournament),
        account: computed(() => AppState.account)
      }
    }
};
</script>


<style lang="scss" scoped>
.underline {
    text-decoration: underline;
    margin-top: 3px;
    text-decoration-color: #2ca58d;
    text-decoration-thickness: 1.3px;
}

.editFormCard{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
height: 19vh;
border: 1px solid #2ca58d ;
}

</style>