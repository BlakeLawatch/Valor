<template>
<div class="row p-2">
    <div class="d-flex align-items-center">
        <p class="fs-5 text-light mb-0">{{ profile.name }}'s clips:</p>
        <div class="dropdown">
                <button class="btn color-match dropdown-toggle mx-2" type="button" id="filterMyTickets" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul class="dropdown-menu" aria-labelledby="filterMyTickets">
                    <li type="button"><a class="dropdown-item color-match text-light">Sort by Future</a></li>
                    <li type="button"><a class="dropdown-item">Sort By Past</a></li>
                </ul>
            </div>
            <button type="button" class="btn color-match text-light" data-bs-toggle="modal" data-bs-target="#addClipModal">
                +
            </button>
            <AddClipModal/>
    </div>
</div>
<div class="row w-100">
    <div v-for="video in videos" :key="video.id" class="col-10 col-sm-5 col-md-4 col-lg-3 m-3 account-info-card px-0">
    <embed :src="video.videoUrl" class="clip-embed w-100" :title="video.title">
    <p class="fs-5 text-light">{{ video.title }}</p>
    </div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import AddClipModal from './AddClipModal.vue';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import {videosService} from '../services/VideosService.js'
export default {
    setup(){
        onMounted(()=>{
            getMyClips()
        })
        async function getMyClips(){
            try {
                const accountId = AppState.profile.id
                await videosService.getMyClips(accountId)
                logger.log(AppState.videos)
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        }
    return {  
        profile: computed(()=> AppState.profile),
        account: computed(()=> AppState.account),
        videos: computed(()=>AppState.videos),
    }
    },
    components: {AddClipModal}
};
</script>


<style lang="scss" scoped>
.color-match{
background-color: #2ca58d;
}
.account-info-card{
background-color: rgb(68, 68, 68);
box-shadow: 0px 5px 6px black;
height: max-content;
}
.clip-embed{
    object-fit: cover;
    object-position: center;
    height: 12rem;
}
</style>