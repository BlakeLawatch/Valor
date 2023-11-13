<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 col-12 dark-bg bg-height order-2 order-md-1">
        <div v-for="dev in devs" :key="dev.id" class="row my-5 ms-1" :title="dev.name" role="button" @click="changeActiveDev(dev)" >
        <div class="col-11 card-bg d-flex align-items-center justify-content-start py-2 rounded flex-column flex-lg-row">
          <img :src="dev.picture" class="rounded-circle dev-side-img">
          <p class="pb-0 mb-0 ps-3 text-light">{{ dev.name }}</p>
        </div>
        </div>
      </div>
      <div class="col-md-9 col-12 order-1 order-md-2">
        <div class="row justify-content-center">
          <div class="col-12 d-flex justify-content-center align-items-center">
            <img class="panda-logo" src="../assets/img/valorPanda.png" alt="Valor Logo">
            <h2 class="text-light text-center">About Us</h2>
          </div>
          <div class="col-10 card-bg mb-3 rounded">
            <div class="row cover-img rounded" :style="{backgroundImage: `url(${currentDev.coverImg})`}">
              <img class="rounded-circle dev-info-img" :src="currentDev.picture" alt="Developer Picture">
            </div>
            <div class="row card-bg justify-content-end align-items-center">
              <div class="col-10 ps-4 pt-2 text-start d-flex justify-content-between">
                <h1 class="text-light">{{ currentDev.name }}</h1>
                <p class="mb-0 pb-0 text-light" type="button" :title="currentDev.github">
                  <a :href="currentDev.github">
                    <i class="mdi mdi-github fs-2"></i>
                  </a>
                </p>
              </div>
              <div class="col-12 text-light py-4 ps-5">{{ currentDev.bio }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
// import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { playersService } from '../services/PlayersService'

export default {
  setup() {
    const devs = [
      {name:'Rhys', bio: 'placeholder bio', coverImg: 'https://play-lh.googleusercontent.com/kpDAdLN_1FHjyDd6-u7ijOpGl0w7EBMoE5U7suF7Wt7rnG1gKN6_tyAvxX1foiiB6gaM=w526-h296-rw', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1', github: 'https://github.com/DanielCoder12'},
      {name:'Daniel', bio: 'loves playing minecraft', coverImg: 'https://play-lh.googleusercontent.com/kpDAdLN_1FHjyDd6-u7ijOpGl0w7EBMoE5U7suF7Wt7rnG1gKN6_tyAvxX1foiiB6gaM=w526-h296-rw',  picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1', github: 'https://github.com/DanielCoder12'},
        {name:'Matt', bio: 'another placeholder bio', coverImg: 'https://play-lh.googleusercontent.com/kpDAdLN_1FHjyDd6-u7ijOpGl0w7EBMoE5U7suF7Wt7rnG1gKN6_tyAvxX1foiiB6gaM=w526-h296-rw', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1', github: 'https://github.com/DanielCoder12'}, 
        {name:'Blake', bio:'a third placeholder bio' , coverImg: 'https://play-lh.googleusercontent.com/kpDAdLN_1FHjyDd6-u7ijOpGl0w7EBMoE5U7suF7Wt7rnG1gKN6_tyAvxX1foiiB6gaM=w526-h296-rw', picture: 'https://variety.com/wp-content/uploads/2023/04/MCDSUMA_UV016.jpg?w=1000&h=563&crop=1', github: 'https://github.com/DanielCoder12'}, 
        {name:'Alayna', bio: 'A web developer with a mild dragon obsession', coverImg: 'https://images.unsplash.com/photo-1500674425229-f692875b0ab7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlnaHRuaW5nfGVufDB8fDB8fHww', github: 'https://github.com/alaynadelauro', picture: 'src/assets/img/Typhonica_2.png'} ]
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
  background-repeat: no-repeat;
}

.dev-info-img{
  width: 10rem;
  aspect-ratio: 1/1;
  position: relative;
  right: -1%;
  top:45%;
}

.dev-side-img{
  height: 5rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  
}

.panda-logo{
  height: 9rem;
  aspect-ratio: 1/1;
  object-fit: cover;
}
.bg-height{
  height: 55rem
}

.dark-bg{
    background-color: #242726;
}

.card-bg{
    background-color: #444444;
}
@media(max-width: 1188px){
  .dev-info-img{
    width: 6rem;
    height: 6rem;
    position: relative;
    right: 1%;
    top: 65%;
  }
}

</style>