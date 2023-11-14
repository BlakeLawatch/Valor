<template>
  <div class="container-fluid">
    <section v-if="profile.id" class="row justify-content-center text-light">
      <ProfileCardVue/>
    </section>
    <div v-if="profile.id" class="row pt-5 justify-content-center">
      <div class="col-10">
        <!-- NOTE this is where tournaments you created go -->
          <TournamentsCreatedByMe/>
      </div>
      <div v-if="profile.id" class="col-10">
        <!-- NOTE this is where your tickets are drawn -->
        <TournamentsParticipatedIn/>
      </div>
      <div v-if="profile.id" class="col-10">
      <!-- NOTE this is where clips can go -->
      <MyClips/>
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
import MyClips from '../components/MyClips.vue';

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
  components: { ProfileCardVue, TournamentsCreatedByMe, TournamentsParticipatedIn, MyClips }
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
