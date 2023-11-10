<template>
    <div class="col-10 px-0 mt-4 account-info-card">
        <img :src="account.coverImg" class="cover-image w-100">
        <img class="rounded-circle account-picture" :src="account.picture" alt="" />
        <section class="row">
            <div class=" col-12 col-md-8 p-4">
            <h1>{{ account.name }}</h1>
            <p>{{ account.bio }}</p>
            </div>
            <div class="col-12 col-md-4 fs-1 px-md-3 d-flex d-md-block align-items-center justify-content-between">
            <a :href="account.facebookUrl"><i v-if="account.facebookUrl" class="mdi mdi-facebook"></i></a>
            <a :href="account.twitchUrl"><i v-if="account.twitchUrl" class="mdi mdi-twitch"></i></a>
            <a :href="account.instagramUrl"><i v-if="account.instagramUrl" class="mdi mdi-instagram"></i></a>
            <a :href="account.websiteUrl"><i v-if="account.websiteUrl" class="mdi mdi-web"></i></a>
            <a :href="account.youtubeUrl"><i v-if="account.youtubeUrl" class="mdi mdi-youtube"></i></a>
            <a :href="account.twitterUrl"><i v-if="account.twitterUrl" class="mdi mdi-twitter"></i></a>
            <div class="d-flex justify-content-end pe-0 pe-md-3 pt-3 mb-1 align-items-end">
                <button type="button" class="btn color-match text-light text-end" data-bs-toggle="modal" data-bs-target="#accountModal">
                    Edit
                </button>
                <EditAccountModal/>
            </div>
            
            </div>
        </section>
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
height: 30rem;
object-fit: cover;
object-position: center;
}
.account-picture{
height: 15rem;
width: 15rem;
position: relative;
right: -2%;
top: -13%;
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
max-height: 60rem;
}
@media (max-width: 823px){
.account-picture{
height: 10rem;
width: 13rem;
}
.account-image-card{
position: relative;
right: -2%;
top: -20%;
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