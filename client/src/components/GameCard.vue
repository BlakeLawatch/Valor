<template>
    <!-- TODO make imgs have better quality. Read up on api cover section -->
    <div class="coolBg">
        <p class="text-white">{{ game.name }}</p>
        <img  :src="game.coverImg" alt="">
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Game } from '../models/Game';
export default {
    props: {
        game: {type: Game, required: true}
    },
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>
.coolBg {
    background-color: #444444;
}

img {
    height: 10rem;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>