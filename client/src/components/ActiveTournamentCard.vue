<template>
  <RouterLink :to="{ name: 'TournamentInfoPage', params: { tournamentId: tournament.id } }">
    <section class="row coolBg p-2 rounded text-light">
      <!--  flip the isLive boolean with $gt -->
      <div class="col-12 col-md-6 p-0">
          <img class="p-0 m-0" :src="tournament.gameImg" alt="Game Image">
      </div>
      <div class="col-12 col-md-6">
          <p class="tournament-name word-break">{{ tournament.name }}</p>
          <p>{{ tournament.gameName }}</p>
          <p v-if="tournament.capacity"> Total Capacity: {{ tournament.capacity }}</p>
          <p class="word-break">{{ tournament.address }}</p>
          <p v-if="tournament.endDate == null">{{ tournament.startDate.toLocaleDateString() }}</p>
          <p v-else>{{ tournament.startDate.toLocaleDateString() }} - {{ tournament.endDate.toLocaleDateString()
          }}</p>
          <p v-if="tournament.entryPrice > 0" class="">Entry Fee: $<span class="word-break">{{ tournament.entryPrice }}</span></p>
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
.word-break{
  word-break: break-all;
}

.coolBg {
    background-color: #444444;
}

p{
  margin-bottom: 0;
}
.tournament-name{
  text-transform: capitalize;
}
</style>