<template>
  

        <div class="coolBg p-3 rounded text-light text-center">   
            <!--  flip the isLive boolean with $gt -->
            <img :src="tournament.gameImg" alt="">
            <p>{{ tournament.name }}</p>
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

img {
    height: 10rem;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.coolBg {
    background-color: #444444;
}
</style>