<template>
  <RouterLink :to="{ name: 'TournamentInfoPage', params: { tournamentId: tournament.id } }">
    <section class="row coolBg p-2 rounded text-light card-shadow">
      <!--  flip the isLive boolean with $gt -->
      <div v-if="tournament.imgUrl"
        class="col-12 col-md-6 p-0 tournament-image d-flex justify-content-end align-items-end"
        :style="{ backgroundImage: `url(${tournament.imgUrl})` }">
        <img class="p-0 m-0 game-image rounded-circle" :src="tournament.gameImg" alt="Game Image">
      </div>
      <div v-else-if="!tournament.imgUrl"
        class="col-12 col-md-6 p-0 tournament-bad-image d-flex justify-content-end align-items-end">
        <img class="p-0 m-0 game-image rounded-circle" :src="tournament.gameImg" alt="Game Image">
      </div>
      <div class="col-12 col-md-6 ps-md-3">
        <p class="tournament-name word-break fs-4 mb-2">{{ tournament.name }}</p>
        <p class="fs-5 mb-1">{{ tournament.gameName }}</p>
        <p class="word-break">{{ tournament.address }}</p>
        <p v-if="tournament.endDate == null">{{ tournament.startDate.toLocaleDateString() }}</p>
        <p v-else>{{ tournament.startDate.toLocaleDateString() }} - {{ tournament.endDate.toLocaleDateString()
        }}</p>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <small v-if="tournament.entryPrice > 0" class="">Entry Fee: $<span class="word-break">{{ tournament.entryPrice
          }}</span></small>
          <small v-else class="">No Entry Fee</small>
          <small v-if="tournament.capacity"> Total Capacity: {{ tournament.capacity }}</small>
        </div>
      </div>
    </section>
  </RouterLink>
</template>


<script>


import { RouterLink } from 'vue-router';
import { Tournament } from '../models/Tournament';
import logo_img from '../assets/img/panda.png'
import { computed } from 'vue';


export default {
  props: { tournament: { type: Tournament, required: true } },
  setup() {
    return {
      logo: computed(() => `url(${logo_img})`),
    };
  },
  components: { RouterLink }
};
</script>


<style lang="scss" scoped>
img {
  height: 10rem;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.word-break {
  word-break: break-all;
}

.coolBg {
  background-color: #444444;
}

.card-shadow {
  box-shadow: 1px 1px 8px black;
}

p {
  margin-bottom: 0;
}

.tournament-name {
  text-transform: capitalize;
}

.tournament-image {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 10rem;
}

.tournament-bad-image {
  background-image: v-bind(logo);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 10rem;
}

.game-image {
  object-fit: cover;
  object-position: center;
  box-shadow: 0px 3px 7px black;
  border: 2.5px solid #2ca58d;
  background-color: #2ca58d;
  height: 6rem;
  width: 6rem;
}
</style>