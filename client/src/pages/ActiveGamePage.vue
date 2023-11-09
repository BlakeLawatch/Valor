<template>
    <!-- TODO MAKE THIS PAGE LOOK GOOD -->
    <div class="container-fluid">
        <section class="row p-3">
            <div class="col-12">
                <div class="dark-bg rounded p-3">
<div class="text-center rounded card-bg">
    <p class="text-white">
        {{ game.name }}
    </p>
    <img :src="game.cover.url" alt="">
    <div class="text-start p-3">
        <p class="text-white fs-2">
            Search Tournament By
        </p>
        <form class="form-inline d-flex">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success mx-3 my-2 my-sm-0" type="submit">Search</button>
  </form>
    </div>
</div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { logger } from '../utils/Logger';
import { gamesService } from '../services/GamesService';
export default {
    setup(){
        const route = useRoute()
        watchEffect(()=>{
            route
            getGameById()
        }
        )
        async function getGameById(){
            await gamesService.getGameById(route.params.gameId)
        }
    return { 
game: computed(()=> AppState.activeGame)

     }
    }
};
</script>


<style lang="scss" scoped>

.dark-bg{
    background-color: #242726;
}

.card-bg{
    background-color: #444444;
}

</style>