<template>
  <div class="container-fluid">
    <section v-if="account.id" class="row justify-content-center text-light">
      <ProfileCardVue/>
    </section>
    <div class="row justify-content-center pt-5">
      <div class="col-9">
        <div class="text-light p-2 d-flex">
          <p class="fs-5">{{ account.name }}'s tournaments:</p>
          <div class="ms-2">
            <button class="btn color-match text-light"><i class="mdi mdi-arrow-down"></i></button>
          </div>
        </div>
        <div v-if="account.id" class="row w-100">
          <TournamentsCreatedByMe/>
        </div>
      </div>
      <div v-if="account.id" class="col-9">
        <!-- NOTE take things to put in component from here so you can properly v-if them -->
        <TournamentsParticipatedIn/>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted } from 'vue';
import { AppState } from '../AppState';
import ProfileCardVue from '../components/ProfileCard.vue'
import TournamentsCreatedByMe from '../components/TournamentsCreatedByMe.vue';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import {playersService} from '../services/PlayersService.js'
import TournamentsParticipatedIn from '../components/TournamentsParticipatedIn.vue';

export default {
  setup() {
    return {
      account: computed(() => AppState.account),
    }
  },
  components: { ProfileCardVue, TournamentsCreatedByMe, TournamentsParticipatedIn }
}
</script>

<style scoped>
.account-info-card{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
max-height: 60vh;
}
.color-match{
background-color: #2ca58d;
}
</style>
