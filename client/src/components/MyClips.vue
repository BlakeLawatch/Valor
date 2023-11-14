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
    <div class="col-10 col-sm-5 col-md-4 col-lg-3 m-3 account-info-card px-0"></div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import AddClipModal from './AddClipModal.vue';
export default {
    setup(){
    return {  
        profile: computed(()=> AppState.profile),
        account: computed(()=> AppState.account),
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
</style>