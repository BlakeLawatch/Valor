<template>
  <div class="container-fluid bg-height ">
    <section class="row bg-height ">
      <div class="col-2 dark-bg ">
<div  v-for="dev in devs" :key="dev">
<div @click="changeActiveDev(dev)" class="mx-3 my-4 card-bg d-flex align-items-center text-white p-2 rounded">
<img class="dev-img rounded-circle" :src="dev.picture" alt="Developer Picture">
<p class="ps-3">
  {{ dev.name }}
</p>
</div>
</div>

      </div>
      <div class="col-10 text-white d-flex flex-column align-items-center">
<div class="d-flex align-items-center">
  
    <img class="panda-logo" src="../assets/img/valorPanda.png" alt="Valor Logo">
<h2>About Us</h2>
  
   
</div>
<div>
  <div class="bg-dark mx-3">
<p>card thing</p>
<p>{{ currentDev }}</p>
  </div>
  <div>
    name
  </div>
  <div>
    bio
  </div>
</div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { playersService } from '../services/PlayersService'

export default {
  setup() {
    const devs = [
      {name:'Rhys', bio: 'placeholder bio', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1'},
      {name:'Daniel', bio: 'loves playing minecraft', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1'},
        {name:'Matt', bio: 'another placeholder bio', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1'}, 
        {name:'Blake', bio:'a third placeholder bio' ,picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1'}, 
        {name:'Alayna', bio: 'the final placeholder bio', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1'} ]
        onMounted(()=> {
          changeActiveDev(devs[0])
        })
        function changeActiveDev(dev){
          playersService.changeActiveDev(dev)
        }
    return {
      currentDev: computed(()=> AppState.activeDev),
      devs,
      changeActiveDev(dev){
        playersService.changeActiveDev(dev)
      },
      test(){
        logger.log('test')
      }

    }
  }
}
</script>


<style lang="scss" scoped>

.dev-img{
  height: 5rem;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.panda-logo{
  height: 5rem;
  width: 5rem;
  object-fit: cover;
}
.bg-heigh{
  height: 100vh;
}

.dark-bg{
    background-color: #242726;
}

.card-bg{
    background-color: #444444;
}

</style>