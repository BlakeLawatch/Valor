<template>
  <div class="container-fluid">
    <section class="row d-flex justify-content-center">
      <div class="col-12 text-center text-white">
        <h1>Valor</h1>
      </div>
      <div class="col-8 box-bg p-5">
<p class="fs-5 text-white">
  Search
</p>
<form @submit.prevent="homeSearch()" class="form-inline d-flex">
  <input v-model="editable" class="form-control mr-sm-2" required type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
</form>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import {gamesService} from '../services/GamesService'

export default {
  setup() {
    const editable = ref('')
    return {
editable,
async homeSearch(){
  try {
    const body = {search: editable.value}
   await gamesService.homeSearch(body)
    
  } catch (error) {
    Pop.error(error)
  }
}

    }
  }
}
</script>

<style scoped lang="scss">
.box-bg{
  background-color: #444444;
}
</style>
