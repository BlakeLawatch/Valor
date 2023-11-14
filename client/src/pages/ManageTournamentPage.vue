<template>
    <div class="container-fluid p-5">
        <section v-if="!tournamentEditable.isCancelled" class="row">
            <div class="col-12 text-center">
                <h1 class="text-white underline">{{ tournament.name }}</h1>
            </div>
            <div class="col-12 d-flex justify-content-center mt-3 rounded">
                <form @submit.prevent="editActiveTournament()" class="editFormCard rounded w-100">
                    <div class="d-flex ">
                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="name">Name</label>
                            </div>
                            <input v-model="tournamentEditable.name" type="text" class="rounded" id="name" maxlength="75">
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="entryPrice">Entry Price</label>
                            </div>
                            <input v-model="tournamentEditable.entryPrice" type="number" class="rounded" id="number"
                                max="10000">
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="capacity">Capacity</label>
                            </div>
                            <input v-model="tournamentEditable.capacity" type="number" class="rounded" id="number"
                                max="10000">
                        </div>
                    </div>

                    <div class="d-flex">
                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="address">Address</label>
                            </div>
                            <input v-model="tournamentEditable.address" type="text" class="rounded" id="address"
                                maxlength="10000">
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="prizePool">Prizes</label>
                            </div>
                            <input v-model="tournamentEditable.prizePool" type="text" class="rounded" id="prizePool"
                                maxlength="10000">
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="imgUrl">Image</label>
                            </div>
                            <input v-model="tournamentEditable.imgUrl" type="url" class="rounded" id="imgUrl"
                                maxlength="1000">
                        </div>


                    </div>

                    <div class="d-flex">


                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="facebookUrl">Facebook Link <i class="mdi mdi-facebook"></i> </label>
                            </div>
                            <input v-model="tournamentEditable.facebookUrl" type="url" class="rounded" id="facebookUrl"
                                maxlength="10000">
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="instagramUrl">Instagram Link <i class="mdi mdi-instagram"></i> </label>
                            </div>
                            <input v-model="tournamentEditable.instagramUrl" type="url" class="rounded" id="instagramUrl"
                                maxlength="10000">
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="twitterUrl">Twitter Link <i class="mdi mdi-twitter"></i></label>
                            </div>
                            <input v-model="tournamentEditable.twitterUrl" type="url" class="rounded" id="twitterUrl"
                                maxlength="10000">
                        </div>


                    </div>


                    <div class="d-flex">

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="youtubeUrl">YouTube Link <i class="mdi mdi-youtube"></i> </label>
                            </div>
                            <input v-model="tournamentEditable.youtubeUrl" type="url" class="rounded" id="youtubeUrl"
                                maxlength="10000">
                        </div>



                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="liveStreamUrl">Twitch Username <i class="mdi mdi-twitch"></i> </label>
                            </div>
                            <input v-model="tournamentEditable.liveStreamUrl" type="text" class="rounded" id="liveStreamUrl"
                                maxlength="10000">
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="region" class="form-label">Region</label>
                            </div>
                            <select v-model="tournamentEditable.region" class="form-select" name="" id="">
                                <option :value="region" v-for="region in region" :key="region">{{ region }}</option>
                            </select>
                        </div>


                    </div>

                    <div class="d-flex">
                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="startDate">Start Date</label>
                            </div>
                            <input v-model="tournamentEditable.startDate" type="date" class="rounded" :min="todaysDate"
                                id="startDate">
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="endDate">End Date</label>
                            </div>
                            <input v-model="tournamentEditable.endDate" type="date" class="rounded" :min="todaysDate"
                                id="endDate">
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="signUpDeadline">Sign Up Deadline</label>
                            </div>
                            <input v-model="tournamentEditable.signUpDeadline" type="date" class="rounded" :min="todaysDate"
                                id="signUpDeadline">
                        </div>
                    </div>

                    <div class="d-flex">

                        <div class="text-white p-2 col-8">
                            <div class="mb-1">
                                <label for="description">Description</label>
                            </div>
                            <textarea v-model="tournamentEditable.description" type="text" class="rounded w-100" rows="7"
                                id="description" maxlength="1000"></textarea>
                        </div>

                        <div class="text-white p-2 col-4 form-check">
                            <div class="mb-1">
                                <label for="onlineOnly">Online Only</label>
                            </div>
                            <input v-model="tournamentEditable.onlineOnly" type="checkbox" class="rounded" id="onlineOnly">
                            <div class="mb-1">
                                <label for="isLocked">Lock Tournament</label>
                            </div>
                            <input v-model="tournamentEditable.isLocked" type="checkbox" class="rounded" id="isLocked">
                            <div class="mb-1">
                                <button @click.prevent="cancelTournament()" class="btn btn-danger"
                                    title="cancel tournament">Cancel Tournament</button>
                            </div>
                        </div>
                    </div>




                    <!-- SECTION form button -->
                    <div class="p-2 text-end">
                        <button type="submit" title="submit edit" class="btn btn-success">Submit Edit</button>
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
                <h1 class="text-white underline">Manage Players</h1>
            </div>
            <section class="row">
                <div class="col-3">
                    <h1 class="text-white editFormCard">Participants: </h1>
                    <div class="text-white mt-4 d-flex" v-for="player in players" :key="player.id">
                        <h3 class="mx-2">{{ player.seed }}</h3>
                        <div class="editFormCard d-flex ">
                            <img class="rounded-circle" :src="player.profile.picture" alt="">
                            <h4 class="mx-3">{{ player.profile.name }}</h4>
                        </div>
                    </div>
                </div>
                    <div class="col-9 text-end">
                        <h1 class="text-white">Placeholder for bracket</h1>
                    </div>
        </section>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import { tournamentsService } from '../services/TournamentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRoute, useRouter } from 'vue-router';
import { router } from '../router';
import { playersService } from '../services/PlayersService';
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
            if (AppState.activeTournament) {
                tournamentEditable.value = { ...AppState.activeTournament }
            }
            else {
                tournamentEditable.value = {}
            }
        })
        async function getMyTournamentById() {
            try {
                // debugger
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
    }
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

textarea {
    resize: none;
}
</style>