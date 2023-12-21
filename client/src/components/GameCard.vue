<template>
    <!-- TODO make imgs have better quality. Read up on api cover section -->
    <RouterLink :to="{ name: 'ActiveGame', params: { gameId: game.id } }" :title="game.name">
        <div class="row coolBg rounded mx-1">
            <div class="col-12 my-2">
                <p class="text-white text-center">{{ game.name }}</p>
            </div>
            <img class="rounded-bottom" v-if="game.cover?.url" :src="game.cover?.url" alt="">
            <img v-else :src="logo_img">
        </div>
    </RouterLink>
</template>


<script>
import { Game } from '../models/Game';
import { RouterLink, useRouter } from 'vue-router';
import logo_img from '../assets/img/panda.png'
export default {
    props: {
        game: { type: Game, required: true }
    },
    setup() {
        const router = useRouter();
        return {
            router,
            logo_img,
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
    margin: 0;
    padding: 0;
}

p {
    margin-bottom: 0;
}
</style>