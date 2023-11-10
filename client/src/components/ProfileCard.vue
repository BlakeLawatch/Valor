<template>
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
            <div class="d-flex justify-content-end pe-4 pt-3">
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
height: 30vh;
object-fit: cover;
object-position: center;
}
.account-picture{
height: 15vh;
width: 20vh;
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