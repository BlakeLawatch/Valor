<template>
    <div class="container-fluid p-5">
        <section class="row">
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
                        <input v-model="tournamentEditable.name" type="text"  id="name" maxlength="75">
                    </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                            <label for="entryPrice">Entry Price</label>
                        </div>
                        <input v-model="tournamentEditable.entryPrice" type="number"  id="number" max="10000">
                    </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                            <label for="capacity">Capacity</label>
                        </div>
                        <input v-model="tournamentEditable.capacity" type="number"  id="number" max="10000">
                    </div>
                </div>

            <div class="d-flex">
                    <div class="text-white p-2 col-4">
                        <div class="mb-1">
                        <label for="address">Address</label>
                    </div>
                    <input v-model="tournamentEditable.address" type="text"  id="address" maxlength="10000">
                </div>

                    <div class="text-white p-2 col-4">
                        <div class="mb-1">
                        <label for="prizePool">Prizes</label>
                    </div>
                    <input v-model="tournamentEditable.prizePool" type="text"  id="prizePool" maxlength="10000">
                </div>

                    <div class="text-white p-2 col-4">
                        <div class="mb-1">
                        <label for="liveStreamUrl">Livestream Link</label>
                    </div>
                    <input v-model="tournamentEditable.liveStreamUrl" type="url"  id="liveStreamUrl" maxlength="10000">
                </div>
            </div>

            <div class="d-flex">
                    <div class="text-white p-2 col-4">
                        <div class="mb-1">
                        <label for="startDate">Start Date</label>
                    </div>
                    <input v-model="tournamentEditable.startDate" type="date" :min="todaysDate" id="startDate">
                </div>

                    <div class="text-white p-2 col-4">
                        <div class="mb-1">
                        <label for="endDate">End Date</label>
                    </div>
                    <input v-model="tournamentEditable.endDate" type="date" :min="todaysDate" id="endDate">
                </div>

                    <div class="text-white p-2 col-4">
                        <div class="mb-1">
                        <label for="signUpDeadline">Sign Up Deadline</label>
                    </div>
                    <input v-model="tournamentEditable.signUpDeadline" type="date" :min="todaysDate" id="signUpDeadline">
                </div>  
            </div>
                    <div class="d-flex">
                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="region" class="form-label">Region</label>
                            </div>
                            <select v-model="tournamentEditable.region" class="form-select"  name="" id="" >
                                <option :value="region" v-for="region in region" :key="region">{{ region }}</option>
                            </select>
                        </div>

                        <div class="text-white p-2 col-4">
                            <div class="mb-1">
                                <label for="gameImg">Image</label>
                            </div>
                            <input v-model="tournamentEditable.gameImg" type="url" id="gameImg" maxlength="500">
                        </div>

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
        const region = ["west", "midwest", "southwest", "southeast", "northeast" ]
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
        region,
        tournamentEditable,
        tournament: computed(() => AppState.activeTournament),
        account: computed(() => AppState.account),
        todaysDate: new Date().toISOString().substring(0, 10),
        async editActiveTournament() {
            try {
                const tournamentId = route.params.tournamentId
                const tournamentData = tournamentEditable.value
                await tournamentsService.editActiveTournament(tournamentData, tournamentId)
                // logger.log("I editied the page, good job")
                Pop.success('You done did edit the page')
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
box-shadow: 0px 5px 4px #2ca58d;

border: 1.5px solid #2ca58d ;
}

</style>