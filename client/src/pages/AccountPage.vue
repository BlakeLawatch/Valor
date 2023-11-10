<template>
  <div class="container-fluid">
    <section v-if="account.id" class="row justify-content-center text-light">
      <ProfileCardVue/>
    </section>
    <div class="row justify-content-center pt-5">
      <div class="col-10 account-info-card p-3">
        <p class="fs-5 text-light">{{ account.name }}'s tournaments:</p>
        <div v-if="account.id" class="row">
          <TournamentsCreatedByMe/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import ProfileCardVue from '../components/ProfileCard.vue'
import TournamentsCreatedByMe from '../components/TournamentsCreatedByMe.vue';

export default {
  setup() {
    return {
      account: computed(() => AppState.account),
    }
  },
  components: { ProfileCardVue, TournamentsCreatedByMe }
}
</script>

<style scoped>
.account-info-card{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
max-height: 60vh;
}
</style>
