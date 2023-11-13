<template>
  <div class="container-fluid bg-height ">
    <section class="row bg-height ">
      <div class="col-2 d-none d-md-block dark-bg ">
<div  v-for="dev in devs" :key="dev">
<div :title="`${dev.name}'s information`" role="button" @click="changeActiveDev(dev)" class="mx-3 my-4 card-bg d-flex align-items-center text-white p-2 rounded">
<img class="dev-side-img rounded-circle" :src="dev.picture" alt="Developer Picture">
<p class="ps-3 mb-0">
  {{ dev.name }}
</p>
</div>
</div>

      </div>
      <div class="col-md-10 col-12 text-white d-flex flex-column align-items-center">
<div class="d-flex align-items-center">
  
    <img class="panda-logo" src="../assets/img/valorPanda.png" alt="Valor Logo">
<h2>About Us</h2>
  
   
</div>
<div class="w-md-75 w-100">
  <div class="card-bg mx-3 p-3 rounded">
    <div class="cover-img" :style="{backgroundImage: `url(${currentDev.coverImg})`}">
      <img class="rounded-circle dev-img" :src="currentDev.picture" alt="Developer Picture">
    </div>
    <div>
      <p class="w-25 pt-3 pe-5 ">{{ currentDev.name }}</p>
      <p> {{ currentDev.bio }}</p>
    </div>
<div><a :href="currentDev.github">
  <i title="github" class="mdi mdi-github"></i>
</a>
  <p>reminder to put socials and stuff here</p>
</div>
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
      {name:'Rhys', bio: 'placeholder bio', coverImg: 'https://play-lh.googleusercontent.com/kpDAdLN_1FHjyDd6-u7ijOpGl0w7EBMoE5U7suF7Wt7rnG1gKN6_tyAvxX1foiiB6gaM=w526-h296-rw', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1', github: 'https://github.com/DanielCoder12'},
      {name:'Daniel', bio: 'loves playing minecraft', coverImg: 'https://play-lh.googleusercontent.com/kpDAdLN_1FHjyDd6-u7ijOpGl0w7EBMoE5U7suF7Wt7rnG1gKN6_tyAvxX1foiiB6gaM=w526-h296-rw',  picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1', github: 'https://github.com/DanielCoder12'},
        {name:'Matt', bio: 'another placeholder bio', coverImg: 'https://play-lh.googleusercontent.com/kpDAdLN_1FHjyDd6-u7ijOpGl0w7EBMoE5U7suF7Wt7rnG1gKN6_tyAvxX1foiiB6gaM=w526-h296-rw', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1', github: 'https://github.com/DanielCoder12'}, 
        {name:'Blake', bio:'a third placeholder bio' , coverImg: 'https://play-lh.googleusercontent.com/kpDAdLN_1FHjyDd6-u7ijOpGl0w7EBMoE5U7suF7Wt7rnG1gKN6_tyAvxX1foiiB6gaM=w526-h296-rw', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1', github: 'https://github.com/DanielCoder12'}, 
        {name:'Alayna', bio: 'the final placeholder bio', coverImg: 'https://play-lh.googleusercontent.com/kpDAdLN_1FHjyDd6-u7ijOpGl0w7EBMoE5U7suF7Wt7rnG1gKN6_tyAvxX1foiiB6gaM=w526-h296-rw', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1', github: 'https://github.com/DanielCoder12'} ]
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
      }

    }
  }
}
</script>


<style lang="scss" scoped>

a{
  color: inherit;
}

.cover-img{
  height: 10rem;
  object-fit: cover;
  object-position: center;
  background-size: cover;
}

.dev-img{
  height: 8rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  position: relative;
  right: -5%;
  top: 58%;
}

.dev-side-img{
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