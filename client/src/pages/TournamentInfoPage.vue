<template>
<h1 class="p-5 text-light">Tournament Info Page</h1>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import {tournamentsService} from "../services/TournamentsService.js"

export default {
  setup(){
    const route = useRoute()
    async function getTournamentById(){
      try {
        const tournamentId = route.params.tournamentId
        await tournamentsService.getTournamentById(tournamentId)
      } 
      catch (error) {
        Pop.error(error)
      }
    }
    return {

    }
  }
};
</script>


<style lang="scss" scoped>

</style>