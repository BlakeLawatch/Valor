<template>
    <div class="modal fade" id="createTournamentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Tournament Name</label>
                <input type="text" class="form-control" id="name" required maxlength="75">
            </div>
            <div class="d-flex mb-3">
              <input v-model="gameEditable" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
              <button @click="getGameOptions(gameEditable)" :disabled="gameEditable == ''" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label"></label>
                <textarea name="description" id="" cols="55" rows="8" maxlength="1000" placeholder="description..."></textarea>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import { ref } from 'vue';
import { gamesService } from '../services/GamesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
    setup(){
      const gameEditable = ref('')
    return { 
      gameEditable,
async getGameOptions(gameEditable){
  try {
    logger.log('game', gameEditable)
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

</style>