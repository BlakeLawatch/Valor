<template>
    <p class="text-white">Router works</p>
    <div class="text-white" v-for="tournament in tournaments" :key="tournament.id">
        {{ tournament.name }}


    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { tournamentsService } from '../services/TournamentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
export default {
    setup(){
        const route = useRoute()
        onMounted(() => {
            getMyTournamentById()
        })
        async function getMyTournamentById(){
        try {
            // debugger
            const tournamentId = route.params.tournamentId
            await tournamentsService.getMyTournamentById(tournamentId)
        } catch (error) {
            Pop.error(error)
            logger.error(error)
        }
    }
    return {
        tournament: computed(() => AppState.myTournaments),
        account: computed(() => AppState.account)
      }
    }
};
</script>


<style lang="scss" scoped>

</style>