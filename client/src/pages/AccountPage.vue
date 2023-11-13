<template>
  <div class="container-fluid">
    <section v-if="profile.id" class="row justify-content-center text-light">
      <ProfileCardVue/>
    </section>
    <div class="row pt-5 justify-content-center">
      <div class="col-10">
        <div class="text-light p-2 d-flex">
          <p class="fs-5">{{ profile.name }}'s tournaments:</p>
          <div class="dropdown">
            <button class="btn color-match dropdown-toggle ms-2" type="button" id="filterMyTournaments" data-bs-toggle="dropdown" aria-expanded="false"></button>
            <ul class="dropdown-menu" aria-labelledby="filterMyTournaments">
              <li><a class="dropdown-item color-match text-light" href="#">Sort by New</a></li>
              <li><a class="dropdown-item" href="#">Sort By Old</a></li>
            </ul>
          </div>
        </div>
        <div v-if="profile.id" class="row w-100">
          <TournamentsCreatedByMe/>
        </div>
      </div>
      <div v-if="profile.id" class="col-10">
        <!-- NOTE take things to put in component from here so you can properly v-if them -->
        <TournamentsParticipatedIn/>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { AppState } from '../AppState';
import ProfileCardVue from '../components/ProfileCard.vue'
import TournamentsCreatedByMe from '../components/TournamentsCreatedByMe.vue';
import TournamentsParticipatedIn from '../components/TournamentsParticipatedIn.vue';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { accountService } from '../services/AccountService';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute()
    onMounted(()=>{
      AppState.profile = {},
      getProfileById()
    })
    onUnmounted(()=>{
      AppState.profile = {}
    })
    async function getProfileById(){
      try {
        const profileId = route.params.accountId
        await accountService.getProfileById(profileId)
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }
    return {
      account: computed(() => AppState.account),
      profile: computed(()=> AppState.profile),
      
    }
  },
  components: { ProfileCardVue, TournamentsCreatedByMe, TournamentsParticipatedIn }
}
</script>

<style scoped>
.account-info-card{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
max-height: 60rem;
}
.color-match{
background-color: #2ca58d;
}
</style>
