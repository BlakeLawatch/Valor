<template>
    <div class="col-10 mt-4" :style="{backgroundImage: `url(${account.coverImg})`, objectPosition: `center`, objectFit: `cover`, backgroundSize: `cover`}">
        <img class="rounded-circle account-picture" :src="account.picture" alt="" />
        <div class="row account-info-card d-flex justify-content-end">
            <div class=" col-12 col-md-7 p-4 pe-2 d-flex flex-column">
            <h1 class=" pt-5 pt-0-md text-start">{{ account.name }}</h1>
            <p class="text-start">{{ account.bio }}</p>
            </div>
            <div class="col-12 px-0 col-md-4 fs-1 text-end d-flex flex-column justify-content-between">
                <div>
                    <a :href="account.facebookUrl"><i v-if="account.facebookUrl" class="mdi mdi-facebook"></i></a>
                    <a :href="account.twitchUrl"><i v-if="account.twitchUrl" class="mdi mdi-twitch"></i></a>
                    <a :href="account.instagramUrl"><i v-if="account.instagramUrl" class="mdi mdi-instagram"></i></a>
                    <a :href="account.websiteUrl"><i v-if="account.websiteUrl" class="mdi mdi-web"></i></a>
                    <a :href="account.youtubeUrl"><i v-if="account.youtubeUrl" class="mdi mdi-youtube"></i></a>
                    <a :href="account.twitterUrl"><i v-if="account.twitterUrl" class="mdi mdi-twitter"></i></a>
                </div>
            <div class="d-flex justify-content-end pe-0 pe-md-3 pt-3 mb-1 align-items-end">
                <button type="button" class="btn color-match text-light me-1 text-end" data-bs-toggle="modal" data-bs-target="#accountModal">
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
            account: computed(() => AppState.account)
        };
    },
    components: { EditAccountModal }
};
</script>


<style lang="scss" scoped>
.cover-image{
object-fit: cover;
object-position: center;
}
.account-picture{
height: 8rem;
width: 8rem;
position: relative;
right: -1%;
top: 26%;
}

.account-info-card{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
max-height: 60rem;
}
@media (max-width: 823px){
.account-picture{
height: 8rem;
width: 8rem;
top: 15%;
}
.cover-image{
height: 15rem;
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