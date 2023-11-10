<template>
    <div class="coolBg p-3 rounded text-light" v-for="tournament in tournaments" :key="tournament">   
        <!--  flip the isLive boolean with $gt -->
        {{ tournament.name }}
    </div>
</template>


<script>
import { computed, onMounted} from 'vue';
import{AppState} from '../AppState'
import { tournamentsService } from '../services/TournamentsService';
import Pop from '../utils/Pop';


export default {
    setup(){
        onMounted(()=>{
          getActiveTournaments()
        })



        async function getActiveTournaments(){
        try {
          await tournamentsService.getActiveTournaments()      
        } catch (error) {
          Pop.error(error)
        }
      }
        
    return { 
        tournaments: computed(()=> AppState.activeTournaments)
     }
    }
};
</script>


<style lang="scss" scoped>

.coolBg {
    background-color: #444444;
}
</style>