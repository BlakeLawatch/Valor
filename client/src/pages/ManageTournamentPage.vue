<template>
    <!-- TODO might want to be able to register in our own tournament -->
    <div class="container-fluid p-4">
        <section v-if="!tournamentEditable.isCancelled" class="row justify-content-center">
            <div class="col-12 text-center">
                <h1 class="text-white text-break textShadow underline">{{ tournament.name }}</h1>
            </div>
            <div class="col-12 col-md-10 d-flex justify-content-center mt-3 rounded">
                <EditTournamentForm />
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

        <!-- TODO We are still getting silent errors in the about editable not being rendered -->

        <section v-if="players.length > 0" class="row">
            <div class="col-12 col-md-3">
                <div class="col-12 text-white text-center">
                    <h4 class="fs-1 text-shadow my-3">Participants</h4>
                </div>
                <div class="d-flex mb-3 justify-content-center">
                    <input v-model="editable" type="search" class="form-control search-participants text-center"
                        id="searchPlayers" placeholder="Search Participants">
                </div>
                <div class="overflow">
                    <!-- TODO Make this look better  -->
                    <!-- TODO ? put this in component maybe? maybe not-->
                    <div class="d-flex text-white" v-for="player in players" :key="player.id">
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
import { AppState } from '../AppState';
import { computed, ref, watchEffect } from 'vue';
import { tournamentsService } from '../services/TournamentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRoute, useRouter } from 'vue-router';
// import { router } from '../router';
import { playersService } from '../services/PlayersService';
import EditTournamentForm from '../components/EditTournamentForm.vue'
import BracketComponent from '../components/BracketComponent.vue';
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
                if (editingTournament.signUpDeadline) {
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
                    if (tournamentEditable.value.startDate < this.todaysDate) {
                        Pop.error('Invalid start date')
                        return
                    }
                    if (tournamentEditable.value.startDate > tournamentEditable.value.endDate) {
                        Pop.error('Invalid end date')
                        return
                    }
                    if (tournamentEditable.value.startDate) {
                        if (tournamentEditable.value.signUpDeadline > tournamentEditable.value.startDate || tournamentEditable.value.signUpDeadline < this.todaysDate) {
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
    components: { EditTournamentForm, BracketComponent }
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

.scroll {
    overflow-y: scroll;
    max-height: 8rem;
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

.overflow {
    overflow-y: scroll;
    height: 30rem;
}

@media (max-width: 845px) {
    .bracket {
        display: none;
    }
}
</style>