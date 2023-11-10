<template>
    <div class="text-light p-2 d-flex w-100">
        <p class="fs-5">Tournaments that {{ account.name }} has participated in:</p>
        <div class="ms-2">
            <button class="btn color-match text-light"><i class="mdi mdi-arrow-down"></i></button>
        </div>
    </div>
    <div class="row w-100">
        <div v-for="tournament in participatedIn" :key="tournament.id" class="col-10 col-sm-5 col-md-4 col-lg-3 m-3 account-info-card px-0">
            <h1>Tournament</h1>
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