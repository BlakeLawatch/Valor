<template>
<div class="modal fade modal-xl" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-dark" id="accountModalLabel">Edit Account</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-dark">
                <form>
                    <div>
                        <label for="name" class="form-label fs-5">Name</label>
                        <input type="text" rows="5" maxlength="100" class="form-control" placeholder="Give yourself a new name">
                    </div>
                    <div>
                        <label for="picture" class="form-label fs-5">Profile Picture</label>
                        <input type="url" rows="5" maxlength="500" class="form-control" placeholder="A new face">
                    </div>
                    <div>
                        <label for="coverImg" class="form-label fs-5">Profile Background</label>
                        <input rows="5" type="url" maxlength="500" class="form-control" placeholder="Give yourself a new name">
                    </div>
                </form>
            </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>