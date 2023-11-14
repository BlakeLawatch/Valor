<template>
<div class="row p-2">
    <div class="d-flex align-items-center">
        <p class="fs-5 text-light mb-0">{{ profile.name }}'s clips:</p>
        <div class="dropdown">
                <button class="btn color-match dropdown-toggle mx-2" type="button" title="Sort" id="filterMyTickets" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul class="dropdown-menu" aria-labelledby="filterMyTickets">
                    <li @click="sortNew()" title="Sort New" type="button"><a class="dropdown-item color-match text-light">Sort by Newest</a></li>
                    <li @click="sortOld()" title="Sort Old" type="button"><a class="dropdown-item">Sort By Oldest</a></li>
                </ul>
            </div>
            <button v-if="account.id == profile.id" type="button" title="Add Clip" class="btn color-match text-light" data-bs-toggle="modal" data-bs-target="#addClipModal">
                +
            </button>
            <AddClipModal/>
    </div>
</div>

<!-- CheerfulYawningVulturePeanutButterJellyTime -->
<div v-if="videos != []" class="row w-100">
    <div v-for="video in videos" :key="video.id" class="col-12 col-md-9 col-lg-4 m-3 account-info-card px-0">
    <iframe :src="video.videoUrl" class="clip-embed w-100" :title="video.videoUrl" height="220rem"></iframe>
    <div class="d-flex justify-content-between">
        <p class="fs-5 text-light ps-3">{{ video.title }}</p>
        <div>
            <button v-if="account.id == profile.id" @click="destroyClip(video.id)" title="Delete Clip" class="btn btn-danger m-1"><i class="mdi mdi-delete"></i></button>
        </div>
        
    </div>
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
        async destroyClip(videoId){
            try {
                const yes = await Pop.confirm('Are you sure you want to delete this clip?')
                if(!yes){return}
                // debugger
                await videosService.destroyClip(videoId)
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        },
        async sortNew(){
            try {
                await videosService.sortNew()
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        },
        async sortOld(){
            try {
                await videosService.sortOld()
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        }
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
}
</style>