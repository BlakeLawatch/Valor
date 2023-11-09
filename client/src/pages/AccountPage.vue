<template>
  <div class="container-fluid">
    <section class="row justify-content-center text-light">
      <div class="col-10 px-0 mt-4 account-info-card">
        <img :src="account.coverImg" class="cover-image w-100">
        <img class="rounded-circle account-picture" :src="account.picture" alt="" />
        <section class="row">
          <div class=" col-12 col-md-8 p-4">
            <h1>{{ account.name }}</h1>
            <h5>{{ account.bio }}</h5>
          </div>
          <div class="col-12 col-md-4 fs-1 px-3">
            <a :href="account.facebookUrl"><i v-if="account.facebookUrl" class="mdi mdi-facebook"></i></a>
            <a :href="account.twitchUrl"><i v-if="account.twitchUrl" class="mdi mdi-twitch"></i></a>
            <a :href="account.instagramUrl"><i v-if="account.instagramUrl" class="mdi mdi-instagram"></i></a>
            <a :href="account.websiteUrl"><i v-if="account.websiteUrl" class="mdi mdi-web"></i></a>
            <a :href="account.youtubeUrl"><i v-if="account.youtubeUrl" class="mdi mdi-youtube"></i></a>
            <a :href="account.twitterUrl"><i v-if="account.twitterUrl" class="mdi mdi-twitter"></i></a>
            <div class="text-end mx-2">
              <button class="btn color-match text-light p-2">Edit Account</button>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
.cover-image{
  height: 30vh;
  object-fit: cover;
  object-position: center;
}
.account-picture{
  height: 15vh;
  width: 20vh;
  box-shadow: 2px 2px 2px white;
  position: relative;
  right: -2%;
  top: -10%;
}
.account-image-card{
  position: relative;
  right: -2%;
  top: -27%;
  width: 98%
}
.account-info-card{
  background-color: rgb(68, 68, 68);
  box-shadow: 0px 5px 6px black;
  max-height: 60vh;
}
@media (max-width: 823px){
.account-picture{
  height: 10vh;
  width: 13vh;
}
.account-image-card{
  position: relative;
  right: -2%;
  top: -20%;
}
.cover-image{
  height: 15vh;
  object-fit: cover;
  object-position: center;
}
.account-info-card{
  max-height: max-content;
}
}

.color-match{
  background-color: #2ca58d;
}
</style>

<!-- <div class="col-10 mt-5 account-info-card px-0 d-flex flex-column justify-content-between">
        <img :src="account.coverImg" class="cover-image w-100">
        <h1 class="text-light text-center pt-3">{{ account.name }}</h1>
        <div class="account-image-card px-0 d-flex flex-column">
          <div class="order-1">
            <img class="rounded-circle account-picture" :src="account.picture" alt="" />
          </div>
          <div class="order-2">
            <p class="text-light ps-5 pt-4">{{ account.bio }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod rem doloribus distinctio vitae et unde, iusto repellendus placeat doloremque aliquid velit odit cum quisquam quidem alias tempore a quia nisi.</p>
          </div>
          <div class="d-flex align-items-center order-3">
            <p class="ps-5 pe-2 pt-3">Find Me At:</p>
          <a class="p-1" v-if="account.facebookUrl"><i class="mdi mdi-facebook"></i></a>
          <a class="p-1" v-if="account.twitchUrl"><i class="mdi mdi-twitch"></i></a>
          <a class="p-1" v-if="account.twitterUrl"><i class="mdi mdi-twitter"></i></a>
          <a class="p-1" v-if="account.instagramUrl"><i class="mdi mdi-instagram"></i></a>
          <a class="p-1" v-if="account.websiteUrl"><i class="mdi mdi-web"></i></a>
          <a class="p-1" v-if="account.youtubeUrl"><i class="mdi mdi-youtube"></i></a>
          </div>
          <div class="d-flex justify-content-end order-4">
            <button class="btn btn-success m-3">Edit</button>
          </div>
        </div>
      </div> -->