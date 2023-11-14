<template>
  <RouterLink :to="{ name: 'TournamentInfoPage', params: { tournamentId: tournament.id } }">
    <section class="row coolBg p-2 rounded text-light">
      <!--  flip the isLive boolean with $gt -->
      <div class="col-12 col-md-6">
          <img class="img-fluid" :src="tournament.gameImg" alt="">
      </div>
      <div class="col-6 col-md-3">
          <p>{{ tournament.name }}</p>
          <p>{{ tournament.gameName }}</p>
          <p v-if="tournament.capacity"> Total Capacity: {{ tournament.capacity }}</p>
      </div>
      <div class="col-6 col-md-3 text-center">
          <p>{{ tournament.address }}</p>
          <p v-if="tournament.endDate == null">{{ tournament.startDate.toLocaleDateString() }}</p>
          <p v-else>{{ tournament.startDate.toLocaleDateString() }} - {{ tournament.endDate.toLocaleDateString()
          }}</p>
          <p v-if="tournament.entryPrice > 0" class="">Entry Fee: ${{ tournament.entryPrice }}</p>
          <p v-else class="">No Entry Fee</p>
      </div>
    </section>
  </RouterLink>
</template>


<script>


import { RouterLink } from 'vue-router';
import { Tournament } from '../models/Tournament';


export default {
    props: { tournament: { type: Tournament, required: true } },
    setup() {
        return {};
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

.coolBg {
    background-color: #444444;
}
</style>