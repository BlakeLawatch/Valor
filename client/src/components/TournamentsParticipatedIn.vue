<template>
    <div class="row text-light p-2 w-100">
        <div class="d-flex">
            <p class="fs-5">Tournaments that {{ account.name }} has participated in:</p>
            <div class="dropdown">
                <!-- TODO figure out how to filter these -->
                <button class="btn color-match dropdown-toggle ms-2" type="button" id="filterMyTickets" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul class="dropdown-menu" aria-labelledby="filterMyTickets">
                    <li type="button"><a class="dropdown-item color-match text-light">Sort by New</a></li>
                    <li type="button"><a class="dropdown-item">Sort By Old</a></li>
                    <li type="button"><a class="dropdown-item color-match text-light">Past</a></li>
                    <li type="button"><a class="dropdown-item">Future</a></li>
                </ul>
            </div>
        </div>
        
    </div>
    <div class="row w-100">
        <div v-for="player in participatedIn" :key="player.id" class="col-10 col-sm-5 col-md-4 col-lg-3 m-3 account-info-card px-0">
            <img v-if="player.tournament.imgUrl" :src="player.tournament.imgUrl" class="w-100 h-75 tournament-image">
            <img v-else-if="!player.tournament.imgUrl && player.tournament.gameImg" :src="player.tournament.gameImg" class="w-100 h-75 tournament-image">
            <img v-else-if="!player.tournament.imgUrl && !player.tournament.gameImg" src="src/assets/img/valorPanda.png" class="w-100 h-75 tournament-image">
            <div class="d-flex flex-column justify-content-between">
                <p class="fs-5 ps-2 text-light">{{ player.tournament.name }}</p>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { playersService } from '../services/PlayersService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
export default {
    setup(){
    onMounted(()=>{
        AppState.tournamentsParticipatedIn = [],
        getParticipatedIn()
    })
    async function getParticipatedIn(){
        try {
            const accountId = AppState.account.id
            await playersService.getParticipatedIn(accountId)
            logger.log(AppState.tournamentsParticipatedIn)
        } catch (error) {
            Pop.error(error)
            logger.error(error)
        }
    }
    return {
        account: computed(() => AppState.account),
        participatedIn: computed(()=> AppState.tournamentsParticipatedIn),
    }
    }
};
</script>


<style lang="scss" scoped>
.account-info-card{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
height: 19vh;
}
.color-match{
background-color: #2ca58d;
}
.tournament-image{
    object-fit: cover;
    object-position: center;
}
@media(max-width:1400px){
.account-info-card{
    height:20vh;
}
}
@media(max-width:824px){
    .account-info-card{
        height: 40vh;
    }
}
</style>