<template>
<div class="modal fade" id="addClipModal" tabindex="-1" aria-labelledby="addClipModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addClipModalLabel">Add a clip!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="p-2">
                        <label for="title" class="form-label fs-5">Title</label>
                        <input v-model="editable.title" type="text" maxlength="100" class="form-control" placeholder="Without this, your video is sad and nameless">
                    </div>
                    <div class="p-2">
                        <label for="videoUrl" class="form-label fs-5">Video Url</label>
                        <input v-model="editable.videoUrl" required type="url" maxlength="500" class="form-control" placeholder="Post your video's url here!">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { accountService } from '../services/AccountService';
// import { AppState } from '../AppState';
import { Modal } from 'bootstrap';
export default {
    setup(){
        const editable = ref({})
    return {  
        editable,
        async addVideo(){
            try {
                await accountService.addVideo(editable.value)
                editable.value = {}
                Modal.getOrCreateInstance('#addClipModal').hide()
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

</style>