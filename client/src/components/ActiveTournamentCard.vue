<template>
    <div class="coolBg p-3 rounded">
        {{ activeTournament }}
    </div>
</template>


<script>
import { computed} from 'vue';
import { Tournament } from '../models/Tournament';
import{AppState} from '../AppState'


export default {
    props: {activeTournament: {type: Tournament, required: true}},
    setup(){

        
    return { 
        tournament: computed(()=> AppState.activeTournaments)
     }
    }
};
</script>


<style lang="scss" scoped>

</style>