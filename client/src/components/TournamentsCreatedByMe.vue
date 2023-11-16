<template>
<div class="text-light p-2 d-flex">
    <p class="fs-5"><span class="word-break">{{ profile.name }}'s</span> tournaments:</p>
    <div class="dropdown">
        <button class="btn color-match dropdown-toggle ms-2" title="Sort" type="button" id="filterMyTournaments" data-bs-toggle="dropdown" aria-expanded="false"></button>
        <ul class="dropdown-menu dropdown-color" aria-labelledby="filterMyTournaments">
            <p class="dropdown-text fw-bold text-center">Sort By Start Date:</p>
            <li @click="sortByNew()" title="Sort New" type="button"><a class="dropdown-item color-match text-light">Future</a></li>
            <li @click="sortByOld()" title="Sort Old" type="button"><a class="dropdown-item dropdown-color text-light">Past</a></li>
        </ul>
    </div>
</div>
<div v-if="profile.id" class="row w-100">
    <div v-for="tournament in myTournaments" title="View Tournament's Page" :key="tournament.id" class="col-12 col-sm-5 col-md-4 col-lg-3 m-3 px-0 rounded">
        <div v-if="!tournament.isCancelled" class="account-info-card">
            <router-link :to="{name: 'TournamentInfoPage', params: {tournamentId: tournament.id}}"> 
                <img :src="tournament.imgUrl || tournament.gameImg" class="tournament-image w-100 rounded-top"/>
            </router-link>
            <div class="d-flex flex-column justify-content-between">
                <router-link :to="{name: 'TournamentInfoPage', params: {tournamentId: tournament.id}}">
                    <p class="fs-5 text-light text-center pt-3 word-break px-2">{{ tournament.name }}</p>
                </router-link>
                <div v-if="tournament.creatorId == account.id"  class="w-100 d-flex justify-content-between px-3 pb-3">
                    <div>
                        <RouterLink :to="{name: 'ManageTournament', params: {tournamentId: tournament.id}}">
                            <button class="btn color-match text-light" title="Edit Tournament"><i class="mdi mdi-pencil"></i></button>
                        </RouterLink>
                    </div>
                    <div>
                        <button @click="deleteMyOwnTournament(tournament.id)" class="btn btn-danger" title="Delete Tournament"><i class="mdi mdi-delete"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="tournament.isCancelled" :style="{backgroundImage:`url(${tournament.imgUrl || tournament.gameImg})`}" class="canceled-tournament-card d-flex justify-content-center align-items-center">
            <div class="d-flex flex-column canceled-tournament-message w-75">
                <router-link :to="{name: 'TournamentInfoPage', params: {tournamentId: tournament.id}}">
                    <p class="text-light text-center pt-3 px-2"><span class="word-break">{{ tournament.name }}</span> Has Been Canceled</p>
                </router-link>
                <div v-if="tournament.creatorId == account.id"  class="w-100 d-flex justify-content-evenly px-3 pb-3">
                    <div>
                        <RouterLink :to="{name: 'ManageTournament', params: {tournamentId: tournament.id}}">
                            <button class="btn color-match text-light" title="Tournament Details"><i class="mdi mdi-pencil"></i></button>
                        </RouterLink>
                    </div>
                    <div>
                        <button @click="deleteMyOwnTournament(tournament.id)" class="btn btn-danger" title="Delete Tournament"><i class="mdi mdi-delete"></i></button>
                    </div>
                </div>
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
.dropdown-color{
    background-color: rgb(68, 68, 68);
}
.dropdown-text{
    color:#2ca58d;
    border-bottom: 1.5px solid #2ca58d;
}
.canceled-tournament-card{
    height:15rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0px 5px 6px black;
}
.canceled-tournament-message{
    background-color: #2e3233da;
    border: 1.5px solid #2ca58d;
    box-shadow: 0px 5px 6px #2ca58d;
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