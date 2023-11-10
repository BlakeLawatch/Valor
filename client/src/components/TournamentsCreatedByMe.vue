<template>
<div v-for="tournament in mytournaments" :key="tournament.id" class="col-3 m-3 account-info-card">
    <p class="fs-5 text-center text-light">{{ tournament.name }}</p>
</div>
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
            getMyTournaments()
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
        mytournaments: computed(() => AppState.myTournaments)
    }
    }
};
</script>


<style lang="scss" scoped>
.account-info-card{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
height: 10vh;
}
</style>