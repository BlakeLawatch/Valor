<template>
<div v-for="tournament in mytournaments" :key="tournament.id" class="col-10 col-sm-5 col-md-4 col-lg-3 m-3 account-info-card px-0">
    <img v-if="tournament.imgUrl" :scr="tournament.imgUrl" class="tournament-image w-100 h-50"/>
    <img v-else-if="!tournament.imgUrl && tournament.gameImg" :src="tournament.gameImg" class="tournament-image w-100 h-50"/>
    <img v-else-if="!tournament.imgUrl && !tournament.gameImg" src="https://plus.unsplash.com/premium_photo-1695717076798-404f76f121da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFuZGF8ZW58MHx8MHx8fDA%3D" class="tournament-image w-100 h-50"/>
    <div class="h-50 d-flex flex-column justify-content-between">
        <p class="fs-5 ps-2 text-light">{{ tournament.name }}</p>
    <div class="w-100 d-flex justify-content-end pe-2 pb-1">
        <button class="btn color-match text-light"> Edit</button>
    </div>
    </div>
</div>
<div v-if="mytournaments == []">{{ account.name }} has not created any tournaments</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
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
            const accountId = AppState.account.id
            await tournamentsService.getMyTournaments(accountId)
        } catch (error) {
            Pop.error(error)
            logger.error(error)
        }
    }
    return {  
        mytournaments: computed(() => AppState.myTournaments),
        account: computed(()=> AppState.account)
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
.tournament-image{
    object-fit: cover;
    object-position: center;
}
.color-match{
background-color: #2ca58d;
}
@media(max-width:1400px){
.account-info-card{
    height:25vh;
}
}
@media(max-width:824px){
    .account-info-card{
        height: 30vh;
    }
}
</style>