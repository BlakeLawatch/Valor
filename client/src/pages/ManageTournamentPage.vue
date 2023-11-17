<template>
    <!-- TODO might want to be able to register in our own tournament -->
    <div class="container-fluid p-4">
        <section v-if="!tournamentEditable.isCancelled" class="row justify-content-center">
            <router-link :to="{ name: 'TournamentInfoPage', params: { tournamentId: tournament.id } }">
                <div class="col-12 text-center">
                    <h1 class="text-white text-break textShadow underline">{{ tournament.name }}</h1>
                </div>
            </router-link>
            <div class="col-12 col-md-10 d-flex justify-content-center mt-3 rounded">
                <form @submit.prevent="editActiveTournament()" class="editFormCard rounded w-100">
                    <div class="row p-md-4 pt-2 justify-content-evenly mt-1 align-items-center">
                        <div class="col-12 text-center">
                            <h5 class="text-light mt-1">Tournament Info:</h5>
                        </div>
                        <div class="text-white col-12 col-md-4 p-4 pt-2">
                            <label for="name">Name</label>
                            <input v-model="tournamentEditable.name" type="text" class="rounded w-100" id="name"
                                maxlength="75">
                        </div>
                        <div class="text-white col-md-4 col-6 p-4 pt-2">
                            <label for="entryPrice">Entry Price</label>
                            <input v-model="tournamentEditable.entryPrice" type="number" class="rounded w-100" id="number"
                                max="10000">
                        </div>
                        <div class="text-white col-md-4 col-6 p-4 pt-2">
                            <label for="capacity">Capacity</label>
                            <input v-model="tournamentEditable.capacity" type="number" class="rounded w-100" id="number"
                                max="10000">
                        </div>
                        <div class="text-white col-6 col-md-4 mt-1 p-4 pt-2">
                            <label for="region" class="form-label mb-0">Region</label>
                            <select v-model="tournamentEditable.region" class="form-select w-100" name="" id="">
                                <option :value="region" v-for="region in region" :key="region">{{ region }}</option>
                            </select>
                        </div>
                        <div class="text-white col-6 col-md-4 p-4 pt-2">
                            <label for="address">Address</label>
                            <input v-model="tournamentEditable.address" type="text" class="rounded w-100" id="address"
                                maxlength="100">
                        </div>
                        <div class="text-white col-6 col-md-4 mt-1 p-4 pt-2">
                            <label for="prizePool">Prizes</label>
                            <input v-model="tournamentEditable.prizePool" type="number" class="rounded w-100" id="prizePool"
                                max="1000000001">
                        </div>
                        <div class="text-white col-6 col-md-4 mt-1 p-4 pt-2">
                            <label for="imgUrl">Image</label>
                            <input v-model="tournamentEditable.imgUrl" type="url" class="rounded w-100" id="imgUrl"
                                maxlength="1000">
                        </div>
                    </div>
                    <div class="row p-md-4 pt-2 justify-content-evenly align-items-center">
                        <div class="col-12 text-center">
                            <h5 class="text-light">Dates and Deadlines:</h5>
                        </div>
                        <div class="text-white col-6 col-md-4 p-4 pt-2">
                            <label for="startDate">Start Date</label>
                            <input v-model="tournamentEditable.startDate" type="date" class="rounded w-100"
                                :min="todaysDate" id="startDate">
                        </div>
                        <div class="text-white col-6 col-md-4 p-4 pt-2">
                            <label for="endDate">End Date</label>
                            <input :disabled="!tournamentEditable.startDate" v-model="tournamentEditable.endDate"
                                type="date" class="rounded w-100" :min="tournamentEditable.startDate" id="endDate">
                        </div>
                        <div class="text-white col-6 col-md-4 mt-md-0 mt-2 p-4 pt-2">
                            <label for="signUpDeadline">Sign Up Deadline</label>
                            <input :disabled="!tournamentEditable.startDate" v-model="tournamentEditable.signUpDeadline"
                                type="date" class="rounded w-100" :min="todaysDate" :max="tournamentEditable.startDate"
                                id="signUpDeadline">
                        </div>
                    </div>
                    <div class="row p-md-4 pt-2 justify-content-evenly align-items-center">
                        <div class="col-12 text-center">
                            <h5 class="text-light mt-2 p-4 pt-2">Media Links:</h5>
                        </div>
                        <div class="text-white col-6 col-md-3 p-4 pt-2">
                            <label for="facebookUrl">Facebook Link <i class="mdi mdi-facebook"></i> </label>
                            <input v-model="tournamentEditable.facebookUrl" type="url" class="rounded w-100"
                                id="facebookUrl" maxlength="10000">
                        </div>
                        <div class="text-white col-6 col-md-3 p-4 pt-2">
                            <label for="instagramUrl">Instagram Link <i class="mdi mdi-instagram"></i> </label>
                            <input v-model="tournamentEditable.instagramUrl" type="url" class="rounded w-100"
                                id="instagramUrl" maxlength="10000">
                        </div>
                        <div class="text-white col-6 col-md-3 mt-md-0 mt-1 p-4 pt-2">
                            <label for="twitterUrl">Twitter Link <i class="mdi mdi-twitter"></i></label>
                            <input v-model="tournamentEditable.twitterUrl" type="url" class="rounded w-100" id="twitterUrl"
                                maxlength="10000">
                        </div>
                        <div class="text-white col-6 col-md-3 mt-md-0 mt-1 p-4 pt-2">
                            <label for="youtubeUrl">YouTube Link <i class="mdi mdi-youtube"></i> </label>
                            <input v-model="tournamentEditable.youtubeUrl" type="url" class="rounded w-100" id="youtubeUrl"
                                maxlength="10000">
                        </div>
                        <div class="text-white col-6 col-md-3 mt-md-2 mt-1 p-4 pt-2">
                            <label for="liveStreamUrl">Livestream Link <i class="mdi mdi-twitch"></i> </label>
                            <input v-model="tournamentEditable.twitchUsername" type="text" class="rounded w-100"
                                id="liveStreamUrl" maxlength="10000">
                        </div>
                    </div>
                    <div class="row p-4 pt-2 justify-content-evenly">
                        <div class="col-12 text-center mb-2 p-4 pt-2">
                            <h5 class="text-light">Description and Other Details:</h5>
                        </div>
                        <div class="text-white col-12 col-md-8 p-4 pt-2">
                            <label for="description">Description</label>
                            <textarea v-model="tournamentEditable.description" type="text" class="rounded w-100" rows="6"
                                id="description" maxlength="1000"></textarea>
                        </div>
                        <div class="text-white p-2 col-12 col-md-2 d-flex pe-3">
                            <div class="row pt-md-2 mt-md-1">
                                <div class="col-6 col-md-9">
                                    <label for="onlineOnly" class="me-2">Online Only:</label>
                                    <input v-model="tournamentEditable.onlineOnly" type="checkbox" class="rounded"
                                        id="onlineOnly">
                                </div>
                                <div class="col-6 col-md-9">
                                    <label for="isLocked" class="me-2">Lock or Unlock:</label>
                                    <input v-model="tournamentEditable.isLocked" type="checkbox" class="rounded"
                                        id="isLocked">
                                </div>
                                <div class="col-6 mt-md-1 mt-3 col-md-11">
                                    <div>
                                        <button @click.prevent="cancelTournament()" class="btn btn-danger pulse"
                                            title="cancel tournament">Cancel Tournament</button>
                                    </div>
                                </div>
                                <div class="col-6 mt-md-1 mt-3 col-md-11">
                                    <!-- SECTION form button -->
                                    <div>
                                        <button type="submit" title="submit edit" class="btn btn-success offset">Confirm
                                            Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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

                    // if (tournamentEditable.value.startDate < AppState.activeTournament.createdAt) {
                    //     Pop.error('Invalid start date')
                    //     return
                    // }
                    // if (tournamentEditable.value.startDate > tournamentEditable.value.endDate) {
                    //     Pop.error('Invalid end date')
                    //     return
                    // }
                    // if (tournamentEditable.value.startDate) {
                    //     if (tournamentEditable.value.signUpDeadline > tournamentEditable.value.startDate || tournamentEditable.value.signUpDeadline < this.todaysDate) {
                    //         Pop.error('Invalid sign up deadline date')
                    //         return
                    //     }
                    // }
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
    components: { BracketComponent }
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