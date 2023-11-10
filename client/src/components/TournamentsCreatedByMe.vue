<template>
<div v-for="tournament in mytournaments" :key="tournament.id" class="col-2">
    <p>{{ tournament.name }}</p>
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

</style>