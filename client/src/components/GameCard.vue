<template>
    <!-- TODO make imgs have better quality. Read up on api cover section -->
    <div class="coolBg p-3 rounded">
        <RouterLink :to="{name: 'ActiveGame', params: {gameId: game.id}}">
            <p class="text-white text-center">{{ game.name }}</p>
            <img :src="game.coverImg" alt="">
        </RouterLink>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
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