<template>
    <div class="container-fluid p-5">
        <section class="row">
            <div class="col-12 text-center">
                <h1 class="text-white underline">{{ tournament.name }}</h1>
            </div>
            <div class="col-12 d-flex justify-content-center mt-3">
                <form @submit.prevent="editActiveTournament()" class="editFormCard w-100">
                    <div class="text-white p-2 col-3">
                        <div class="mb-1">
                            <label for="name">Name</label>
                        </div>
                        <input v-model="tournamentEditable.name" type="text"  id="name" maxlength="75">
                    </div>
                    <!-- SECTION form button -->
                    <div class="p-2 text-end">
                        <button type="submit" title="submit edit" class="btn btn-success">Submit Edit</button>
                    </div>
                </form>
            </div>
        </section>
    </div>


    
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import { tournamentsService } from '../services/TournamentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
export default {
    setup(){
        const tournamentEditable = ref({})
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
        tournamentEditable,
        tournament: computed(() => AppState.activeTournament),
        account: computed(() => AppState.account),

        async editActiveTournament() {
            try {
                const tournamentId = route.params.tournamentId
                const tournamentData = tournamentEditable.value
                await tournamentsService.editActiveTournament(tournamentData, tournamentId)
            } catch (error) {
                Pop.error(error)
            }
        }
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