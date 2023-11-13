<template>
<div v-for="tournament in myTournaments" :key="tournament.id" class="col-12 col-sm-5 col-md-4 col-lg-3 m-3 account-info-card px-0">
    <img v-if="tournament.imgUrl" :scr="tournament.imgUrl" class="tournament-image w-100 h-75"/>
    <img v-else-if="!tournament.imgUrl && tournament.gameImg" :src="tournament.gameImg" class="tournament-image w-100"/>
    <div class="d-flex flex-column justify-content-between">
        <p class="fs-5 ps-2 text-light text-center pt-2">{{ tournament.name }}</p>
    <div v-if="tournament.creatorId == account.id" class="w-100 d-flex justify-content-end pe-2 pb-1">
        <RouterLink :to="{name: 'ManageTournament', params: {tournamentId: tournament.id}}">
            <button class="btn color-match text-light"> Edit</button>
        </RouterLink>
    </div>
    </div>
</div>
<div v-if="myTournaments == []">{{ profile.name }} has not created any tournaments</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted} from 'vue';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { tournamentsService } from '../services/TournamentsService';
export default {
    setup(){
        onMounted(()=>{
            if(AppState.myTournaments != []){
                getMyTournaments()
            }
        })
    async function getMyTournaments(){
        try {
            // debugger
            const accountId = AppState.profile.id
            await tournamentsService.getMyTournaments(accountId)
        } catch (error) {
            Pop.error(error)
            logger.error(error)
        }
    }
    return {  
        myTournaments: computed(() => AppState.myTournaments),
        account: computed(()=> AppState.account),
        profile: computed(()=> AppState.profile)
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