<template>
  

        <div class="coolBg p-3 rounded text-light">   
            <!--  flip the isLive boolean with $gt -->
            {{ tournament.name }}
            <p class="text-white">
                show
            </p>
        </div>
    
</template>


<script>


import { Tournament } from '../models/Tournament';


export default {
    props: {tournament: {type: Tournament, required: true}},
    setup(){
        
        
    return { 
        
     }
    }
};
</script>


<style lang="scss" scoped>

.coolBg {
    background-color: #444444;
}
</style>