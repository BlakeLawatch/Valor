<template>
    <div class="modal fade" id="createTournamentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content main-bg text-white">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Create Tournament</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createTournament()">
            <div class="mb-3">
                <label for="name" class="form-label">Tournament Name</label>
                <input v-model="formEditable.name" type="text" placeholder="name" class="form-control" id="name" required maxlength="75">
            </div>
            <div class=" mb-3">
              <label for="name" class="form-label">Search for a Game</label>
              <div class="d-flex">
                <input v-model="gameEditable" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button @click="getGameOptions(gameEditable)" :disabled="gameEditable == ''" class="btn button-color my-2 my-sm-0" type="button">Search</button>
              </div>
            </div>
            <div v-if="formGames.length > 0">

              <div class="mb-3" >
                <label for="name" class="form-label">Select a Game</label>
                <select v-model="selectedGame" class="form-select" aria-label="Default select example">
                <option v-for="game in formGames" :key="game.id"> {{ game.name }}</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label"></label>
                <textarea v-model="formEditable.description" name="description" class="rounded" required id="" cols="60" rows="8" maxlength="1000" placeholder="description..."></textarea>
            </div>
           <div class="d-flex justify-content-end">
             <button type="submit" :disabled="selectedGame == '' " class="btn button-color ">Submit</button>

           </div>
            
          </form>
        </div>
      </div>
  </div>
</div>
</template>


<script>
import { computed, ref } from 'vue';
import { gamesService } from '../services/GamesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import {tournamentsService} from '../services/TournamentsService'
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';


export default {
    setup(){
      const selectedGame = ref('')
      const gameEditable = ref('')
      const formEditable = ref({})
      const router = useRouter()
    return { 
      router,
      formEditable,
      selectedGame,
      gameEditable,
    formGames: computed(()=> AppState.createFormGames),
    async createTournament(){
      try {
        const game = AppState.createFormGames.find(g=> g.name == selectedGame.value)
        const body = formEditable.value
        body.gameId = game.id
        body.gameName = game.name
        body.gameImg = game.cover.url
         const newTournament = await tournamentsService.createTournament(body)
         Modal.getOrCreateInstance('#createTournamentModal').hide()
         selectedGame.value = ''
         gameEditable.value = ''
         formEditable.value = {}
         AppState.createFormGames = []
         router.push({name: 'ManageTournament', params:{tournamentId: newTournament.id }})
      } catch (error) {
        Pop.error(error)
      }

    },
async getGameOptions(gameEditable){
  try {
    await gamesService.getGameOptions( gameEditable)  
  } catch (error) {
    Pop.error(error)
  }
}

     }
    }
};
</script>


<style lang="scss" scoped>
textarea{
  resize: none;
}

.button-color{
  background-color: #2CA58D;
}

.main-bg{
  background-color: #2E3233;
}

</style>