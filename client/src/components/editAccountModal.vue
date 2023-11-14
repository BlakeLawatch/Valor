<template>
<div class="modal fade modal-xl" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-dark" id="accountModalLabel">Edit Account</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-dark">
                <form @submit.prevent="editAccount()">
                    <div class="w-100 d-flex justify-content-between">
                        <div class="condensed-milk p-2 text-start">
                            <label for="name" class="form-label fs-5">Name</label>
                            <input v-model="editable.name" type="text" maxlength="100" class="form-control" placeholder="Give yourself a new name">
                        </div>
                        <div class="condensed-milk p-2">
                            <label for="picture" class="form-label fs-5">Profile Picture</label>
                            <input v-model="editable.picture" type="url" maxlength="500" class="form-control" placeholder="A new face">
                        </div>
                    </div>
                    <div class="w-100 d-flex justify-content-between">
                        <div class="condensed-milk p-2 text-start">
                            <label for="coverImg" class="form-label fs-5">Profile Background</label>
                            <input v-model="editable.coverImg" type="url" maxlength="500" class="form-control" placeholder="Personalize the background of your profile with an image!">
                        </div>
                        <div class="condensed-milk p-2">
                            <label for="twitchUrl" class="form-label fs-5">Twitch Link</label>
                            <input v-model="editable.twitchUrl" type="url" maxlength="500" class="form-control" placeholder="feeling twitchy today?">
                        </div>
                    </div>
                    <div class="w-100 d-flex justify-content-between text-start">
                        <div class="condensed-milk p-2">
                            <label for="twitterUrl" class="form-label fs-5">Twitter Link</label>
                            <input v-model="editable.twitterUrl" type="url" maxlength="500" class="form-control" placeholder="For birds of all feathers">
                        </div>
                        <div class="condensed-milk p-2">
                            <label for="youtubeUrl" class="form-label fs-5">Youtube Link</label>
                            <input v-model="editable.youtubeUrl" type="url" maxlength="500" class="form-control" placeholder="Your very own tube!">
                        </div>
                    </div>
                    <div class="w-100 d-flex justify-content-between text-start">
                        <div class="condensed-milk p-2">
                            <label for="facebookUrl" class="form-label fs-5">Facebook Link</label>
                            <input v-model="editable.facebookUrl" type="url" maxlength="500" class="form-control" placeholder="A face so unique you could write a book about it">
                        </div>
                        <div class="condensed-milk p-2">
                            <label for="instagramUrl" class="form-label fs-5">Instagram Link</label>
                            <input v-model="editable.instagramUrl" type="url" maxlength="500" class="form-control" placeholder="Grams, created in an instant">
                        </div>
                    </div>
                    
                    <div class="text-start">
                        <label for="websiteUrl" class="form-label fs-5">Website Link</label>
                        <input v-model="editable.websiteUrl" type="url" maxlength="500" class="form-control" placeholder="seeing the sites">
                    </div>
                    <div class="text-start">
                        <label for="bio" class="form-label fs-5">Biography</label>
                        <textarea v-model="editable.bio" rows="5" maxlength="1000" class="form-control" placeholder="Ever wanted to write an autobiograpjy? Well now you can!"></textarea>
                    </div>
                    <div class="w-100 d-flex justify-content-end pt-3">
                        <button class="btn btn-success me-3" type="submit">Submit</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</div>
</template>


<script>
// import { AppState } from '../AppState';
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { Modal } from 'bootstrap';
import { accountService } from '../services/AccountService';
export default {
    setup(){
        const editable = ref({})
    return { 
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
</style>