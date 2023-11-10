<template>
  

        <div v-if="tournament.startDate > Date.now() && tournament.endDate < Date.now()"  class="coolBg p-3 rounded text-light">   
            <!--  flip the isLive boolean with $gt -->
            <section class="row">
                <div class="col-12 col-md-6">
                    <img :src="tournament.gameImg" alt="">
                </div>
                <div class="col-6 col-md-3">
                    <h2>{{ tournament.name }}</h2>
                    <h4 class="mt-5">{{ tournament.gameName }}</h4>
                    <h5 v-if="tournament.capacity"> Total Capacity: {{ tournament.capacity }}</h5>
                </div>
                <div class="col-6 col-md-3">
                    <h5 class="text-center">{{ tournament.address }}</h5>
                    <h5>{{ tournament.startDate.toLocaleDateString() }} - {{ tournament.endDate.toLocaleDateString() }}</h5>
                    <p v-if="tournament.entryPrice > 0" class="fs-2 text-center mt-5">Entry Fee: ${{ tournament.entryPrice }}</p>
                    <p v-else class="fs-2 text-center mt-5">No Entry Fee</p>
                </div>
            </section>
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