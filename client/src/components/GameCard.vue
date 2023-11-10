<template>
    <!-- TODO make imgs have better quality. Read up on api cover section -->
    <div class="coolBg p-3 rounded">
        <RouterLink :to="{name: 'ActiveGame', params: {gameId: game.id}}">
            <p class="text-white text-center">{{ game.name }}</p>
            <img v-if="game.cover?.url" :src="game.cover?.url" alt="">
            <img v-else src="src/assets/img/valorPanda.png">
        </RouterLink>
    </div>
</template>


<script>
import { Game } from '../models/Game';
import { RouterLink, useRouter } from 'vue-router';
export default {
    props: {
        game: { type: Game, required: true }
    },
    setup() {
        const router = useRouter();
        return {
            router
        };
    },
    components: { RouterLink }
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