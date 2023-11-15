<template>
    <!-- TODO might want to be able to register in our own tournament -->
    <div class="container-fluid p-4">
        <section v-if="!tournamentEditable.isCancelled" class="row justify-content-center">
            <div class="col-12 text-center">
                <h1 class="text-white text-break textShadow underline">{{ tournament.name }}</h1>
            </div>
            <div class="col-12 col-md-10 d-flex justify-content-center mt-3 rounded">
                <EditTournamentForm/>
            </div>
        </section>
        <section v-else>
            <h1 class="text-light">You canceled this tournament</h1>
            <button @click.prevent="cancelTournament()" class="btn btn-success" title="cancel tournament">Restore this
                tournament</button>
        </section>
        <section class="row mt-4">
            <div class="col-12 text-center">
                <h1 class="text-white textShadow underline">Manage Players</h1>
            </div>
        </section>
        <section class="row mt-5 justify-content-center">
            <div class="col-10">
                <h1 class="text-white textShadow editFormCard rounded text-center">Participants: </h1>
            </div>
            <div class="col-2 text-white mt-4 d-flex" v-for="player in players" :key="player.id">
                <div class="editFormCard d-flex rounded w-100">
                    <img class="rounded-circle mx-3 mt-2 mb-2" :src="player.profile.picture" alt="">
                    <h6 class="mx-3">{{ player.profile.name }}</h6>
                    <p class="mx-2">Seed: {{ player.seed }}</p>
                </div>
            </div>
            <div class="col-10 text-center mt-3">
                <h1 class="text-white">Placeholder for bracket</h1>
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, watchEffect} from 'vue';
import { tournamentsService } from '../services/TournamentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRoute, useRouter } from 'vue-router';
// import { router } from '../router';
import { playersService } from '../services/PlayersService';
import EditTournamentForm from '../components/EditTournamentForm.vue'
export default {
    setup() {
        const tournamentEditable = ref({})
        const region = ["west", "midwest", "southwest", "southeast", "northeast"]
        const route = useRoute()
        const router = useRouter()
        watchEffect(() => {
            route,
                getMyTournamentById()
                getPlayersByTournamentId()
        })
        watchEffect(() => {
            if (AppState.activeTournament.id) {
                const editingTournament = { ...AppState.activeTournament }
                editingTournament.startDate = editingTournament.startDate.toISOString().substring(0, 10)
                editingTournament.endDate = editingTournament.endDate.toISOString().substring(0, 10)
                if(editingTournament.signUpDeadline) {
                    editingTournament.signUpDeadline = editingTournament.signUpDeadline.toISOString().substring(0, 10)
                }
                tournamentEditable.value = editingTournament
            }
            else {
                tournamentEditable.value = {}
            }
        })
        async function getMyTournamentById() {
            try {
                const tournamentId = route.params.tournamentId
                await tournamentsService.getTournamentById(tournamentId)
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        }

        async function getPlayersByTournamentId() {
            try {
                const tournamentId = route.params.tournamentId
                await playersService.getPlayersByTournamentId(tournamentId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            region,
            router,
            tournamentEditable,
            players: computed(() => AppState.playersInActiveTournament),
            tournament: computed(() => AppState.activeTournament),
            account: computed(() => AppState.account),
            todaysDate: new Date().toISOString().substring(0, 10),
            async editActiveTournament() {
                try {
                    if(tournamentEditable.value.startDate < this.todaysDate){
                        Pop.error('Invalid start date')
                        return
                    }
                    if(tournamentEditable.value.startDate > tournamentEditable.value.endDate){
Pop.error('Invalid end date')
return
                    }
                    if(tournamentEditable.value.startDate){
                        if(tournamentEditable.value.signUpDeadline > tournamentEditable.value.startDate || tournamentEditable.value.signUpDeadline < this.todaysDate){
                        Pop.error('Invalid sign up deadline date')
                        return
                    }
                    }
                    const tournamentId = route.params.tournamentId
                    const tournamentData = tournamentEditable.value
                    await tournamentsService.editActiveTournament(tournamentData, tournamentId)
                    Pop.success('You done did edit the page')
                    router.push({ name: 'TournamentInfoPage', params: { tournamentId: this.tournament.id } })
                } catch (error) {
                    Pop.error(error)
                }
            },
            async cancelTournament() {
                try {
                    const yes = await Pop.confirm("Are you sure about that?")
                    if (!yes) {
                        return
                    }
                    const tournamentId = route.params.tournamentId
                    await tournamentsService.cancelTournament(tournamentId)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    },
    components:{EditTournamentForm}
};
</script>


<style lang="scss" scoped>

img {
    height: 8vh;
    width: 8vh;
}
.underline {
    text-decoration: underline;
    margin-top: 3px;
    text-decoration-color: #2ca58d;
    text-decoration-thickness: 1.3px;
}

.editFormCard {
    background-color: rgb(68, 68, 68);
    box-shadow: 0px 5px 4px #2ca58d;
    
    border: 1.5px solid #2ca58d;
}

.textShadow {
text-shadow: 2px 2px 4px #2ca58d;
}
</style>