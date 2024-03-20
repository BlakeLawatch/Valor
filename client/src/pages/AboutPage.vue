<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-2 col-12 dark-bg bg-height order-2 order-md-1">
        <section class="row justify-content-center">

          <div v-for="dev in devs" :key="dev.id" class="col-6 col-md-12 my-3" :title="dev.name" role="button"
            @click="changeActiveDev(dev)">
            <div class="card-bg d-flex align-items-center justify-content-start py-2 rounded flex-column flex-lg-row">
              <img :src="dev.picture" class="rounded-circle dev-side-img ms-md-1 mb-2 mb-md-0">
              <p class="pb-0 mb-0 ps-3 text-light">{{ dev.name }}</p>
            </div>
          </div>
        </section>
      </div>
      <div class="col-md-9 col-12 order-1 order-md-2">
        <section class="row justify-content-center">
          <div class="col-12 d-flex justify-content-center align-items-center">
            <img class="panda-logo" :src="logo_img" alt="Valor Logo">
            <h2 class="text-light text-center">About Us</h2>
          </div>
          <div class="col-10 card-bg mb-3 rounded">
            <section class="row cover-img  rounded" :style="{ backgroundImage: `url(${currentDev.coverImg})` }">
              <img class="rounded-circle px-0 dev-info-img" :src="currentDev.picture" alt="Developer Picture">
            </section>
            <section class="row card-bg justify-content-end align-items-center rounded shadow">
              <div class="col-9 ps-4 pt-2 text-start d-flex justify-content-between">
                <h1 class="text-light">{{ currentDev.name }}</h1>
                <p class="mb-0 pb-0 text-light" type="button" :title="currentDev.github">
                  <a :href="currentDev.github">
                    <i class="mdi mdi-github fs-2"></i>
                  </a>
                </p>
              </div>
              <div class="col-12 text-light p-4 p-md-5">{{ currentDev.bio }}</div>
            </section>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
// import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { playersService } from '../services/PlayersService'
import logo_img from '../assets/img/panda.png'
import blake_img from '../assets/img/BlakeLawatch.png'
import alayna_img from '../assets/img/Typhonica_2.png'


export default {
  setup() {
    const devs = [
      { name: 'Rhys🧙‍♂️', bio: 'Rhys is a goose of the silly variety. Loves long walks on the beach without Blake. He once figured out he could fit 56 marshmallows in his mouth at once. He also found out he is allergic to marshmallows. Love you all🧙‍♂️', coverImg: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNub3d8ZW58MHx8MHx8fDA%3D', picture: 'https://media0.giphy.com/media/TUOSneOOtImPurKwph/200w.webp?cid=ecf05e47e18hbu2lych23pdzah0qbx4u4rh9ktxc0vqoibds&ep=v1_gifs_search&rid=200w.webp&ct=g', github: 'https://github.com/rsvickers' },
      { name: 'Daniel🛢️', bio: 'really likes minecraft and is the most awesome out of all the developers 😎', coverImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1wufLHpJhC2nXWy7SnjTDvob12lSHynl-qQ&usqp=CAU', picture: 'https://i.pinimg.com/736x/c0/46/42/c04642357bf3797172a866320a933651.jpg', github: 'https://github.com/DanielCoder12' },
      { name: 'Matt🐧', bio: 'Hey b-b-buddy! I love lifting weights, and running marathons. I also love to catch bugs and go fishing. If you catch me around town, hit me up and we can hang out b-b-buddy!', coverImg: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', picture: 'https://acnhcdn.com/latest/NpcBromide/NpcNmlPgn01.png', github: 'https://github.com/mattwong91' },
      { name: 'Blake🐔', bio: `Cominggg into this project, I was nervous, and a bit overwhelmed. Working together as a team and watching this site slowly come together was an amazing experience. I am truly proud of what we accomplished here.`, coverImg: 'https://img.freepik.com/premium-photo/abstract-modern-tech-programming-code-screen-developer-c-programming-language-computer-script-technology-background-software_505353-472.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=ais', picture: blake_img, github: 'https://github.com/BlakeLawatch?tab=repositories' },
      { name: 'Alayna🐉', bio: 'A web developer with a mild dragon obsession', coverImg: 'https://images.unsplash.com/photo-1500674425229-f692875b0ab7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlnaHRuaW5nfGVufDB8fDB8fHww', github: 'https://github.com/alaynadelauro', picture: alayna_img }]
    onMounted(() => {
      changeActiveDev(devs[0])
    })
    function changeActiveDev(dev) {
      playersService.changeActiveDev(dev)
    }
    return {
      currentDev: computed(() => AppState.activeDev),
      devs,
      logo_img,
      changeActiveDev(dev) {
        playersService.changeActiveDev(dev)
      }

    }
  }
}
</script>


<style lang="scss" scoped>
a {
  color: inherit;
}

.cover-img {
  height: 10rem;
  object-fit: cover;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.dev-info-img {
  width: 10rem;
  aspect-ratio: 1/1;
  position: relative;
  object-fit: cover;
  right: -1%;
  top: 45%;
}

.dev-side-img {
  height: 5rem;
  aspect-ratio: 1/1;
  object-fit: cover;

}

.panda-logo {
  height: 9rem;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.bg-height {
  height: 55rem
}

.dark-bg {
  background-color: #242726;
}

.card-bg {
  background-color: #444444;
}

@media(max-width: 767px) {
  .dev-info-img {
    width: 6rem;
    height: 6rem;
    position: relative;
    object-fit: cover;
    right: -2%;
    top: 65%;
  }
}
</style>