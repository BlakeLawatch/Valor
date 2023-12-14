<template>
<div class="modal fade modal-xl" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content editForm">
            <div v-if="account.coverImg" class="edit-account-header mb-1 d-flex justify-content-between" :style="{backgroundImage: `url(${account.coverImg})`}">
                <div class="row w-75 d-flex justify-content-md-start justify-content-between">
                    <div class="col-3 d-flex align-items-md-start">
                        <img :src="account.picture" class="rounded-circle edit-account-picture">
                    </div>
                    <div class="col-md-6 col-7 ps-md-0 ps-5 ms-md-0 ms-4 d-flex align-items-end">
                        <h4 class="modal-title pb-3 text-light edit-account-title text-start" id="accountModalLabel">Edit {{account.name}}</h4>
                    </div>
                </div>
                <button type="button" class="btn-close me-1 mt-1" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-light">
                <form  @submit.prevent="editAccount()">
                    <div class="w-100 d-flex justify-content-between">
                        <div class="condensed-milk  p-2 text-start">
                            <label for="name" class="form-label fs-5">Name</label>
                            <input v-model="editable.name" title="Name" type="text" maxlength="100" class="form-control" placeholder="Name...">
                        </div>
                        <div class="condensed-milk text-start p-2">
                            <label for="picture" class="form-label  fs-5">Profile Picture</label>
                            <input v-model="editable.picture" title="Profile Picture" type="url" maxlength="500" class="form-control" placeholder="Profile picture...">
                        </div>
                    </div>
                    <div class="w-100 d-flex justify-content-between">
                        <div class="condensed-milk p-2 text-start">
                            <label for="coverImg" class="form-label fs-5">Profile Background</label>
                            <input v-model="editable.coverImg" title="Profile Background" type="url" maxlength="500" class="form-control" placeholder="Background...">
                        </div>
                        <div class="condensed-milk text-start p-2">
                            <label for="twitchUrl" class="form-label fs-5">Twitch Link</label>
                            <input v-model="editable.twitchUrl" title="Twitch Account Link" type="url" maxlength="500" class="form-control" placeholder="Twitch...">
                        </div>
                    </div>
                    <div class="w-100 d-flex justify-content-between text-start">
                        <div class="condensed-milk p-2">
                            <label for="twitterUrl" class="form-label fs-5">Twitter Link</label>
                            <input v-model="editable.twitterUrl" title="Twitter Account Link" type="url" maxlength="500" class="form-control" placeholder="Twitter...">
                        </div>
                        <div class="condensed-milk p-2">
                            <label for="youtubeUrl" class="form-label fs-5">Youtube Link</label>
                            <input v-model="editable.youtubeUrl" title="Youtube Account Link" type="url" maxlength="500" class="form-control" placeholder="YouTube...">
                        </div>
                    </div>
                    <div class="w-100 d-flex justify-content-between text-start">
                        <div class="condensed-milk p-2">
                            <label for="facebookUrl" class="form-label fs-5">Facebook Link</label>
                            <input v-model="editable.facebookUrl" title="Facebook Account Link" type="url" maxlength="500" class="form-control" placeholder="Facebook...">
                        </div>
                        <div class="condensed-milk p-2">
                            <label for="instagramUrl" class="form-label fs-5">Instagram Link</label>
                            <input v-model="editable.instagramUrl" title="Instagram Account Link" type="url" maxlength="500" class="form-control" placeholder="Instagram...">
                        </div>
                    </div>
                    <div class="text-start">
                        <label for="websiteUrl" class="form-label fs-5">Website Link</label>
                        <input v-model="editable.websiteUrl" title="Personal Website URL" type="url" maxlength="500" class="form-control" placeholder="Link...">
                    </div>
                    <div class="text-start">
                        <label for="bio" class="form-label fs-5">Biography</label>
                        <textarea v-model="editable.bio" rows="5" title="Bio" maxlength="1000" class="form-control" placeholder="Bio..."></textarea>
                    </div>
                    <div class="w-100 d-flex justify-content-end pt-3">
                        <button class="btn me-3 text-light" title="Save Changes" type="submit">Save Changes<i class="mdi mdi-check"></i></button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</div>
</template>


<script>
// import { AppState } from '../AppState';
import { computed, ref } from 'vue';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { Modal } from 'bootstrap';
import { accountService } from '../services/AccountService';
import { AppState } from '../AppState';
export default {
    setup(){
        const editable = ref({})
    return { 
        account: computed(()=>AppState.account),
        editable,
        async editAccount(){
            try {
                await accountService.editAccount(editable.value)
                editable.value = {}
                Modal.getOrCreateInstance("#accountModal").hide()
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        }
    }
    }
};
</script>


<style lang="scss" scoped>
.condensed-milk{
    width: 48%;
}

button {
    background-color: #2ca58d;
}

.editForm {
    background-color: #242726;
    box-shadow: 0px 5px 4px #2ca58d;
    border: 1.5px solid #2ca58d;
}
.edit-account-header{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0px 5px 4px black;
    border-bottom: 1.5px solid #2ca58d;
}
.edit-account-picture{
    height: 8rem;
    aspect-ratio: 1/1;
    position: relative;
    left: 5%;
    top:2rem;
    box-shadow: 0px 5px 4px black;
}
.edit-account-title{
    text-shadow: 0px 5px 4px black;
}
</style>