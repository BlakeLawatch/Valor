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
      <div class="col-9">
        <div class="text-light p-2 d-flex">
          <p class="fs-5">Tournaments that {{ account.name }} has participated in:</p>
          <div class="ms-2">
            <button class="btn color-match text-light"><i class="mdi mdi-arrow-down"></i></button>
          </div>
        </div>
        <div v-if="account.id" class="row w-100">
          <div class="col-10 col-sm-5 col-md-4 col-lg-3 m-3 account-info-card px-0">
            <p>Tournament</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
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
.color-match{
background-color: #2ca58d;
}
</style>
