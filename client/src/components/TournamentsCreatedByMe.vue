<template>
        <div class="text-light p-2 d-flex">
            <p class="fs-5"><span class="word-break">{{ profile.name }}'s</span> tournaments:</p>
        <div class="dropdown">
            <button class="btn color-match dropdown-toggle ms-2" title="Sort" type="button" id="filterMyTournaments" data-bs-toggle="dropdown" aria-expanded="false"></button>
            <ul class="dropdown-menu" aria-labelledby="filterMyTournaments">
                <li @click="sortByNew()" title="Sort New" type="button"><a class="dropdown-item color-match text-light">Sort by Future</a></li>
                <li @click="sortByOld()" title="Sort Old" type="button"><a class="dropdown-item">Sort By Past</a></li>
            </ul>
        </div>
    </div>
    <div v-if="profile.id" class="row w-100">
        <div v-for="tournament in myTournaments" title="View Tournament's Page" :key="tournament.id" class="col-12 col-sm-5 col-md-4 col-lg-3 m-3 account-info-card px-0">
            <router-link :to="{name: 'TournamentInfoPage', params: {tournamentId: tournament.id}}"> 
                <img v-if="!tournament.isCancelled" :src="tournament.imgUrl || tournament.gameImg" class="tournament-image w-100"/>
                <img v-else src="https://media.istockphoto.com/id/1227115202/photo/a-red-stamp-on-a-white-background-cancelled.webp?b=1&s=170667a&w=0&k=20&c=RPueqU4VVfs98bOCqlCPifC7EcKze6CksprK4o_K3no=" class="tournament-image w-100"/>
            </router-link>
            <div class="d-flex flex-column justify-content-between">
                <router-link :to="{name: 'TournamentInfoPage', params: {tournamentId: tournament.id}}">
                <p class="fs-5 ps-2 text-light text-center pt-2 word-break">{{ tournament.name }}</p>
                </router-link>
                <div v-if="tournament.creatorId == account.id"  class="w-100 d-flex justify-content-between pe-2 pb-1">
                    <RouterLink :to="{name: 'ManageTournament', params: {tournamentId: tournament.id}}">
                        <button class="btn color-match text-light" title="Edit Tournament"> Edit</button>
                    </RouterLink>
                    <button @click="deleteMyOwnTournament(tournament.id)" class="btn btn-danger" title="Delete Tournament">Delete</button>
                </div>
            </div>
        </div>
        </div>
        <div v-if="myTournaments == []" class="text-light word-break">{{ profile.name }} has not created any tournaments</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted} from 'vue';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { tournamentsService } from '../services/TournamentsService.js';
import { useRoute } from 'vue-router';
export default {
    setup(){
        const route = useRoute()
        onMounted(()=>{
            if(AppState.myTournaments != []){
                getMyTournaments()
            }
        })
    async function getMyTournaments(){
        try {
            const accountId = AppState.profile.id
            await tournamentsService.getMyTournaments(accountId)
        } catch (error) {
            Pop.error(error)
            logger.error(error)
        }
    }
    return {  
        route,
        myTournament: computed(() => AppState.activeTournament),
        myTournaments: computed(() => AppState.myTournaments),
        account: computed(()=> AppState.account),
        profile: computed(()=> AppState.profile),
        async sortByNew(){
            try {
                // debugger
                await tournamentsService.sortMyTournamentsByNew()
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        },
        async sortByOld(){
            try {
                await tournamentsService.sortMyTournamentsByOld()
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        },
        async deleteMyOwnTournament(tournamentId) {
            try {
                const yes = await Pop.confirm('Are you sure you want to delete your tournament?')
                if(!yes) {
                    return
                }
                await tournamentsService.deleteMyOwnTournament(tournamentId)
                 getMyTournaments()
            } catch (error) {
                Pop.error(error)
            }
        }
    }
    }
};
</script>


<style lang="scss" scoped>
.account-info-card{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
height: max-content;
}
.tournament-image{
    object-fit: cover;
    object-position: center;
    height: 12rem;
}
.word-break{
    word-break: break-all;
}
.color-match{
background-color: #2ca58d;
}
@media(max-width:1400px){
.account-info-card{
    height:max-content;
    justify-content: space-evenly;
}
}
@media(max-width:824px){
    .account-info-card{
        height: max-content;
    }
}
</style>