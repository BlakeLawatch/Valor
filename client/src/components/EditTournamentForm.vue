<template>
<form @submit.prevent="editActiveTournament()" class="editFormCard rounded w-100">
    <div class="row p-md-4 pt-2 justify-content-evenly mt-1 align-items-center">
        <div class="col-12 text-center">
            <h5 class="text-light mt-1">Tournament Info:</h5>
        </div>
        <div class="text-white col-12 col-md-4 p-4 pt-2">
            <label for="name">Name</label>
            <input v-model="tournamentEditable.name" type="text" class="rounded w-100" id="name" maxlength="75">
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
                <input v-model="tournamentEditable.startDate" type="date" class="rounded w-100" :min="todaysDate"
                    id="startDate">
                </div>
            <div class="text-white col-6 col-md-4 p-4 pt-2">
                <label for="endDate">End Date</label>
                <input :disabled="!tournamentEditable.startDate" v-model="tournamentEditable.endDate" type="date" class="rounded w-100" :min="tournamentEditable.startDate"
                    id="endDate">
            </div>
            <div class="text-white col-6 col-md-4 mt-md-0 mt-2 p-4 pt-2">
                <label for="signUpDeadline">Sign Up Deadline</label>
                <input :disabled="!tournamentEditable.startDate" v-model="tournamentEditable.signUpDeadline" type="date" class="rounded w-100" :min="todaysDate" :max="tournamentEditable.startDate"
                    id="signUpDeadline">
            </div>
        </div>
        <div class="row p-md-4 pt-2 justify-content-evenly align-items-center">
            <div class="col-12 text-center">
                <h5 class="text-light mt-2 p-4 pt-2">Media Links:</h5>
            </div>
            <div class="text-white col-6 col-md-3 p-4 pt-2">
                <label for="facebookUrl">Facebook Link <i class="mdi mdi-facebook"></i> </label>
                <input v-model="tournamentEditable.facebookUrl" type="url" class="rounded w-100" id="facebookUrl"
                    maxlength="10000">
            </div>
            <div class="text-white col-6 col-md-3 p-4 pt-2">
                <label for="instagramUrl">Instagram Link <i class="mdi mdi-instagram"></i> </label>
                <input v-model="tournamentEditable.instagramUrl" type="url" class="rounded w-100" id="instagramUrl"
                    maxlength="10000">
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
                <label for="liveStreamUrl">Twitch Username <i class="mdi mdi-twitch"></i> </label>
                <input v-model="tournamentEditable.liveStreamUrl" type="text" class="rounded w-100" id="liveStreamUrl"
                    maxlength="10000">
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
                        <input v-model="tournamentEditable.onlineOnly" type="checkbox" class="rounded" id="onlineOnly">
                    </div>
                    <div class="col-6 col-md-9">
                        <label for="isLocked" class="me-2">Lock or Unlock:</label>
                        <input v-model="tournamentEditable.isLocked" type="checkbox" class="rounded" id="isLocked">
                    </div>
                    <div class="col-6 mt-md-1 mt-3 col-md-11">
                        <div>
                            <button @click.prevent="cancelTournament()" class="btn btn-danger"
                                title="cancel tournament">Cancel Tournament</button>
                        </div>
                    </div>
                    <div class="col-6 mt-md-1 mt-3 col-md-11">
                        <!-- SECTION form button -->
                        <div>
                            <button type="submit" title="submit edit" class="btn btn-success">Confirm Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, watchEffect, ref } from 'vue';
import { tournamentsService } from '../services/TournamentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRoute, useRouter } from 'vue-router';
// import { router } from '../router';
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

.textShadow {
text-shadow: 2px 2px 4px #2ca58d;
}

textarea {
    resize: none;
}
</style>