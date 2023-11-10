<template>
    <div class="coolBg p-3 rounded" v-for="activeTournament in activeTournaments" :key="activeTournament">
        {{ activeTournament }}
    </div>
</template>


<script>
import { computed, onMounted} from 'vue';
import { Tournament } from '../models/Tournament';
import{AppState} from '../AppState'
import { tournamentsService } from '../services/TournamentsService';
import Pop from '../utils/Pop';


export default {
    props: {activeTournament: {type: Tournament, required: true}},
    setup(){

        async function getActiveTournaments(){
        try {
          await tournamentsService.getActiveTournaments()      
        } catch (error) {
          Pop.error(error)
        }
      }


        onMounted(()=>{
          getActiveTournaments()
        })

        
    return { 
        tournament: computed(()=> AppState.activeTournaments)
     }
    }
};
</script>


<style lang="scss" scoped>

</style>