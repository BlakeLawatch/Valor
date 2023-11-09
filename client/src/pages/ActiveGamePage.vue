<template>
    <div class="container-fluid">
        <section class="row">
            <div class="col-12">
                <p class="text-white">
the game should be: 
                    {{ game.name }}
                </p>
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

</style>