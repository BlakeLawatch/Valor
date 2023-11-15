<template>
    <div class="row text-light p-2 w-100">
        <div class="d-flex">
            <p class="fs-5">Tournaments that <span class="word-break">{{ profile.name }}</span> has participated in:</p>
            <div class="dropdown">
                <button class="btn color-match dropdown-toggle ms-2" title="Sort" type="button" id="filterMyTickets" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul class="dropdown-menu" aria-labelledby="filterMyTickets">
                    <li @click="sortByNew()" title="Sort New" type="button"><a class="dropdown-item color-match text-light">Sort by Future</a></li>
                    <li @click="sortByOld()" title="Sort Old" type="button"><a class="dropdown-item">Sort By Past</a></li>
                </ul>
            </div>
        </div>
        
    </div>
    <div class="row w-100">
        <div v-for="player in participatedIn" title="View Tournament Info" :key="player.id" class="col-10 col-sm-5 col-md-4 col-lg-3 m-3 account-info-card px-0">
          <div v-if="player.tournament">
            <router-link :to="{name: 'TournamentInfoPage', params: {tournamentId: player.tournament.id}}"> 
                <img v-if="player.tournament.imgUrl" :src="player.tournament.imgUrl" class="w-100 tournament-image">
                <img v-else-if="!player.tournament.imgUrl && player.tournament.gameImg" :src="player.tournament.gameImg" class="w-100 tournament-image">
                <img v-else src="../assets/img/valorPanda.png" class="w-100 tournament-image">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="fs-5 ps-2 mb-0 text-light word-break">{{ player.tournament.name }}</p>
                    <div v-if="profile.id == account.id" class="m-1">
                        <button @click.prevent="unregister(player.id)" class="btn btn-danger" title="Stop Attending"><i class="mdi mdi-delete"></i></button>
                    </div>
                </div>
            </router-link>
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
import { tournamentsService } from '../services/TournamentsService';
export default {
    setup(){
    onMounted(()=>{
        getParticipatedIn()
    })
    async function getParticipatedIn(){
        try {
            const accountId = AppState.profile.id
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
        profile: computed(()=> AppState.profile),
        async sortByNew(){
            try {
                await tournamentsService.sortByNew()
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        },
        async sortByOld(){
            try {
                await tournamentsService.sortByOld()
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        },
        async sortByDefault(){
            try {
                await tournamentsService.sortByDefault()
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        },
        async unregister(playerId){
            try {
                const yes = await Pop.confirm(`Are you sure you no longer want to participate in this tournament?`)
                if(!yes){return}
                await playersService.unregister(playerId)
            } catch (error) {
                Pop.error(error)
                logger.error(error)
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
.word-break{
    word-break: break-all;
}
.color-match{
background-color: #2ca58d;
}
.tournament-image{
    object-fit: cover;
    object-position: center;
    height: 12rem;
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