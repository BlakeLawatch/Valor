<template>
  <div class="col-10 mt-4 d-flex flex-column justify-content-end rounded" :style="{backgroundImage: `url(${profile.coverImg})`, objectPosition: `center`, objectFit: `cover`, backgroundSize: `cover`}">
    <div>
        <img class="rounded-circle account-picture" :src="profile.picture" alt="" />
    </div>
    <div class="row account-info-card d-flex rounded-bottom">
      <div class=".col-12 text-md-end text-center fs-2 order-md-1 order-3 p-md-2">
        <a :href="profile.facebookUrl"><i v-if="profile.facebookUrl" title="Facebook" class="mdi mdi-facebook px-1"></i></a>
        <a :href="profile.twitchUrl"><i v-if="profile.twitchUrl" title="Twitch" class="mdi mdi-twitch px-1"></i></a>
        <a :href="profile.instagramUrl"><i v-if="profile.instagramUrl" title="Instagram" class="mdi mdi-instagram px-1"></i></a>
        <a :href="profile.websiteUrl"><i v-if="profile.websiteUrl" title="Personal Website" class="mdi mdi-web px-1"></i></a>
        <a :href="profile.youtubeUrl"><i v-if="profile.youtubeUrl" title="Youtube" class="mdi mdi-youtube px-1"></i></a>
        <a :href="profile.twitterUrl"><i v-if="profile.twitterUrl" title="Twitter" class="mdi mdi-twitter px-1"></i></a>
      </div>
        <div class=" col-12 pt-4 pt-md-2 px-3 px-md-4 d-flex flex-column order-md-2 order-2">
        <h1 class="pt-5 pt-0-md mb-2 text-start word-break">{{ profile.name }}</h1>
        <p class="text-start word-break">{{ profile.bio }}</p>
        </div>
        <div class="col-12 px-0 col-md-4 fs-1 text-end d-flex flex-column justify-content-between order-md-3 order-3">
          <div v-if="account.id == profile.id" class="d-flex justify-content-end p-3 align-items-end">
              <button type="button" title="Edit Account" class="btn color-match text-light me-1 text-end" data-bs-toggle="modal" data-bs-target="#accountModal">
                  Edit
              </button>
              <EditAccountModal/>
          </div>
        
        </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed} from 'vue';
import EditAccountModal from './editAccountModal.vue';
export default {
    setup() {
        return {
            account: computed(() => AppState.account),
            profile: computed(()=> AppState.profile),
        };
    },
    components: { EditAccountModal }
};
</script>


<style lang="scss" scoped>

.account-picture{
height: 11rem;
width: 11rem;
position: relative;
right:-1%;
top: 45%;
}
.word-break{
    word-break: break-all;
}

.account-info-card{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
max-height: max-content;
justify-content: end;
}
@media (max-width: 823px){
.account-picture{
height: 11rem;
width: 11rem;
top: 40%;
right: -20%;
}
.account-info-card{
max-height: max-content;
justify-content: center;
}

}

.color-match{
background-color: #2ca58d;
}
</style>