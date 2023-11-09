<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed, nextTick, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Pop from './utils/Pop'
import { gamesService } from './services/GamesService'

export default {
  setup() {
    // on mounted get twitch api key and attach it to twitch axios instance maybe not
    onMounted(()=>{
    getTwitchAccessToken()
  }),

    async function getTwitchAccessToken(){
    try {
      await gamesService.getTwitchAccessToken()
      } catch (error) {
      Pop.error(error)
}
    }
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

main{
  background-color: #2E3233;
}
</style>
