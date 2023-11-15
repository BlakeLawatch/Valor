<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <CreateTournamentModal />
  </main>
</template>

<script>
import { computed, nextTick, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Pop from './utils/Pop'
import { gamesService } from './services/GamesService'
import CreateTournamentModal from './components/createTournamentModal.vue'

export default {
  setup() {


   
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, CreateTournamentModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}
*{
  user-select: none;
  word-break: break-all;
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
